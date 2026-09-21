'use server'

import { ActionResponse } from '@/actions/types'
import { updateItem } from '@/lib/item'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const UpdateItemSchema = z.object({
  id: z.string().trim().min(1, 'Item is required'),
  boxId: z.string().trim().min(1, 'BoxId is required'),
  name: z.string().trim().min(1, 'Name is required'),
  quantity: z.number().int().min(1, 'Quantity must be 0 or more'),
})

type UpdateItemData = z.infer<typeof UpdateItemSchema>
type UpdateItemValues = Omit<UpdateItemData, 'image'>

type UpdateItemResult = {
  id: string
}

export type UpdateItemState = ActionResponse & {
  values: UpdateItemValues
  result?: UpdateItemResult
}

export async function updateItemAction(
  prevState: UpdateItemState,
  formData: FormData,
): Promise<UpdateItemState> {
  const raw = {
    id: formData.get('id') as string,
    boxId: formData.get('boxId') as string,
    name: formData.get('name') as string,
    quantity: Number(formData.get('quantity')),
  }
  const values: UpdateItemValues = raw

  try {
    const data = UpdateItemSchema.parse(raw)

    // Create item
    const item = await updateItem({
      id: data.id,
      name: data.name,
      quantity: data.quantity,
    })

    revalidatePath(`/boxes/${data.boxId}`)

    return {
      success: true,
      message: 'Item updated successfully',
      values: {
        id: data.id,
        boxId: data.boxId,
        name: '',
        quantity: 1,
      },
      result: {
        id: item.id,
      },
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Validation failed',
        errors: z.flattenError(error).fieldErrors,
        values,
      }
    }

    return {
      success: false,
      message: (error as Error).message,
      error: 'Failed to create item',
      values,
    }
  }
}
