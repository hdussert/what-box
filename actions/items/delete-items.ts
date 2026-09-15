'use server'

import { deleteFiles } from '@/lib/files'
import { getItemsImages } from '@/lib/image/image'
import { deleteItems } from '@/lib/item'
import { revalidatePath } from 'next/cache'

export async function deleteItemsAndAssociatedDatas(itemsIds: string[]) {
  if (itemsIds.length === 0) {
    return {
      success: false,
      message: 'No items selected for deletion',
    }
  }

  try {
    // Delete the images uploaded (Vercel)
    const images = await getItemsImages(itemsIds)

    if (images.length) {
      const imagesPathnames = images.map((image) => image.pathname)
      await deleteFiles(imagesPathnames).catch((error) => {
        console.error('Failed to delete some image files :', error)
        // Continue even if the blob deletion fails (shouldn't stop the user)
      })
    }

    // Delete items records (images will be deleted on cascade)
    await deleteItems(itemsIds)
    revalidatePath('/dashboard')

    return {
      success: true,
      deleted: itemsIds.length,
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
