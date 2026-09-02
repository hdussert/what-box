import { db } from '@/db'
import { Box, boxes } from '@/db/schema'
import { getBoxesIdsContainingItem } from '@/lib/item'
import { getCurrentUser } from '@/lib/user'
import { and, eq, ilike, inArray, or, sql } from 'drizzle-orm'
import 'server-only'
import { BoxesPaginated, BoxesQuery } from './types'
import { toOrderBy } from './utils'

// Single box queries
export async function getBoxById(boxId: string): Promise<Box | undefined> {
  const user = await getCurrentUser()
  return db.query.boxes.findFirst({
    where: { id: boxId, userId: user.id },
  })
}

export async function getBoxByShortId(
  shortId: string,
): Promise<Box | undefined> {
  const user = await getCurrentUser()
  return db.query.boxes.findFirst({
    where: { shortId, userId: user.id },
  })
}

export async function getBoxes(
  query: BoxesQuery = {},
): Promise<BoxesPaginated> {
  const user = await getCurrentUser()
  const search = query.search?.trim() // Search can mean "box name" but also "an item inside a box"

  // Boxes containing an item we are searching
  const boxesContainingMachingItem = search
    ? await getBoxesIdsContainingItem(search)
    : []
  const searchHasMatchingItems = search && boxesContainingMachingItem.length > 0

  // Count the boxes matching the results (used for pagination)
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(boxes)
    .where(
      and(
        eq(boxes.userId, user.id),
        or(
          search ? ilike(boxes.name, `%${search}%`) : undefined, // Search in box name
          search ? inArray(boxes.id, boxesContainingMachingItem) : undefined, // Search in items names (via box IDs)
        ),
      ),
    )

  const total = Number(count) || 0

  const boxesResult = await db.query.boxes.findMany({
    where: {
      userId: user.id,
      OR: [
        { name: { ilike: `%${search}%` } },
        { id: { in: boxesContainingMachingItem } },
      ],
    },
    orderBy: (table, { desc, asc }) => toOrderBy(query.sort, table, desc, asc),
    limit: 20,
    offset: 0,
    with: {
      items: searchHasMatchingItems
        ? {
            orderBy: (items, { sql }) => [
              sql`CASE WHEN ${ilike(
                items.name,
                `%${search}%`,
              )} THEN 0 ELSE 1 END`, // Prioritize items matching the search
            ],
          }
        : true,
      images: true,
    },
  })

  return { items: boxesResult, total }
}
