import { db } from '@/db'
import { Item, items } from '@/db/schema'
import { getBoxById } from '@/lib/box/queries'
import { getImagePathnamesByItemIds } from '@/lib/image/queries'
import { deleteImageFiles } from '@/lib/image/storage'
import { StoredImage } from '@/lib/image/types'
import { CreateItemData, UpdateItemData } from '@/lib/item/types'
import { getCurrentUser } from '@/lib/user'
import { and, eq, inArray } from 'drizzle-orm'
import 'server-only'

/** Returns undefined if the item doesn't exist or isn't the current user's - same convention as getBoxById. */
export async function updateItem({
  id,
  ...data
}: UpdateItemData): Promise<Item | undefined> {
  const user = await getCurrentUser()
  const [updatedItem] = await db
    .update(items)
    .set({
      ...data,
    })
    .where(and(eq(items.userId, user.id), eq(items.id, id)))
    .returning()

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

/** Returns undefined if boxId doesn't exist or isn't the current user's - same convention as updateItem/updateBox. */
export async function createItem(
  data: CreateItemData,
): Promise<Item | undefined> {
  const user = await getCurrentUser()

  // boxId comes straight from the caller - without this, anyone could plant
  // an item inside another user's box (the boxes -> items relation has no
  // userId filter, so it'd show up when that user views their box).
  const box = await getBoxById(data.boxId)
  if (!box) {
    return undefined
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

/** Deletes items and their images (best-effort on the blob side) - same shape as deleteBoxesWithImages. */
export async function deleteItemsWithImages(itemIds: string[]): Promise<number> {
  const pathnames = await getImagePathnamesByItemIds(itemIds)
  if (pathnames.length) {
    await deleteImageFiles(pathnames).catch((error) => {
      console.error('Failed to delete some image files:', error)
    })
  }

  return deleteItems(itemIds)
}
