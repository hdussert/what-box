import { Box, BoxImage, Item } from '@/db/schema'
import { BOXES_SORTABLE_COLUMNS, SORT_DIRECTIONS } from '@/lib/box/const'

// --- Generate types from constants for sorting options ---
export type BoxesSortDirection = (typeof SORT_DIRECTIONS)[number]
export type BoxesSortField = keyof typeof BOXES_SORTABLE_COLUMNS
export type BoxesSortValues = `${BoxesSortField}_${BoxesSortDirection}`

export type BoxesSortOptions = {
  label: string
  field: BoxesSortField
  direction: BoxesSortDirection
  value: BoxesSortValues
}

// --- Query parameters for fetching boxes ---
export type BoxesQuery = {
  search?: string
  sort?: BoxesSortValues
}

export type Paginated<T> = {
  items: T[]
  total: number
}

export type BoxWithAll = Box & { images: BoxImage[]; items: Item[] }
export type BoxesPaginated = Paginated<BoxWithAll>
