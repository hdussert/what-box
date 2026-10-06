'use server'

import { toUserMessage } from '@/lib/errors'
import { deleteItemImages } from '@/lib/image/mutations'
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
    await deleteItemImages(itemIds)

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
