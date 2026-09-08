import { db } from '@/db'
import { boxes, Item, items } from '@/db/schema'
import { toOrderBy } from '@/lib/item'
import { getCurrentUser } from '@/lib/user'
import { and, eq, ilike, sql } from 'drizzle-orm'
import 'server-only'
import { ItemsPaginated, ItemsQuery } from './types'

export async function getItemById(itemId: string): Promise<Item | undefined> {
  const user = await getCurrentUser()
  return db.query.items.findFirst({
    where: { id: itemId, userId: user.id },
  })
}

export async function getItems(
  boxId: string,
  query: ItemsQuery = {},
): Promise<ItemsPaginated> {
  const user = await getCurrentUser()

  const search = query.search?.trim()
  const filters = [
    eq(boxes.userId, user.id),
    eq(items.boxId, boxId),
    search ? ilike(items.name, `%${search}%`) : undefined,
  ].filter(Boolean)

  const whereClause = and(...filters)

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(items)
    .innerJoin(boxes, eq(items.boxId, boxes.id))
    .where(whereClause)

  const total = Number(count) || 0

  const itemsList = await db.query.items.findMany({
    where: {
      userId: user.id,
      boxId,
      name: {
        ilike: `%${search}%`,
      },
    },
    orderBy: (table, { desc, asc }) => toOrderBy(query.sort, table, desc, asc),
    limit: 20,
    offset: 0,
  })

  return { items: itemsList, total }
}

export async function getBoxesIdsContainingItem(itemName: string) {
  const user = await getCurrentUser()
  const search = itemName.trim()

  if (!search) {
    return []
  }

  const itemsList = await db
    .select({ boxId: items.boxId })
    .from(items)
    .innerJoin(boxes, eq(items.boxId, boxes.id))
    .where(and(eq(boxes.userId, user.id), ilike(items.name, `%${search}%`)))
    .groupBy(items.boxId)

  const boxesIds = itemsList.map((i) => i.boxId)
  return boxesIds
}
