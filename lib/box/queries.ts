import { db } from '@/db'
import { Box, boxes } from '@/db/schema'
import { getBoxesIdsContainingItem } from '@/lib/item'
import { getCurrentUser } from '@/lib/user'
import { and, eq, ilike, inArray, or, sql } from 'drizzle-orm'
import 'server-only'
import { BoxesPaginated, BoxesQuery } from './types'
import { clampInt, toOrderBy } from './utils'

// Single box queries
export async function getBoxById(
  userId: string,
  boxId: string,
): Promise<Box | undefined> {
  return db.query.boxes.findFirst({
    where: { id: boxId, userId },
  })
}

export async function getBoxByShortId(
  userId: string,
  shortId: string,
): Promise<Box | undefined> {
  return db.query.boxes.findFirst({
    where: { shortId, userId },
  })
}

export async function getUserBoxById(boxId: string): Promise<Box | undefined> {
  const user = await getCurrentUser()
  return getBoxById(user.id, boxId)
}

// Multiple boxes queries
export async function getBoxes(userId: string): Promise<Box[]> {
  return db.query.boxes.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getUserBoxes(): Promise<Box[]> {
  const user = await getCurrentUser()
  return getBoxes(user.id)
}

export async function getUserBoxesPaginated(
  query: BoxesQuery = {},
): Promise<BoxesPaginated> {
  const user = await getCurrentUser()

  const search = query.search?.trim() // Search can mean "box name" but also "an item inside a box"
  const pageSize = clampInt(query.pageSize ?? 20, 20, 5, 100)
  const page = clampInt(query.page ?? 1, 1, 1, 1_000_000)

  // Boxes containing an item we are searching
  const boxesIdsContainingItem = search
    ? await getBoxesIdsContainingItem(user.id, search)
    : []
  const isItemsMatchingSearch = search && boxesIdsContainingItem.length > 0

  // Count the boxes matching the results (used for pagination)
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(boxes)
    .where(
      and(
        eq(boxes.userId, user.id),
        or(
          search ? ilike(boxes.name, `%${search}%`) : undefined, // Search in box name
          search ? inArray(boxes.id, boxesIdsContainingItem) : undefined, // Search in items names (via box IDs)
        ),
      ),
    )

  const total = Number(count) || 0
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(page, totalPages)
  const offset = (safePage - 1) * pageSize

  const boxesResult = await db.query.boxes.findMany({
    where: {
      userId: user.id,
      OR: [
        { name: { ilike: `%${search}%` } },
        { id: { in: boxesIdsContainingItem } },
      ],
    },
    orderBy: (table, { desc, asc }) => toOrderBy(query.sort, table, desc, asc),
    limit: pageSize,
    offset,
    with: {
      items: isItemsMatchingSearch
        ? {
            orderBy: (items, { sql }) => [
              sql`CASE WHEN ${ilike(
                items.name,
                `%${search}%`,
              )} THEN 0 ELSE 1 END`, // Prioritize items matching the search
            ],
          }
        : true,
    },
  })

  return { items: boxesResult, total, page: safePage, pageSize, totalPages }
}
