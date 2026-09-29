import { SortValue } from '@/components/list/types'
import { Column, getColumns, SQL, sql, SQLWrapper, Table } from 'drizzle-orm'

type SortOperators = Record<'asc' | 'desc', (column: SQLWrapper) => SQL>

/**
 * Turns a `field_direction` sort value into an ORDER BY on that column of
 * `table`, case-insensitive for text columns.
 */
export function toOrderBy(
  sort: SortValue,
  table: Table,
  { asc, desc }: SortOperators,
) {
  const [field, direction] = sort.split('_')
  const column: Column | undefined = getColumns(table)[field]
  if (!column) {
    throw new Error(`Unknown sort field: ${field}`)
  }

  const sortFunc = direction === 'asc' ? asc : desc
  return sortFunc(column.dataType === 'string' ? sql`lower(${column})` : column)
}
