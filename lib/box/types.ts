import { SortValue } from '@/app/components/common/list/useListParams'
import { Box, ImageRecord, Item } from '@/db/schema'
import { BOXES_SORTABLE_COLUMNS } from '@/lib/box/const'

// --- Generate types from constants for sorting options ---
export type BoxesSortField = keyof typeof BOXES_SORTABLE_COLUMNS

// --- Query parameters for fetching boxes ---
export type BoxesQuery = {
  search?: string
  sort?: SortValue
}

export type Paginated<T> = {
  items: T[]
  total: number
}

export type BoxWithAll = Box & { images: ImageRecord[]; items: Item[] }
export type BoxesPaginated = Paginated<BoxWithAll>
