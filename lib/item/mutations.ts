import { db } from '@/db'
import { Item, items } from '@/db/schema'
import { CreateItemData } from '@/lib/item/types'
import { getCurrentUser } from '@/lib/user'
import { and, eq, inArray } from 'drizzle-orm'
import 'server-only'

export async function createItem(data: CreateItemData): Promise<Item> {
  const user = await getCurrentUser()
  const [newItem] = await db
    .insert(items)
    .values({ ...data, userId: user.id })
    .returning()

  if (!newItem) throw new Error('Failed to create item')

  return newItem
}

export async function deleteItems(itemIds: string[]): Promise<number> {
  const user = await getCurrentUser()
  const result = await db
    .delete(items)
    .where(and(inArray(items.id, itemIds), eq(items.userId, user.id)))
    .returning({ id: items.id })

  return result.length
}
