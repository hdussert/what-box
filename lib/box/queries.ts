import { db } from '@/db'
import { boxes, items } from '@/db/schema'
import { toOrderBy } from '@/lib/list/utils'
import { getCurrentUser } from '@/lib/user'
import { escapeLike } from '@/lib/utils'
import { and, eq, exists, ilike, sql } from 'drizzle-orm'
import 'server-only'
import { BOXES_DEFAULT_SORT, BOXES_PAGE_SIZE } from './const'
import { BoxesPaginated, BoxesQuery, BoxWithRelations } from './types'

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

  const countQuery = db.$count(
    boxes,
    and(
      eq(boxes.userId, user.id),
      pattern ? matchesSearch(boxes, pattern) : undefined,
    ),
  )

  const pageQuery = db.query.boxes.findMany({
    where: {
      userId: user.id,
      ...(pattern ? { RAW: (table) => matchesSearch(table, pattern) } : {}),
    },
    orderBy: (table, operators) =>
      toOrderBy(query.sort ?? BOXES_DEFAULT_SORT, table, operators),
    limit: BOXES_PAGE_SIZE,
    with: { items: pattern ? matchingItemsFirst(pattern) : true },
  })

  const [total, rows] = await Promise.all([countQuery, pageQuery])
  return { rows, total }
}

/** A box matches a search by its name, its short ID or the name of an item inside it. */
function matchesSearch(table: typeof boxes, pattern: string) {
  const nameMatches = ilike(table.name, pattern)
  const shortIdMatches = ilike(table.shortId, pattern)
  const hasMatchingItem = exists(
    db
      .select({ id: items.id })
      .from(items)
      .where(and(eq(items.boxId, table.id), ilike(items.name, pattern))),
  )

  return sql`(${nameMatches} OR ${shortIdMatches} OR ${hasMatchingItem})`
}

/** Orders a box's items with the search matches first, so the card summary shows them. */
function matchingItemsFirst(pattern: string) {
  return {
    orderBy: (itemsTable: typeof items) => [
      sql`CASE WHEN ${ilike(itemsTable.name, pattern)} THEN 0 ELSE 1 END`,
    ],
  }
}
