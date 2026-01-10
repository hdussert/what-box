'use client'

import { Box } from '@/db/schema'
import { DEFAULT_BOXES_SORT_OPTION } from '@/lib/box/const'
import {
  BoxesPaginated,
  BoxesSortDirection,
  BoxesSortField,
  BoxesSortOptions,
} from '@/lib/box/types'
import { buildSortOption, parseSort } from '@/lib/box/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export type BoxTableContextValue = {
  boxes: Box[]

  // Row selection
  selectedIds: string[]
  setSelectedIds: (ids: string[]) => void

  // Search
  search: string
  onSearchChange: (newSearch: string) => void

  // Sorting
  sort: BoxesSortOptions
  toggleSort: (sortField: BoxesSortField) => void

  // Pagination
  page: number
  totalPages: number
  goToFirstPage: () => void
  goToNextPage: () => void
  goToPreviousPage: () => void
  goToLastPage: () => void

  // Actions
  deleteSelectedBoxes?: () => void
  printSelectedBoxesLabel?: () => void
}

const DEBOUNCE_MS = 300

export const useBoxTable = (props: BoxesPaginated): BoxTableContextValue => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [search, setSearch] = useState<string>(searchParams.get('search') || '')
  const [sort, setSort] = useState<BoxesSortOptions>(
    (searchParams.get('sort') as BoxesSortOptions) || DEFAULT_BOXES_SORT_OPTION
  )
  const [page, setPage] = useState<number>(props.page)
  const { items: boxes, totalPages } = props

  // Search handler
  const onSearchChange = (newSearch: string) => {
    setSearch(newSearch)
    setPage(1) // Reset to first page on search change
  }

  // Sorting handler
  const toggleSort = (sortField: BoxesSortField) => {
    const { field: currentField, direction } = parseSort(sort)

    let newDirection: BoxesSortDirection
    // Toggle direction if same field, else default to 'desc'
    if (currentField === sortField) {
      newDirection = direction === 'asc' ? 'desc' : 'asc'
    } else {
      newDirection = 'desc'
    }

    const newSort = buildSortOption(sortField, newDirection)
    setSort(newSort)
  }

  // Pagination handlers
  const goToFirstPage = () => setPage(1)
  const goToNextPage = () => setPage((prev) => prev + 1)
  const goToPreviousPage = () => setPage((prev) => Math.max(prev - 1, 1))
  const goToLastPage = () => setPage(totalPages)

  // Search param updater
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    const trimmedSearch = search.trim()
    if (trimmedSearch) params.set('search', trimmedSearch)
    else params.delete('search')

    if (sort !== DEFAULT_BOXES_SORT_OPTION) params.set('sort', sort)
    params.set('page', String(page))

    const query = params.toString()
    const newUrl = query ? `${pathname}?${query}` : pathname

    const timeoutId = setTimeout(() => {
      router.replace(newUrl)
    }, DEBOUNCE_MS)

    return () => clearTimeout(timeoutId)
  }, [search, sort, page])

  return {
    boxes,
    page,
    totalPages,
    search,
    selectedIds,
    sort,

    setSelectedIds,
    onSearchChange,
    toggleSort,

    goToFirstPage,
    goToNextPage,
    goToPreviousPage,
    goToLastPage,
  }
}
