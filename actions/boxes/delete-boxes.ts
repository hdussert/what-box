'use server'

import { deleteBoxes } from '@/lib/box'
import { toUserMessage } from '@/lib/errors'
import { deleteBoxImages } from '@/lib/image/mutations'
import { revalidatePath } from 'next/cache'
import { unstable_rethrow } from 'next/navigation'

export async function deleteBoxesAction(boxIds: string[]) {
  if (boxIds.length === 0) {
    return {
      success: false,
      message: 'No boxes selected for deletion',
    } as const
  }

  try {
    await deleteBoxImages(boxIds)

    await deleteBoxes(boxIds)
    revalidatePath('/dashboard')

    return {
      success: true,
      deleted: boxIds.length,
    } as const
  } catch (error) {
    // Let getCurrentUser()'s sign-in redirect through
    unstable_rethrow(error)
    return {
      success: false,
      message: toUserMessage(error, 'An error occurred while deleting boxes'),
      error: 'Failed to delete boxes and associated data',
    } as const
  }
}
