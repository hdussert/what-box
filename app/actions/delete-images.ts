'use server'

import { ActionResponse } from '@/app/actions/response-type'
import { deleteFiles } from '@/lib/files'
import { deleteImagesRecord, getImagesByIds } from '@/lib/image'
import { getCurrentUser } from '@/lib/user'

export async function deleteImages(
  imageIds: string[]
): Promise<ActionResponse> {
  const user = await getCurrentUser()
  try {
    if (imageIds.length === 0) {
      throw new Error('No image IDs provided for deletion')
    }

    const images = await getImagesByIds(user.id, imageIds)

    // Delete image records from Vercel bucket
    await deleteFiles(images.map((img) => img.pathname)).catch(() => {
      console.error('Failed to delete image files') // Silently log the error
    })

    // Delete image records from the database
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
