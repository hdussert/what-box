import { SortValue } from '@/components/list/types'
import { Box, ImageRecord, Item } from '@/db/schema'
import { BOXES_SORTABLE_COLUMNS } from '@/lib/box/const'
import { Paginated } from '@/lib/types'

// --- Generate types from constants for sorting options ---
export type BoxesSortField = keyof typeof BOXES_SORTABLE_COLUMNS

// --- Query parameters for fetching boxes ---
export type BoxesQuery = {
  search?: string
  sort?: SortValue
}

export type BoxWithRelations = Box & { images: ImageRecord[]; items: Item[] }
export type BoxesPaginated = Paginated<BoxWithRelations>

export type UpdateBoxData = {
  id: string
  name: string
}
