import { items } from '@/db/schema'
import { DEFAULT_ITEMS_SORT_OPTION } from '@/lib/item/const'
import { AnyColumn, SQL, sql, SQLWrapper } from 'drizzle-orm'
import { ItemsSortDirection, ItemsSortField, ItemsSortOptions } from './types'

export function buildSortOption(
  field: ItemsSortField,
  direction: ItemsSortDirection,
): ItemsSortOptions {
  return `${field}_${direction}`
}

export function parseSort(sort: ItemsSortOptions | undefined) {
  const [field, direction] = sort
    ? sort.split('_')
    : DEFAULT_ITEMS_SORT_OPTION.split('_')
  return {
    field,
    direction,
  }
}

export function toOrderBy(
  sort: ItemsSortOptions | undefined,
  itemsTable: typeof items,
  asc: (column: SQLWrapper<unknown> | AnyColumn) => SQL,
  desc: (column: SQLWrapper<unknown> | AnyColumn) => SQL,
) {
  const { field, direction } = parseSort(sort)
  const sortFunc = direction === 'asc' ? asc : desc

  const itemField = field as ItemsSortField
  const itemColumn = itemsTable[itemField]

  if (itemField === 'createdAt') {
    return sortFunc(itemColumn)
  }

  return sortFunc(sql`lower(${itemColumn})`)
}
