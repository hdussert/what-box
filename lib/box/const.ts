import { boxes } from '@/db/schema'
import { BoxesSortOption, BoxesSortValue } from '@/lib/box/types'

// Note : Safety net, making sure the column exists
export const BOXES_SORTABLE_COLUMNS = {
  createdAt: boxes.createdAt,
  name: boxes.name,
  shortId: boxes.shortId,
} as const

export const BOXES_SORT_OPTIONS: BoxesSortOption[] = [
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

export const BOXES_DEFAULT_SORT_OPTION: BoxesSortValue = 'createdAt_desc'
