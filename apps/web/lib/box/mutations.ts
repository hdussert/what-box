import { db } from '@/db'
import { Box, boxes } from '@/db/schema'
import { UpdateBoxData } from '@/lib/box/types'
import { getImagePathnamesByBoxIds } from '@/lib/image/queries'
import { deleteImageFiles } from '@/lib/image/storage'
import { StoredImage } from '@/lib/image/types'
import { getCurrentUser } from '@/lib/user'
import { and, eq, inArray } from 'drizzle-orm'
import 'server-only'

export async function createBox(name: string, shortId: string): Promise<Box> {
  const user = await getCurrentUser()
  const [newBox] = await db
    .insert(boxes)
    .values({ userId: user.id, name, shortId })
    .returning()

  if (!newBox) throw new Error('Failed to create box')

  return newBox
}

/** Returns undefined if the box doesn't exist or isn't the current user's - same convention as getBoxById. */
export async function updateBox({
  id,
  ...data
}: UpdateBoxData): Promise<Box | undefined> {
  const user = await getCurrentUser()
  const [updatedBox] = await db
    .update(boxes)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(boxes.userId, user.id), eq(boxes.id, id)))
    .returning()

  return updatedBox
}

export async function updateBoxImage(
  id: string,
  image: StoredImage | null,
): Promise<Box> {
  const user = await getCurrentUser()
  const [updatedBox] = await db
    .update(boxes)
    .set({
      imageUrl: image?.url ?? null,
      imagePathname: image?.pathname ?? null,
      updatedAt: new Date(),
    })
    .where(and(eq(boxes.userId, user.id), eq(boxes.id, id)))
    .returning()

  if (!updatedBox) {
    throw new Error('Failed to update the box image')
  }

  return updatedBox
}

export async function deleteBoxes(boxIds: string[]): Promise<number> {
  const user = await getCurrentUser()
  const result = await db
    .delete(boxes)
    .where(and(inArray(boxes.id, boxIds), eq(boxes.userId, user.id)))
    .returning({ id: boxes.id })

  return result.length
}

/**
 * Deletes boxes and their images (the box's own image, plus every item's
 * image inside it - deleteBoxes cascades items in the DB, but not in Blob).
 * Pathnames must be collected before the DB delete, and the blob cleanup is
 * best-effort: a failed blob delete shouldn't block the DB delete the user
 * asked for.
 */
export async function deleteBoxesWithImages(boxIds: string[]): Promise<number> {
  const pathnames = await getImagePathnamesByBoxIds(boxIds)
  if (pathnames.length) {
    await deleteImageFiles(pathnames).catch((error) => {
      console.error('Failed to delete some image files:', error)
    })
  }

  return deleteBoxes(boxIds)
}
