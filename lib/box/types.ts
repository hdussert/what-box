import { SortValue } from '@/components/list/types'
import { Box, Item } from '@/db/schema'
import { BOXES_SORTABLE_COLUMNS } from '@/lib/box/const'
import { StoredImage } from '@/lib/image/types'
import { Paginated } from '@/lib/types'

// --- Generate types from constants for sorting options ---
export type BoxesSortField = keyof typeof BOXES_SORTABLE_COLUMNS

// --- Query parameters for fetching boxes ---
export type BoxesQuery = {
  search?: string
  sort?: SortValue
}

export type BoxWithRelations = Box & { items: Item[] }
export type BoxesPaginated = Paginated<BoxWithRelations>

export type CreateBoxData = {
  id: string
  name: string
  shortId: string
  image: StoredImage | null
}

export type UpdateBoxData = {
  id: string
  name: string
}
