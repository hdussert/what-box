import { SortValue } from '@/components/list/types'
import { Column, is, SQL, sql, SQLWrapper } from 'drizzle-orm'

type SortOperators = Record<'asc' | 'desc', (column: SQLWrapper) => SQL>

/**
 * Turns a `field_direction` sort value into an ORDER BY on that column of
 * `table`, case-insensitive for text columns.
 */
export function toOrderBy(
  sort: SortValue,
  table: object,
  { asc, desc }: SortOperators,
) {
  const [field, direction] = sort.split('_')
  const column: unknown = table[field as keyof typeof table]
  if (!is(column, Column)) {
    throw new Error(`Unknown sort field: ${field}`)
  }

  const sortFunc = direction === 'asc' ? asc : desc
  return sortFunc(column.dataType === 'string' ? sql`lower(${column})` : column)
}
