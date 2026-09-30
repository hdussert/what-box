import { SortOption } from '@/components/list/types'

export const BOXES_PAGE_SIZE = 20

/** Word forms for `pluralize`. */
export const BOX_WORDS = { one: 'box', other: 'boxes' }

export const BOXES_SORT_OPTIONS: SortOption[] = [
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
    label: 'ID',
    field: 'shortId',
    direction: 'desc',
    value: 'shortId_desc',
  },
  {
    label: 'ID',
    field: 'shortId',
    direction: 'asc',
    value: 'shortId_asc',
  },
] as const

export const BOXES_DEFAULT_SORT = BOXES_SORT_OPTIONS[0].value
