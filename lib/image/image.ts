import { db } from '@/db'
import { ImageRecord, images, items } from '@/db/schema'
import { getCurrentUser } from '@/lib/user'
import { and, eq, inArray, or } from 'drizzle-orm'
import 'server-only'

/** Create a new Image record */
export async function createImageRecord(
  boxId: string | null,
  itemId: string | null,
  url: string,
  pathname: string,
): Promise<ImageRecord> {
  const user = await getCurrentUser()
  const [image] = await db
    .insert(images)
    .values({
      userId: user.id,
      boxId,
      itemId,
      url,
      pathname,
    })
    .returning()

  if (!image) throw new Error('Failed to save the image record')
  return image
}

/** Delete an Image record by its ID */
export async function deleteImagesRecord(imageIds: string[]): Promise<void> {
  const user = await getCurrentUser()

  await db
    .delete(images)
    .where(and(inArray(images.id, imageIds), eq(images.userId, user.id)))
}

/** Fetch images by their IDs for a specific user */
export async function getImagesByIds(
  userId: string,
  imageIds: string[],
): Promise<ImageRecord[]> {
  return db.query.images.findMany({
    where: { id: { in: imageIds }, userId },
  })
}

/** Fetch images by their pathnames for a specific user */
export async function getImagesByPathnames(
  pathnames: string[],
): Promise<ImageRecord[]> {
  const user = await getCurrentUser()

  return db.query.images.findMany({
    where: {
      pathname: { in: pathnames },
      userId: user.id,
    },
  })
}

export async function getBoxesImages(boxIds: string[]): Promise<ImageRecord[]> {
  const user = await getCurrentUser()
  return db
    .select({
      id: images.id,
      userId: images.userId,
      boxId: images.boxId,
      itemId: images.itemId,
      url: images.url,
      createdAt: images.createdAt,
      pathname: images.pathname,
    })
    .from(images)
    .leftJoin(items, eq(images.itemId, items.id))
    .where(
      and(
        eq(images.userId, user.id),
        or(inArray(items.boxId, boxIds), inArray(images.boxId, boxIds)),
      ),
    )
}

export async function getItemsImages(
  itemsIds: string[],
): Promise<ImageRecord[]> {
  const user = await getCurrentUser()
  return db.query.images.findMany({
    where: {
      itemId: { in: itemsIds },
      userId: user.id,
    },
    orderBy: { createdAt: 'desc' },
  })
}
