import { db } from '@/db'
import { Item, items } from '@/db/schema'
import { getCurrentUser } from '@/lib/user'
import { and, eq, ilike, sql } from 'drizzle-orm'
import 'server-only'
import { ItemsPaginated, ItemsQuery } from './types'
import { toOrderBy } from './utils'

export async function getItemById(
  userId: string,
  itemId: string
): Promise<Item | undefined> {
  return db.query.items.findFirst({
    where: and(eq(items.id, itemId), eq(items.userId, userId)),
  })
}

export async function getBoxItems(
  userId: string,
  boxId: string,
  query: ItemsQuery = {}
): Promise<ItemsPaginated> {
  const search = query.search?.trim()
  const pageSize = query.pageSize ?? 100
  const page = query.page ?? 1

  const filters = [
    eq(items.userId, userId),
    eq(items.boxId, boxId),
    search ? ilike(items.name, `%${search}%`) : undefined,
  ].filter(Boolean)

  const whereClause = and(...filters)

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(items)
    .where(whereClause)

  const total = Number(count) || 0
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(page, totalPages)
  const offset = (safePage - 1) * pageSize

  const itemsList = await db.query.items.findMany({
    where: whereClause,
    orderBy: toOrderBy(query.sort),
    limit: pageSize,
    offset,
  })

  return { items: itemsList, total, page: safePage, pageSize, totalPages }
}

export async function getUserBoxItems(
  boxId: string,
  query: ItemsQuery = {}
): Promise<ItemsPaginated> {
  const user = await getCurrentUser()
  return getBoxItems(user.id, boxId, query)
}
