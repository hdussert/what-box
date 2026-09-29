import { SortValue } from '@/components/list/types'
import { Box, Item } from '@/db/schema'
import { StoredImage } from '@/lib/image/types'
import { Paginated } from '@/lib/types'

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
