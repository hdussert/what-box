import { SortValue } from '@/components/list/types'
import { StoredImage } from '@/lib/image/types'

export type ItemsQuery = {
  search?: string
  sort?: SortValue
}

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
