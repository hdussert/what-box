import { db } from '@/db'
import { Item, items } from '@/db/schema'
import { StoredImage } from '@/lib/image/types'
import { CreateItemData, UpdateItemData } from '@/lib/item/types'
import { getCurrentUser } from '@/lib/user'
import { and, eq, inArray } from 'drizzle-orm'
import 'server-only'

export async function updateItem({ id, ...data }: UpdateItemData) {
  const user = await getCurrentUser()
  const [updatedItem] = await db
    .update(items)
    .set({
      ...data,
    })
    .where(and(eq(items.userId, user.id), eq(items.id, id)))
    .returning()

  if (!updatedItem) {
    throw new Error('Failed to update the item')
  }

  return updatedItem
}

export async function updateItemImage(
  id: string,
  image: StoredImage | null,
): Promise<Item> {
  const user = await getCurrentUser()
  const [updatedItem] = await db
    .update(items)
    .set({
      imageUrl: image?.url ?? null,
      imagePathname: image?.pathname ?? null,
      updatedAt: new Date(),
    })
    .where(and(eq(items.userId, user.id), eq(items.id, id)))
    .returning()

  if (!updatedItem) {
    throw new Error('Failed to update the item image')
  }

  return updatedItem
}

export async function createItem(data: CreateItemData): Promise<Item> {
  const user = await getCurrentUser()
  const [newItem] = await db
    .insert(items)
    .values({ ...data, userId: user.id })
    .returning()

  if (!newItem) {
    throw new Error('Failed to create the item')
  }

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
