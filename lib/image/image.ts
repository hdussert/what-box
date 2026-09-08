import { db } from '@/db'
import { boxes, ImageRecord, images, items } from '@/db/schema'
import { getCurrentUser } from '@/lib/user'
import { and, inArray, sql } from 'drizzle-orm'
import 'server-only'

/** Create a new Image record */
export async function createImageRecord(
  boxId: string,
  url: string,
  pathname: string,
): Promise<ImageRecord> {
  const [image] = await db
    .insert(images)
    .values({
      boxId,
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

  await db.delete(images).where(
    and(
      inArray(images.id, imageIds),
      sql`
          (
            EXISTS (
              SELECT 1
              FROM ${boxes}
              WHERE ${boxes.id} = ${images.boxId}
                AND ${boxes.userId} = ${user.id}
            )
            OR
            EXISTS (
              SELECT 1
              FROM ${items}
              INNER JOIN ${boxes}
                ON ${boxes.id} = ${items.boxId}
              WHERE ${items.id} = ${images.itemId}
                AND ${boxes.userId} = ${user.id}
            )
          )
        `,
    ),
  )
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
      OR: [
        {
          box: {
            userId: user.id,
          },
        },
        {
          item: {
            box: {
              userId: user.id,
            },
          },
        },
      ],
    },
  })
}

/** Fetch images for a specific box belonging to a user */
export async function getBoxesImages(boxIds: string[]): Promise<ImageRecord[]> {
  return db.query.images.findMany({
    where: { boxId: { in: boxIds } },
    orderBy: { createdAt: 'desc' },
  })
}
