import { SortValue } from '@/components/list/types'
import { items } from '@/db/schema'
import { ITEMS_DEFAULT_SORT_OPTION } from '@/lib/item/const'
import { AnyColumn, SQL, sql, SQLWrapper } from 'drizzle-orm'
import { ItemsSortField } from './types'

export function parseSort(sort: SortValue | undefined) {
  const [field, direction] = sort
    ? sort.split('_')
    : ITEMS_DEFAULT_SORT_OPTION.split('_')
  return {
    field,
    direction,
  }
}

export function toOrderBy(
  sort: SortValue | undefined,
  itemsTable: typeof items,
  asc: (column: SQLWrapper<unknown> | AnyColumn) => SQL,
  desc: (column: SQLWrapper<unknown> | AnyColumn) => SQL,
) {
  const { field, direction } = parseSort(sort)
  const sortFunc = direction === 'asc' ? asc : desc

  const itemField = field as ItemsSortField
  const itemColumn = itemsTable[itemField]

  if (typeof itemColumn === 'string') {
    return sortFunc(sql`lower(${itemColumn})`)
  }

  return sortFunc(itemColumn)
}
