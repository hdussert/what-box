import { db } from '@/db'
import { Item, items } from '@/db/schema'
import { getBoxById } from '@/lib/box/queries'
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

  // boxId comes straight from the caller - without this, anyone could plant
  // an item inside another user's box (the boxes -> items relation has no
  // userId filter, so it'd show up when that user views their box).
  const box = await getBoxById(data.boxId)
  if (!box) {
    throw new Error('Box not found')
  }

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
