import { db } from '@/db'
import { Item, items } from '@/db/schema'
import { getCurrentUser } from '@/lib/user'
import { and, eq, inArray } from 'drizzle-orm'
import 'server-only'
import { ItemCreate } from './types'

export async function createItem(
  userId: string,
  data: ItemCreate
): Promise<Item> {
  const [newItem] = await db
    .insert(items)
    .values({ ...data, userId })
    .returning()

  if (!newItem) throw new Error('Failed to create item')

  return newItem
}

export async function createUserItem(data: ItemCreate): Promise<Item> {
  const user = await getCurrentUser()
  return createItem(user.id, data)
}

export async function deleteItems(
  userId: string,
  itemIds: string[]
): Promise<number> {
  const result = await db
    .delete(items)
    .where(and(inArray(items.id, itemIds), eq(items.userId, userId)))
    .returning({ id: items.id })

  return result.length
}

export async function deleteUserItems(itemIds: string[]): Promise<number> {
  const user = await getCurrentUser()
  return deleteItems(user.id, itemIds)
}
