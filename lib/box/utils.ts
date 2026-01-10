import {
  BOXES_SORTABLE_COLUMNS,
  DEFAULT_BOXES_SORT_OPTION,
} from '@/lib/box/const'
import { asc, desc } from 'drizzle-orm'
import { BoxesSortDirection, BoxesSortField, BoxesSortOptions } from './types'

export function buildSortOption(
  field: BoxesSortField,
  direction: BoxesSortDirection
): BoxesSortOptions {
  return `${field}_${direction}`
}

export function parseSort(sort: BoxesSortOptions | undefined) {
  const [field, direction] = sort
    ? sort.split('_')
    : DEFAULT_BOXES_SORT_OPTION.split('_')
  return {
    field,
    direction,
  }
}

export function toOrderBy(sort: BoxesSortOptions | undefined) {
  const { field, direction } = parseSort(sort)
  const sortFunc = direction === 'asc' ? asc : desc

  const boxField = field as BoxesSortField
  const boxColumn = BOXES_SORTABLE_COLUMNS[boxField]

  return sortFunc(boxColumn)
}

export function clampInt(
  value: unknown,
  fallback: number,
  min: number,
  max: number
) {
  const n = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(n)) return fallback
  return Math.min(max, Math.max(min, Math.trunc(n)))
}
