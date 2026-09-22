'use server'

import { deleteBoxesWithImages } from '@/lib/box'
import { revalidatePath } from 'next/cache'

export async function deleteBoxesAction(boxIds: string[]) {
  if (boxIds.length === 0) {
    return {
      success: false,
      message: 'No boxes selected for deletion',
    }
  }

  try {
    const deleted = await deleteBoxesWithImages(boxIds)
    revalidatePath('/dashboard')

    return {
      success: true,
      deleted,
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
