import { SortValue } from '@/components/list/types'
import { ImageRecord, Item } from '@/db/schema'
import { ITEMS_SORTABLE_COLUMNS } from '@/lib/item/const'
import { Paginated } from '@/lib/types'

export type ItemsSortField = keyof typeof ITEMS_SORTABLE_COLUMNS

export type ItemsQuery = {
  search?: string
  sort?: SortValue
}

export type ItemWithImages = Item & { images: ImageRecord[] }
export type ItemsPaginated = Paginated<ItemWithImages>

export type CreateItemData = {
  boxId: string
  name: string
  quantity: number
}

export type UpdateItemData = {
  id: string
  name: string
  quantity: number
}
