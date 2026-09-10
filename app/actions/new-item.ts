'use server'

import { ActionResponse } from '@/app/actions/response-type'
import { IMAGE_MIME } from '@/lib/image/const'
import { createImageRecord } from '@/lib/image/image'
import { createItem } from '@/lib/item/mutations'
import { getCurrentUser } from '@/lib/user'
import { put } from '@vercel/blob'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const NewItemSchema = z.object({
  boxId: z.string().min(1, 'Box is required'),
  name: z.string().min(1, 'Name is required'),
  image: z.file().max(4_500_000).mime(IMAGE_MIME).optional(),
  description: z.string().optional(),
  quantity: z.number().int().min(0),
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
    description: formData.get('description') as string,
    quantity: Number(formData.get('quantity')),
  }
  const values: NewItemValues = raw

  try {
    const data = NewItemSchema.parse(raw)

    const user = await getCurrentUser()

    // Create item
    const item = await createItem({
      boxId: data.boxId,
      name: data.name,
      description: data.description,
      quantity: data.quantity,
    })

    // Upload image
    if (data.image) {
      const blob = await put(data.image.name, data.image, {
        access: 'public',
        addRandomSuffix: true,
      })

      await createImageRecord(null, item.id, blob.url, blob.pathname)
    }

    revalidatePath(`/boxes/${data.boxId}`)

    return {
      success: true,
      message: 'Item created successfully',
      values: {
        boxId: data.boxId,
        name: '',
        description: '',
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
