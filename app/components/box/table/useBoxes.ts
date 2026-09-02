'use client'

import { DEFAULT_BOXES_SORT_OPTION } from '@/lib/box/const'
import { BoxesPaginated, BoxesSortValues, BoxWithAll } from '@/lib/box/types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

const DEBOUNCE_MS = 200

export type BoxesContextValue = {
  boxes: BoxWithAll[]
  total: number

  enterSelectionMode: () => void
  quitSelectionMode: () => void
  isSelecting: boolean

  selectedIds: string[]
  setSelectedIds: Dispatch<SetStateAction<string[]>>

  search: string
  onSearchChange: (newSearch: string) => void

  sort: BoxesSortValues
  setSort: (newSort: BoxesSortValues) => void

  getSelectedBoxes: () => BoxWithAll[]
  clearSelection: () => void
  clearingSelection: boolean // Hacky flag to trigger clearing Boxes's rows selection
}

export const useBoxes = (props: BoxesPaginated): BoxesContextValue => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [isSelecting, setIsSelecting] = useState<boolean>(false)
  const enterSelectionMode = () => setIsSelecting(true)
  const quitSelectionMode = () => setIsSelecting(false)

  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [clearingSelection, setClearingSelection] = useState(false)

  const [search, setSearch] = useState<string>(searchParams.get('search') || '')
  const [sort, setSort] = useState<BoxesSortValues>(
    (searchParams.get('sort') as BoxesSortValues) || DEFAULT_BOXES_SORT_OPTION,
  )

  const { items: boxes, total } = props
  // Clear selection
  useEffect(() => {
    if (!isSelecting) setSelectedIds([])
  }, [isSelecting])

  // Search handler
  const onSearchChange = (newSearch: string) => {
    setSearch(newSearch)
  }

  // Search param updater
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    const trimmedSearch = search.trim()
    if (trimmedSearch) params.set('search', trimmedSearch)
    else params.delete('search')

    if (sort !== DEFAULT_BOXES_SORT_OPTION) params.set('sort', sort)

    const query = params.toString()
    const newUrl = query ? `${pathname}?${query}` : pathname

    const timeoutId = setTimeout(() => {
      router.replace(newUrl)
    }, DEBOUNCE_MS)

    return () => clearTimeout(timeoutId)
  }, [search, sort])

  const getSelectedBoxes = () =>
    boxes.filter((box) => selectedIds.includes(box.id))
  const clearSelection = () => setClearingSelection((prev) => !prev)

  return {
    boxes,
    total,
    search,

    selectedIds,
    setSelectedIds,
    getSelectedBoxes,
    enterSelectionMode,
    quitSelectionMode,
    isSelecting,

    sort,
    setSort,
    onSearchChange,

    clearSelection,
    clearingSelection,
  }
}
