import { boxes } from '@/db/schema'
import { BoxesSortOptions, BoxesSortValues } from '@/lib/box/types'

export const SORT_DIRECTIONS = ['asc', 'desc'] as const

// Note : Just add more columns here to make them sortable
export const BOXES_SORTABLE_COLUMNS = {
  createdAt: boxes.createdAt,
  name: boxes.name,
  shortId: boxes.shortId,
} as const

export const SORT_OPTIONS_VALUES = Object.keys(BOXES_SORTABLE_COLUMNS).flatMap(
  (field) =>
    SORT_DIRECTIONS.map(
      (direction) => `${field}_${direction}` as BoxesSortValues,
    ),
)

export const SORT_OPTIONS: BoxesSortOptions[] = [
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
]

export const DEFAULT_BOXES_SORT_OPTION: BoxesSortValues = 'createdAt_desc'
