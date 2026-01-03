import { db } from '@/db'
import { Image, images } from '@/db/schema'
import { and, desc, eq, inArray } from 'drizzle-orm'
import 'server-only'

/** Create a new Image record */
export async function createImageRecord(
  userId: string,
  boxId: string,
  url: string,
  pathname: string
): Promise<Image> {
  const [image] = await db
    .insert(images)
    .values({
      boxId,
      userId,
      url,
      pathname,
    })
    .returning()

  if (!image) throw new Error('Failed to save the image info')
  return image
}

/** Delete an Image record by its ID */
export async function deleteImageRecord(
  userId: string,
  imageId: string
): Promise<void> {
  await db.delete(images).where(
    and(
      eq(images.id, imageId),
      eq(images.userId, userId) // ensure the image belongs to the current user
    )
  )
}

/** Fetch images for a specific box belonging to a user */
export async function getImages(
  userId: string,
  boxIds: string[]
): Promise<Image[]> {
  return db.query.images.findMany({
    where: and(inArray(images.boxId, boxIds), eq(images.userId, userId)),
    orderBy: desc(images.createdAt),
  })
}
