import { SortOption } from '@/app/components/common/list/useListParams'
import { items } from '@/db/schema'

export const ITEMS_SORTABLE_COLUMNS = {
  createdAt: items.createdAt,
  name: items.name,
  quantity: items.quantity,
  description: items.description,
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
  {
    label: 'Description',
    field: 'description',
    direction: 'desc',
    value: 'description_desc',
  },
  {
    label: 'Description',
    field: 'description',
    direction: 'asc',
    value: 'description_asc',
  },
]

export const ITEMS_DEFAULT_SORT_OPTION = ITEMS_SORT_OPTIONS[0].value
