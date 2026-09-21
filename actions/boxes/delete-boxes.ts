'use server'

import { deleteBoxes } from '@/lib/box'
import { getBoxesImages } from '@/lib/image/image-record'
import { deleteImagesFiles } from '@/lib/image/image-upload'
import { revalidatePath } from 'next/cache'

export async function deleteBoxesAction(boxIds: string[]) {
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
      await deleteImagesFiles(imagesPathnames).catch((error) => {
        console.error('Failed to delete some image files :', error)
        // Continue even if the blob deletion fails (shouldn't stop the user)
      })
    }

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
