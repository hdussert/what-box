'use server'

import { createUserItem, deleteUserItems } from '@/lib/item/mutations'
import { ItemCreate } from '@/lib/item/types'
import { revalidatePath } from 'next/cache'

export async function createItemAction(data: ItemCreate) {
  try {
    const item = await createUserItem(data)
    revalidatePath(`/boxes/${data.boxId}`)
    return { success: true, item }
  } catch (error) {
    console.error('Failed to create item:', error)
    return { success: false, error: 'Failed to create item' }
  }
}

export async function deleteItemsAction(boxId: string, itemIds: string[]) {
  try {
    const deleted = await deleteUserItems(itemIds)
    revalidatePath(`/boxes/${boxId}`)
    return { success: true, deleted }
  } catch (error) {
    console.error('Failed to delete items:', error)
    return { success: false, error: 'Failed to delete items' }
  }
}
