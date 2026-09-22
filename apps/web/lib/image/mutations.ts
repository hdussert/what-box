import { getBoxById, updateBoxImage } from '@/lib/box'
import { deleteImageFiles, uploadImageFile } from '@/lib/image/storage'
import { ImageOwner, UploadImageData } from '@/lib/image/types'
import { getItemById, updateItemImage } from '@/lib/item'
import 'server-only'

/** Upload an image and set it as the box's (or the item's) image */
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

/** Remove the box's (or the item's) image and delete its file. Returns false if there was no image to remove. */
export async function deleteImage({
  boxId,
  itemId,
}: ImageOwner): Promise<boolean> {
  const owner = itemId ? await getItemById(itemId) : await getBoxById(boxId)
  const pathname = owner?.imagePathname
  if (!pathname) {
    return false
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

  return true
}
