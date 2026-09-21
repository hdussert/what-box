'use server'

import { ActionResponse } from '@/actions/response-type'
import {
  deleteImagesRecord,
  getImagesByPathnames,
} from '@/lib/image/image-record'
import { deleteImagesFiles } from '@/lib/image/image-upload'

export async function deleteImages(
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
    await deleteImagesRecord(imageIds)

    // Failure here should not affect the user
    try {
      await deleteImagesFiles(pathnames)
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
