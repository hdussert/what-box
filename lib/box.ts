import { db } from '@/db'
import { Box, boxes } from '@/db/schema'
import { getCurrentUser } from '@/lib/user'
import { and, asc, desc, eq, ilike, inArray, sql } from 'drizzle-orm'
import 'server-only'

export type BoxesSort =
  | 'createdAt_desc'
  | 'createdAt_asc'
  | 'name_asc'
  | 'name_desc'

export type BoxesQuery = {
  search?: string
  sort?: BoxesSort
  page?: number
  pageSize?: number
}

export type Paginated<T> = {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// ===== Utility Functions =====

function toOrderBy(sort: BoxesSort | undefined) {
  switch (sort) {
    case 'createdAt_asc':
      return asc(boxes.createdAt)
    case 'name_asc':
      return asc(boxes.name)
    case 'name_desc':
      return desc(boxes.name)
    case 'createdAt_desc':
    default:
      return desc(boxes.createdAt)
  }
}

function clampInt(value: unknown, fallback: number, min: number, max: number) {
  const n = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(n)) return fallback
  return Math.min(max, Math.max(min, Math.trunc(n)))
}

export async function createBox(
  userId: string,
  name: string,
  shortId: string
): Promise<Box> {
  const [newBox] = await db
    .insert(boxes)
    .values({ name, userId, shortId })
    .returning()

  if (!newBox) throw new Error('Failed to create box')

  return newBox
}

// Fetch boxes
export async function getBoxes(userId: string): Promise<Box[]> {
  return db.query.boxes.findMany({
    where: eq(boxes.userId, userId),
    orderBy: desc(boxes.createdAt),
  })
}

// Fetch a single box by ID
export async function getBoxById(
  userId: string,
  boxId: string
): Promise<Box | undefined> {
  return db.query.boxes.findFirst({
    where: and(eq(boxes.id, boxId), eq(boxes.userId, userId)), // keep single query helpers consistent
  })
}

export async function getBoxByShortId(
  userId: string,
  shortId: string
): Promise<Box | undefined> {
  return db.query.boxes.findFirst({
    where: and(eq(boxes.shortId, shortId), eq(boxes.userId, userId)), // keep single query helpers consistent
  })
}

export async function deleteBoxes(
  userId: string,
  boxIds: string[]
): Promise<void> {
  const result = await db
    .delete(boxes)
    .where(
      and(
        inArray(boxes.id, boxIds),
        eq(boxes.userId, userId) // ensure the box belongs to the current user
      )
    )
    .returning({ id: boxes.id })

  if (result.length === 0) {
    throw new Error('No valid boxes to delete')
  }
}

export async function createUserBox(
  name: string,
  shortId: string
): Promise<Box> {
  const user = await getCurrentUser()
  return createBox(user.id, name, shortId)
}
export async function getUserBoxes(): Promise<Box[]> {
  const user = await getCurrentUser()
  return getBoxes(user.id)
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
export async function getUserBoxesPaginated(
  query: BoxesQuery = {}
): Promise<Paginated<Box>> {
  const user = await getCurrentUser()

  const search = query.search?.trim()
  const pageSize = clampInt(query.pageSize ?? 20, 20, 5, 100)
  const page = clampInt(query.page ?? 1, 1, 1, 1_000_000)

  const filters = [
    eq(boxes.userId, user.id),
    search ? ilike(boxes.name, `%${search}%`) : undefined,
    // Add more filters here in the future
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

  const items = await db.query.boxes.findMany({
    where: whereClause,
    orderBy: toOrderBy(query.sort),
    limit: pageSize,
    offset,
  })

  return { items, total, page: safePage, pageSize, totalPages }
}
