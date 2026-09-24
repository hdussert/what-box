import { getBoxById, updateBoxImage } from '@/lib/box'
import { deleteImageFiles, uploadImageFile } from '@/lib/image/storage'
import {
  ImageOwner,
  PreparedImage,
  StoredImage,
  UploadImageData,
} from '@/lib/image/types'
import { getItemById, updateItemImage } from '@/lib/item'
import 'server-only'

/**
 * Create a box or item together with its image: upload the image first (under
 * the owner's pre-generated id), then run `create` with the stored file, so
 * the row is inserted complete in one go. If `create` fails, the upload is
 * deleted. Without an image, just runs `create(null)`.
 */
export async function createWithImage<T>(
  owner: ImageOwner,
  image: PreparedImage | null,
  create: (image: StoredImage | null) => Promise<T>,
): Promise<T> {
  if (!image) {
    return create(null)
  }

  const blob = await uploadImageFile({ ...owner, image })
  const storedImage = { url: blob.url, pathname: blob.pathname }
  try {
    return await create(storedImage)
  } catch (error) {
    await deleteImageFiles(blob.pathname).catch((cleanupError) =>
      console.error('Failed to delete the uploaded image', {
        pathname: blob.pathname,
        cleanupError,
      }),
    )
    throw error
  }
}

/** Upload an image and set it as an existing box's (or item's) image */
export async function saveImage(data: UploadImageData): Promise<void> {
  const { boxId, itemId } = data
  const blob = await uploadImageFile(data)
  const image = { url: blob.url, pathname: blob.pathname }

  try {
    if (itemId) {
      await updateItemImage(itemId, image)
    } else {
      await updateBoxImage(boxId, image)
    }
  } catch (error) {
    // Clean up if DB fails
    await deleteImageFiles(blob.pathname)
    throw error
  }
}

/** Remove the box's (or the item's) image and delete its file */
export async function deleteImage({
  boxId,
  itemId,
}: ImageOwner): Promise<void> {
  const owner = itemId ? await getItemById(itemId) : await getBoxById(boxId)
  const pathname = owner?.imagePathname
  if (!pathname) {
    throw new Error('No image found')
  }

  if (itemId) {
    await updateItemImage(itemId, null)
  } else {
    await updateBoxImage(boxId, null)
  }

  // Failure here should not affect the user
  try {
    await deleteImageFiles(pathname)
  } catch (error) {
    console.error('Failed to delete image file', { pathname, error })
  }
}
