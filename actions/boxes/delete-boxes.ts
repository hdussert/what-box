'use server'

import { deleteBoxes } from '@/lib/box'
import { getImagePathnamesByBoxIds } from '@/lib/image/queries'
import { deleteImageFiles } from '@/lib/image/storage'
import { revalidatePath } from 'next/cache'
import { unstable_rethrow } from 'next/navigation'

export async function deleteBoxesAction(boxIds: string[]) {
  if (boxIds.length === 0) {
    return {
      success: false,
      message: 'No boxes selected for deletion',
    }
  }

  try {
    // Delete the images uploaded (Vercel)
    const pathnames = await getImagePathnamesByBoxIds(boxIds)

    if (pathnames.length) {
      await deleteImageFiles(pathnames).catch((error) => {
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
    // Let getCurrentUser()'s sign-in redirect through
    unstable_rethrow(error)
    console.error('Error deleting boxes and associated data:', error)
    return {
      success: false,
      message:
        (error as Error).message ?? 'An error occurred while deleting boxes',
      error: 'Failed to delete boxes and associated data',
    }
  }
}
