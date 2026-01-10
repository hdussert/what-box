import { boxes } from '@/db/schema'
import { BoxesSortOptions } from '@/lib/box/types'

export const BOXES_SORT_DIRECTIONS = ['asc', 'desc'] as const

// Note : Just add more columns here to make them sortable
export const BOXES_SORTABLE_COLUMNS = {
  createdAt: boxes.createdAt,
  name: boxes.name,
  shortId: boxes.shortId,
} as const

export const SORT_OPTIONS = Object.keys(BOXES_SORTABLE_COLUMNS).flatMap(
  (field) =>
    BOXES_SORT_DIRECTIONS.map(
      (direction) => `${field}_${direction}` as BoxesSortOptions
    )
)
export const DEFAULT_BOXES_SORT_OPTION: BoxesSortOptions = 'createdAt_desc'
