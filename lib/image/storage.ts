import { UploadImageData } from '@/lib/image/types'
import { buildImagePath } from '@/lib/image/utils'
import { getCurrentUser } from '@/lib/user'
import { del, put } from '@vercel/blob'
import sharp from 'sharp'
import 'server-only'

export async function uploadImageFile({
  boxId,
  itemId = null,
  image,
}: UploadImageData) {
  const user = await getCurrentUser()
  const imagePath = buildImagePath({
    userId: user.id,
    boxId: boxId,
    itemId: itemId,
    imageName: image.name,
  })

  const cleanImage = await stripMetadata(image)

  return put(imagePath, cleanImage, {
    access: 'public',
    addRandomSuffix: true,
    contentType: image.type,
  })
}

/**
 * Re-encodes the image without its metadata (EXIF, XMP, IPTC): phone photos
 * carry the GPS location where they were taken, and blobs are public.
 * `rotate()` bakes the EXIF orientation into the pixels first, or portrait
 * photos would turn sideways once it's gone. Keeps the input format.
 */
async function stripMetadata(image: File): Promise<Buffer> {
  const input = Buffer.from(await image.arrayBuffer())
  try {
    return await sharp(input).rotate().toBuffer()
  } catch {
    throw new Error('Invalid image file')
  }
}

export async function deleteImageFiles(pathnames: string | string[]) {
  // Auth check only: throws when signed out
  await getCurrentUser()
  return del(pathnames)
}
