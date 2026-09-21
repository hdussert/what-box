'use server'

import { getImagesByItemIds } from '@/lib/image/records'
import { deleteImageFiles } from '@/lib/image/storage'
import { deleteItems } from '@/lib/item'
import { revalidatePath } from 'next/cache'

export async function deleteItemsAction(itemIds: string[]) {
  if (itemIds.length === 0) {
    return {
      success: false,
      message: 'No items selected for deletion',
    }
  }

  try {
    // Delete the images uploaded (Vercel)
    const images = await getImagesByItemIds(itemIds)

    if (images.length) {
      const imagesPathnames = images.map((image) => image.pathname)
      await deleteImageFiles(imagesPathnames).catch((error) => {
        console.error('Failed to delete some image files :', error)
        // Continue even if the blob deletion fails (shouldn't stop the user)
      })
    }

    // Delete items records (images will be deleted on cascade)
    await deleteItems(itemIds)
    revalidatePath('/dashboard')

    return {
      success: true,
      deleted: itemIds.length,
    }
  } catch (error) {
    console.error('Error deleting items and associated data:', error)
    return {
      success: false,
      message:
        (error as Error).message ?? 'An error occurred while deleting items',
      error: 'Failed to delete items and associated data',
    }
  }
}
