'use client'

import { Item } from '@/db/schema'
import { DEFAULT_ITEMS_SORT_OPTION } from '@/lib/item/const'
import {
  ItemsPaginated,
  ItemsSortDirection,
  ItemsSortField,
  ItemsSortOptions,
} from '@/lib/item/types'
import { buildSortOption, parseSort } from '@/lib/item/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const DEBOUNCE_MS = 300

export type ItemTableContextValue = {
  items: Item[]
  boxId: string
  total: number
  page: number
  totalPages: number

  selectedIds: string[]
  setSelectedIds: (ids: string[]) => void

  search: string
  onSearchChange: (newSearch: string) => void

  sort: ItemsSortOptions
  toggleSort: (sortField: ItemsSortField) => void

  goToFirstPage: () => void
  goToNextPage: () => void
  goToPreviousPage: () => void
  goToLastPage: () => void

  clearSelection: () => void
  clearingSelection: boolean
}

export const useItemTable = (
  props: ItemsPaginated & { boxId: string }
): ItemTableContextValue => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [clearingSelection, setClearingSelection] = useState(false)
  const [search, setSearch] = useState<string>(searchParams.get('search') || '')
  const [sort, setSort] = useState<ItemsSortOptions>(
    (searchParams.get('sort') as ItemsSortOptions) || DEFAULT_ITEMS_SORT_OPTION
  )
  const [page, setPage] = useState<number>(props.page)

  const { items, totalPages, total, boxId } = props

  const onSearchChange = (newSearch: string) => {
    setSearch(newSearch)
    setPage(1)
  }

  const toggleSort = (sortField: ItemsSortField) => {
    const { field: currentField, direction } = parseSort(sort)

    let newDirection: ItemsSortDirection
    if (currentField === sortField) {
      newDirection = direction === 'asc' ? 'desc' : 'asc'
    } else {
      newDirection = 'desc'
    }

    const newSort = buildSortOption(sortField, newDirection)
    setSort(newSort)
  }

  const goToFirstPage = () => setPage(1)
  const goToNextPage = () => setPage((prev) => prev + 1)
  const goToPreviousPage = () => setPage((prev) => Math.max(prev - 1, 1))
  const goToLastPage = () => setPage(totalPages)

  const clearSelection = () => setClearingSelection((prev) => !prev)

  // Sync with URL params
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    const trimmedSearch = search.trim()
    if (trimmedSearch) params.set('search', trimmedSearch)
    else params.delete('search')

    if (sort !== DEFAULT_ITEMS_SORT_OPTION) params.set('sort', sort)
    else params.delete('sort')

    params.set('page', String(page))

    const query = params.toString()
    const newUrl = query ? `${pathname}?${query}` : pathname

    const timeoutId = setTimeout(() => {
      router.replace(newUrl)
    }, DEBOUNCE_MS)

    return () => clearTimeout(timeoutId)
  }, [search, sort, page, pathname, router, searchParams])

  return {
    items,
    boxId,
    page,
    totalPages,
    total,
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

    clearSelection,
    clearingSelection,
  }
}
