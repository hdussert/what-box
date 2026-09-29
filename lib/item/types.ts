import { SortValue } from '@/components/list/types'
import { Item } from '@/db/schema'
import { StoredImage } from '@/lib/image/types'
import { Paginated } from '@/lib/types'

export type ItemsQuery = {
  search?: string
  sort?: SortValue
}

export type ItemsPaginated = Paginated<Item>

export type CreateItemData = {
  id: string
  boxId: string
  name: string
  quantity: number
  image: StoredImage | null
}

export type UpdateItemData = {
  id: string
  name: string
  quantity: number
}
