import { Item } from '@/db/schema'
import { ITEMS_SORT_DIRECTIONS, ITEMS_SORTABLE_COLUMNS } from '@/lib/item/const'

export type ItemsSortField = keyof typeof ITEMS_SORTABLE_COLUMNS
export type ItemsSortDirection = (typeof ITEMS_SORT_DIRECTIONS)[number]
export type ItemsSortOptions = `${ItemsSortField}_${ItemsSortDirection}`

export type ItemsQuery = {
  search?: string
  sort?: ItemsSortOptions
  page?: number
  pageSize?: number
}

export type Paginated<T> = {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export type ItemsPaginated = Paginated<Item>

export type ItemCreate = {
  boxId: string
  name: string
  description?: string
  condition?: string
  quantity: string
}
