import { boxes } from '@/db/schema'
import { DEFAULT_BOXES_SORT_OPTION } from '@/lib/box/const'
import { AnyColumn, SQL, sql, SQLWrapper } from 'drizzle-orm'
import { BoxesSortDirection, BoxesSortField, BoxesSortOptions } from './types'

export function buildSortOption(
  field: BoxesSortField,
  direction: BoxesSortDirection,
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

export function toOrderBy(
  sort: BoxesSortOptions | undefined,
  boxesTable: typeof boxes,
  asc: (column: SQLWrapper<unknown> | AnyColumn) => SQL,
  desc: (column: SQLWrapper<unknown> | AnyColumn) => SQL,
) {
  const { field, direction } = parseSort(sort)
  const sortFunc = direction === 'asc' ? asc : desc

  const boxField = field as BoxesSortField
  const boxColumn = boxesTable[boxField]

  if (typeof boxColumn === 'string') {
    return sortFunc(sql`lower(${boxColumn})`)
  }

  return sortFunc(boxColumn)
}

export function clampInt(
  value: unknown,
  fallback: number,
  min: number,
  max: number,
) {
  const n = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(n)) return fallback
  return Math.min(max, Math.max(min, Math.trunc(n)))
}
