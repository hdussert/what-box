import { db } from '@/db'
import { boxes, items } from '@/db/schema'
import { getCurrentUser } from '@/lib/user'
import { escapeLike } from '@/lib/utils'
import { and, eq, exists, ilike, sql } from 'drizzle-orm'
import 'server-only'
import { BoxesPaginated, BoxesQuery, BoxWithRelations } from './types'
import { toOrderBy } from './utils'

// Single box queries
export async function getBoxById(
  boxId: string,
): Promise<BoxWithRelations | undefined> {
  const user = await getCurrentUser()
  return db.query.boxes.findFirst({
    where: { id: boxId, userId: user.id },
    with: { items: true },
  })
}

export async function getBoxesByIds(
  boxIds: string[],
): Promise<BoxWithRelations[] | undefined> {
  const user = await getCurrentUser()
  return db.query.boxes.findMany({
    where: { id: { in: boxIds }, userId: user.id },
    with: { items: true },
  })
}

export async function getBoxByShortId(shortId: string) {
  const user = await getCurrentUser()
  return db.query.boxes.findFirst({
    where: { shortId, userId: user.id },
  })
}

export async function getBoxes(
  query: BoxesQuery = {},
): Promise<BoxesPaginated> {
  const user = await getCurrentUser()
  const search = query.search?.trim()
  const pattern = search ? `%${escapeLike(search)}%` : undefined

  const [total, rows] = await Promise.all([
    db.$count(
      boxes,
      and(
        eq(boxes.userId, user.id),
        pattern ? matchesSearch(boxes, pattern) : undefined,
      ),
    ),
    db.query.boxes.findMany({
      where: {
        userId: user.id,
        ...(pattern ? { RAW: (table) => matchesSearch(table, pattern) } : {}),
      },
      orderBy: (table, { desc, asc }) =>
        toOrderBy(query.sort, table, desc, asc),
      limit: 20,
      offset: 0,
      with: {
        items: pattern
          ? {
              // Matching items first, so the card summary shows them
              orderBy: (items, { sql }) => [
                sql`CASE WHEN ${ilike(items.name, pattern)} THEN 0 ELSE 1 END`,
              ],
            }
          : true,
      },
    }),
  ])

  return { rows, total }
}

/** A box matches a search by its name, its short ID or the name of an item inside it. */
function matchesSearch(table: typeof boxes, pattern: string) {
  const hasMatchingItem = exists(
    db
      .select({ id: items.id })
      .from(items)
      .where(and(eq(items.boxId, table.id), ilike(items.name, pattern))),
  )
  return sql`(${ilike(table.name, pattern)} OR ${ilike(table.shortId, pattern)} OR ${hasMatchingItem})`
}
