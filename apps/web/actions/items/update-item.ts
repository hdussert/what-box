'use server'

import { ActionResponse } from '@/actions/types'
import { updateItem } from '@/lib/item'
import { UpdateItemSchema as UpdateItemBaseSchema } from '@what-box/shared'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

// boxId isn't part of updateItem()'s own contract (lib/item/types.ts) - the
// web action only needs it locally, for revalidatePath and its own form
// values, so it stays out of the shared base schema.
const UpdateItemSchema = UpdateItemBaseSchema.extend({
  boxId: z.string().trim().min(1, 'BoxId is required'),
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

    const item = await updateItem({
      id: data.id,
      name: data.name,
      quantity: data.quantity,
    })
    if (!item) {
      throw new Error('Failed to update the item')
    }

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
