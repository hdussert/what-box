'use server'

import { toUserMessage } from '@/lib/errors'
import { getImagePathnamesByItemIds } from '@/lib/image/queries'
import { enqueueImageCleanup } from '@/lib/image/queue'
import { deleteImageFiles } from '@/lib/image/storage'
import { deleteItems } from '@/lib/item'
import { revalidatePath } from 'next/cache'
import { unstable_rethrow } from 'next/navigation'

export async function deleteItemsAction(itemIds: string[]) {
  if (itemIds.length === 0) {
    return {
      success: false,
      message: 'No items selected for deletion',
    } as const
  }

  try {
    // Delete the images uploaded (Vercel)
    const pathnames = await getImagePathnamesByItemIds(itemIds)

    // Before the rows go, so a failed file deletion is retried by the cleanup job
    await enqueueImageCleanup(pathnames)
    if (pathnames.length) {
      await deleteImageFiles(pathnames).catch((error) => {
        console.error('Failed to delete some image files :', error)
        // Continue even if the blob deletion fails (shouldn't stop the user)
      })
    }

    // Delete items records
    await deleteItems(itemIds)
    revalidatePath('/dashboard')

    return {
      success: true,
      deleted: itemIds.length,
    } as const
  } catch (error) {
    // Let getCurrentUser()'s sign-in redirect through
    unstable_rethrow(error)
    return {
      success: false,
      message: toUserMessage(error, 'An error occurred while deleting items'),
      error: 'Failed to delete items and associated data',
    } as const
  }
}
