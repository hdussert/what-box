'use server'

import { ActionResponse } from '@/actions/types'
import { IMAGE_MIME_TYPES, MAX_IMAGE_SIZE } from '@/lib/image/const'
import { saveImage } from '@/lib/image/mutations'
import { prepareImage } from '@/lib/image/prepare'
import { createItem } from '@/lib/item/mutations'
import { revalidatePath } from 'next/cache'
import { unstable_rethrow } from 'next/navigation'
import { z } from 'zod'

const CreateItemSchema = z.object({
  boxId: z.string().trim().min(1, 'Box is required'),
  name: z.string().trim().min(1, 'Name is required'),
  image: z.file().max(MAX_IMAGE_SIZE).mime(IMAGE_MIME_TYPES).optional(),

  quantity: z
    .number()
    .int()
    .min(1, 'Quantity must be 0 or more')
    .max(2147483647, 'Quantity must be 2147483647 or less'),
})

type CreateItemData = z.infer<typeof CreateItemSchema>
type CreateItemValues = Omit<CreateItemData, 'image'>

type CreateItemResult = {
  id: string
}

export type CreateItemState = ActionResponse & {
  values: CreateItemValues
  result?: CreateItemResult
}

export async function createItemAction(
  prevState: CreateItemState,
  formData: FormData,
  image: File | undefined,
): Promise<CreateItemState> {
  const raw = {
    boxId: formData.get('boxId') as string,
    name: formData.get('name') as string,
    image: image,
    quantity: Number(formData.get('quantity')),
  }
  const values: CreateItemValues = raw

  try {
    const data = CreateItemSchema.parse(raw)
    // Before creating the item, so a bad image doesn't leave one behind
    const image = data.image ? await prepareImage(data.image) : null

    // Create item
    const item = await createItem({
      boxId: data.boxId,
      name: data.name,
      quantity: data.quantity,
    })

    // Upload image
    if (image) {
      await saveImage({ boxId: data.boxId, itemId: item.id, image })
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
    // Let getCurrentUser()'s sign-in redirect through
    unstable_rethrow(error)
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
