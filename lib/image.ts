import { db } from '@/db'
import { Image, images } from '@/db/schema'
import { getCurrentUser } from '@/lib/user'
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
export async function deleteImagesRecord(
  userId: string,
  imageIds: string[]
): Promise<void> {
  await db.delete(images).where(
    and(
      inArray(images.id, imageIds),
      eq(images.userId, userId) // ensure the image belongs to the current user
    )
  )
}

/** Fetch images by their IDs for a specific user */
export async function getImagesByIds(
  userId: string,
  imageIds: string[]
): Promise<Image[]> {
  return db.query.images.findMany({
    where: and(inArray(images.id, imageIds), eq(images.userId, userId)),
  })
}

/** Fetch images by their pathnames for a specific user */
export async function getImagesByPathnames(
  userId: string,
  pathnames: string[]
): Promise<Image[]> {
  return db.query.images.findMany({
    where: and(inArray(images.pathname, pathnames), eq(images.userId, userId)),
  })
}

/** Fetch images for a specific box belonging to a user */
export async function getBoxImages(
  userId: string,
  boxIds: string[]
): Promise<Image[]> {
  return db.query.images.findMany({
    where: and(inArray(images.boxId, boxIds), eq(images.userId, userId)),
    orderBy: desc(images.createdAt),
  })
}

/** Fetch images for a specific box belonging to the current user */
export async function getUserBoxImages(
  boxId: string
): Promise<{ images: Image[] }> {
  // Lazy load to avoid circular dependencies
  const user = await getCurrentUser()
  const images = await getBoxImages(user.id, [boxId])
  return { images }
}
