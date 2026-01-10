import { Box } from '@/db/schema'
import { BOXES_SORT_DIRECTIONS, BOXES_SORTABLE_COLUMNS } from '@/lib/box/const'

// --- Generate types from constants for sorting options ---
export type BoxesSortField = keyof typeof BOXES_SORTABLE_COLUMNS
export type BoxesSortDirection = (typeof BOXES_SORT_DIRECTIONS)[number]
export type BoxesSortOptions = `${BoxesSortField}_${BoxesSortDirection}`

// --- Query parameters for fetching boxes ---
export type BoxesQuery = {
  search?: string
  sort?: BoxesSortOptions
  page?: number
  pageSize?: number
}

export type Paginated<T> = {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export type BoxesPaginated = Paginated<Box>
