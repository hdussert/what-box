'use server'

import { ActionResponse } from '@/actions/types'
import { deleteImageRecords, getImagesByPathnames } from '@/lib/image/records'
import { deleteImageFiles } from '@/lib/image/storage'

export async function deleteImagesAction(
  pathnames: string[],
): Promise<ActionResponse> {
  try {
    if (pathnames.length === 0) {
      throw new Error('No image pathnames provided for deletion')
    }

    const images = await getImagesByPathnames(pathnames)

    if (images.length === 0) {
      throw new Error('No images found for the provided pathnames')
    }

    const imageIds = images.map((image) => image.id)
    await deleteImageRecords(imageIds)

    // Failure here should not affect the user
    try {
      await deleteImageFiles(pathnames)
    } catch (error) {
      console.error('Failed to delete image files', {
        pathnames,
        error,
      })
    }

    return {
      success: true,
      message: 'Images deleted successfully',
    }
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to delete images',
    }
  }
}
