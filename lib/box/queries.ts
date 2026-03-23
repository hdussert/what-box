import { db } from '@/db'
import { Box, boxes } from '@/db/schema'
import { getBoxesIdsContainingItem } from '@/lib/item'
import { getCurrentUser } from '@/lib/user'
import { and, desc, eq, ilike, inArray, or, sql } from 'drizzle-orm'
import 'server-only'
import { BoxesPaginated, BoxesQuery } from './types'
import { clampInt, toOrderBy } from './utils'

// Single box queries
export async function getBoxById(
  userId: string,
  boxId: string
): Promise<Box | undefined> {
  return db.query.boxes.findFirst({
    where: and(eq(boxes.id, boxId), eq(boxes.userId, userId)),
  })
}

export async function getBoxByShortId(
  userId: string,
  shortId: string
): Promise<Box | undefined> {
  return db.query.boxes.findFirst({
    where: and(eq(boxes.shortId, shortId), eq(boxes.userId, userId)),
  })
}

export async function getUserBoxById(boxId: string): Promise<Box | undefined> {
  const user = await getCurrentUser()
  return getBoxById(user.id, boxId)
}

export async function getUserBoxByShortId(
  shortId: string
): Promise<Box | undefined> {
  const user = await getCurrentUser()
  return getBoxByShortId(user.id, shortId)
}

// Multiple boxes queries
export async function getBoxes(userId: string): Promise<Box[]> {
  return db.query.boxes.findMany({
    where: eq(boxes.userId, userId),
    orderBy: desc(boxes.createdAt),
  })
}

export async function getUserBoxes(): Promise<Box[]> {
  const user = await getCurrentUser()
  return getBoxes(user.id)
}

export async function getUserBoxesPaginated(
  query: BoxesQuery = {}
): Promise<BoxesPaginated> {
  const user = await getCurrentUser()

  const search = query.search?.trim()
  const pageSize = clampInt(query.pageSize ?? 20, 20, 5, 100)
  const page = clampInt(query.page ?? 1, 1, 1, 1_000_000)

  const boxesIdsContainingItem = search
    ? await getBoxesIdsContainingItem(user.id, search)
    : []

  const filters = [
    eq(boxes.userId, user.id),
    or(
      search ? ilike(boxes.name, `%${search}%`) : undefined, // Search in box name
      search ? inArray(boxes.id, boxesIdsContainingItem) : undefined // Search in items names (via box IDs)
    ),
  ].filter(Boolean)

  const whereClause = and(...filters)

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(boxes)
    .where(whereClause)

  const total = Number(count) || 0
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(page, totalPages)
  const offset = (safePage - 1) * pageSize

  const boxesResult = await db.query.boxes.findMany({
    where: whereClause,
    orderBy: toOrderBy(query.sort),
    limit: pageSize,
    offset,
    with: {
      items: true,
    },
  })

  return { items: boxesResult, total, page: safePage, pageSize, totalPages }
}
