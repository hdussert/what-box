'use server'

import { deleteBoxes } from '@/lib/box'
import { deleteFiles } from '@/lib/files'
import { getBoxesImages } from '@/lib/image/image'
import { revalidatePath } from 'next/cache'

export async function deleteBoxesAndAssociatedDatas(boxIds: string[]) {
  if (boxIds.length === 0) {
    return {
      success: false,
      message: 'No boxes selected for deletion',
    }
  }

  try {
    // Delete the images uploaded (Vercel)
    const images = await getBoxesImages(boxIds)

    if (images.length) {
      const imagesPathnames = images.map((image) => image.pathname)
      await deleteFiles(imagesPathnames).catch((error) => {
        console.error('Failed to delete some image files :', error)
        // Continue even if the blob deletion fails (shouldn't stop the user)
      })
    }

    // Delete box records (images will be deleted on cascade)
    await deleteBoxes(boxIds)
    revalidatePath('/dashboard')

    return {
      success: true,
      deleted: boxIds.length,
    }
  } catch (error) {
    console.error('Error deleting boxes and associated data:', error)
    return {
      success: false,
      message:
        (error as Error).message ?? 'An error occurred while deleting boxes',
      error: 'Failed to delete boxes and associated data',
    }
  }
}
