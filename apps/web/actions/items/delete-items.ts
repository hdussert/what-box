'use server'

import { deleteItemsWithImages } from '@/lib/item'
import { revalidatePath } from 'next/cache'

export async function deleteItemsAction(itemIds: string[]) {
  if (itemIds.length === 0) {
    return {
      success: false,
      message: 'No items selected for deletion',
    }
  }

  try {
    const deleted = await deleteItemsWithImages(itemIds)
    revalidatePath('/dashboard')

    return {
      success: true,
      deleted,
    }
  } catch (error) {
    console.error('Error deleting items and associated data:', error)
    return {
      success: false,
      message:
        (error as Error).message ?? 'An error occurred while deleting items',
      error: 'Failed to delete items and associated data',
    }
  }
}
