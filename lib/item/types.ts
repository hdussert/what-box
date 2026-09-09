import { SortValue } from '@/app/components/common/list/useListParams'
import { ImageRecord, Item } from '@/db/schema'
import { Paginated } from '@/lib/box'
import { ITEMS_SORTABLE_COLUMNS } from '@/lib/item/const'

export type ItemsSortField = keyof typeof ITEMS_SORTABLE_COLUMNS

export type ItemsQuery = {
  search?: string
  sort?: SortValue
}

export type ItemWithAll = Item & { images: ImageRecord[] }
export type ItemsPaginated = Paginated<ItemWithAll>

export type CreateItemData = {
  boxId: string
  name: string
  description?: string
  quantity: number
}
