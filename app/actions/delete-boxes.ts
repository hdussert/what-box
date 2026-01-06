'use server'

import { deleteBoxes } from '@/lib/box'
import { deleteFiles } from '@/lib/files'
import { getImages } from '@/lib/image'
import { getCurrentUser } from '@/lib/user'

export async function deleteBoxesAndAssociatedDatas(boxIds: string[]) {
  if (boxIds.length === 0) {
    return {
      success: false,
      message: 'No boxes selected for deletion',
    }
  }

  try {
    const user = await getCurrentUser()

    // Delete blobs associated with the boxes
    const images = await getImages(user.id, boxIds)
    const imagesPathnames = images.map((image) => image.pathname)
    await deleteFiles(imagesPathnames).catch((error) => {
      console.log('Failed to delete some image files :', error)
      // Continue even if the blob deletion fails (shouldn't stop the user)
    })

    // Delete box records from the database
    await deleteBoxes(user.id, boxIds)

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
