import { items } from '@/db/schema'
import { ItemsSortOptions } from '@/lib/item/types'

export const ITEMS_SORT_DIRECTIONS = ['asc', 'desc'] as const

export const ITEMS_SORTABLE_COLUMNS = {
  createdAt: items.createdAt,
  name: items.name,
  quantity: items.quantity,
  condition: items.condition,
  description: items.description,
} as const

export const ITEMS_SORT_OPTIONS = Object.keys(ITEMS_SORTABLE_COLUMNS).flatMap(
  (field) =>
    ITEMS_SORT_DIRECTIONS.map(
      (direction) => `${field}_${direction}` as ItemsSortOptions
    )
)

export const DEFAULT_ITEMS_SORT_OPTION: ItemsSortOptions = 'createdAt_desc'
