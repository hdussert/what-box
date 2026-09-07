import { SortValue } from '@/app/components/common/list/useListParams'
import { boxes } from '@/db/schema'
import { BOXES_DEFAULT_SORT_OPTION } from '@/lib/box/const'
import { AnyColumn, SQL, sql, SQLWrapper } from 'drizzle-orm'
import { BoxesSortField } from './types'

export function parseSort(sort: SortValue | undefined) {
  const [field, direction] = sort
    ? sort.split('_')
    : BOXES_DEFAULT_SORT_OPTION.split('_')
  return {
    field,
    direction,
  }
}

export function toOrderBy(
  sort: SortValue | undefined,
  boxesTable: typeof boxes,
  asc: (column: SQLWrapper<unknown> | AnyColumn) => SQL,
  desc: (column: SQLWrapper<unknown> | AnyColumn) => SQL,
) {
  const { field, direction } = parseSort(sort)
  const sortFunc = direction === 'asc' ? asc : desc

  const boxField = field as BoxesSortField
  const boxColumn = boxesTable[boxField]

  if (boxColumn.dataType === 'string') {
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
