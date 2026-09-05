import { Box, BoxImage, Item } from '@/db/schema'
import { BOXES_SORTABLE_COLUMNS } from '@/lib/box/const'

export type SortOrder = 'asc' | 'desc'
export type SortOption<T extends string> = {
  label: string
  field: T
  direction: SortOrder
  value: `${T}_${SortOrder}`
}
export type SortValue<T extends string> = SortOption<T>['value']

// --- Generate types from constants for sorting options ---
export type BoxesSortField = keyof typeof BOXES_SORTABLE_COLUMNS
export type BoxesSortOption = SortOption<BoxesSortField>
export type BoxesSortValue = BoxesSortOption['value']

// --- Query parameters for fetching boxes ---
export type BoxesQuery = {
  search?: string
  sort?: BoxesSortValue
}

export type Paginated<T> = {
  items: T[]
  total: number
}

export type BoxWithAll = Box & { images: BoxImage[]; items: Item[] }
export type BoxesPaginated = Paginated<BoxWithAll>
