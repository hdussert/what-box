'use server'

import { ActionResponse } from '@/app/actions/response-type'
import { deleteFiles } from '@/lib/files'
import { deleteImagesRecord, getImagesByPathnames } from '@/lib/image'
import { getCurrentUser } from '@/lib/user'

export async function deleteImages(
  pathnames: string[]
): Promise<ActionResponse> {
  const user = await getCurrentUser()
  try {
    if (pathnames.length === 0) {
      throw new Error('No image IDs provided for deletion')
    }

    const images = await getImagesByPathnames(user.id, pathnames)
    if (images.length === 0) {
      throw new Error('No images found for the provided IDs')
    }

    // Delete image records from Vercel bucket
    await deleteFiles(pathnames).catch(() => {
      console.error('Failed to delete image files') // Silently log the error
    })

    // Delete image records from the database
    const imageIds = images.map((img) => img.id)
    await deleteImagesRecord(user.id, imageIds)

    return {
      success: true,
      message: 'Images deleted successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || 'Failed to delete images',
    }
  }
}
