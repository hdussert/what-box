import { SortOption } from '@/components/list/types'
import { items } from '@/db/schema'

export const ITEMS_SORTABLE_COLUMNS = {
  createdAt: items.createdAt,
  name: items.name,
  quantity: items.quantity,
} as const

export const ITEMS_SORT_OPTIONS: SortOption[] = [
  {
    label: 'Date',
    field: 'createdAt',
    direction: 'desc',
    value: 'createdAt_desc',
  },
  {
    label: 'Date',
    field: 'createdAt',
    direction: 'asc',
    value: 'createdAt_asc',
  },
  {
    label: 'Name',
    field: 'name',
    direction: 'desc',
    value: 'name_desc',
  },
  {
    label: 'Name',
    field: 'name',
    direction: 'asc',
    value: 'name_asc',
  },
  {
    label: 'Quantity',
    field: 'quantity',
    direction: 'desc',
    value: 'quantity_desc',
  },
  {
    label: 'Quantity',
    field: 'quantity',
    direction: 'asc',
    value: 'quantity_asc',
  },
]

export const ITEMS_DEFAULT_SORT = ITEMS_SORT_OPTIONS[1].value
