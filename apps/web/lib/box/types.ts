import { SortValue } from '@/components/list/types'
import { Box, Item } from '@/db/schema'
import { BOXES_SORTABLE_COLUMNS } from '@/lib/box/const'
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

// The canonical shape lives in @what-box/shared (its UpdateBoxSchema) -
// re-exported here so lib/box/mutations.ts doesn't need to reach outside
// the domain for its own function signature.
export type { UpdateBoxData } from '@what-box/shared'
