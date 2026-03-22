import {
  DEFAULT_ITEMS_SORT_OPTION,
  ITEMS_SORTABLE_COLUMNS,
} from '@/lib/item/const'
import { asc, desc, sql } from 'drizzle-orm'
import { ItemsSortDirection, ItemsSortField, ItemsSortOptions } from './types'

export function buildSortOption(
  field: ItemsSortField,
  direction: ItemsSortDirection
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

export function toOrderBy(sort: ItemsSortOptions | undefined) {
  const { field, direction } = parseSort(sort)
  const sortFunc = direction === 'asc' ? asc : desc

  const itemField = field as ItemsSortField
  const itemColumn = ITEMS_SORTABLE_COLUMNS[itemField]

  return sortFunc(sql`lower(${itemColumn})`)
}
