'use server'

import { ActionResponse } from '@/actions/response-type'
import { IMAGE_MIME } from '@/lib/image/const'
import { createImage } from '@/lib/image/image'
import { createItem } from '@/lib/item/mutations'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const NewItemSchema = z.object({
  boxId: z.string().trim().min(1, 'Box is required'),
  name: z.string().trim().min(1, 'Name is required'),
  image: z.file().max(4_500_000).mime(IMAGE_MIME).optional(),

  quantity: z
    .number()
    .int()
    .min(1, 'Quantity must be 0 or more')
    .max(2147483647, 'Quantity must be 2147483647 or less'),
})

type NewItemData = z.infer<typeof NewItemSchema>
type NewItemValues = Omit<NewItemData, 'image'>

type NewItemResult = {
  id: string
}

export type NewItemState = ActionResponse & {
  values: NewItemValues
  result?: NewItemResult
}

export async function newItem(
  prevState: NewItemState,
  formData: FormData,
  image: File | undefined,
): Promise<NewItemState> {
  const raw = {
    boxId: formData.get('boxId') as string,
    name: formData.get('name') as string,
    image: image,
    quantity: Number(formData.get('quantity')),
  }
  const values: NewItemValues = raw

  try {
    const data = NewItemSchema.parse(raw)

    // Create item
    const item = await createItem({
      boxId: data.boxId,
      name: data.name,
      quantity: data.quantity,
    })

    // Upload image
    if (data.image) {
      await createImage({
        boxId: data.boxId,
        itemId: item.id,
        image: data.image,
      })
    }

    revalidatePath(`/boxes/${data.boxId}`)

    return {
      success: true,
      message: 'Item created successfully',
      values: {
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
      message: 'Internal server error', //(error as Error).message,
      error: 'Failed to create item',
      values,
    }
  }
}
