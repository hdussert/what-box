'use server'

import { ActionResponse } from '@/actions/types'
import { IMAGE_MIME_TYPES, MAX_IMAGE_SIZE } from '@/lib/image/const'
import { saveImage } from '@/lib/image/mutations'
import { createItem } from '@/lib/item/mutations'
import { CreateItemSchema as CreateItemBaseSchema } from '@what-box/shared'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

// Same image-attached-in-one-submission vs. create-then-upload split as
// create-box.ts - see the comment there.
const CreateItemSchema = CreateItemBaseSchema.extend({
  image: z.file().max(MAX_IMAGE_SIZE).mime(IMAGE_MIME_TYPES).optional(),
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

    const item = await createItem({
      boxId: data.boxId,
      name: data.name,
      quantity: data.quantity,
    })
    if (!item) {
      throw new Error('Box not found')
    }

    // Upload image
    if (data.image) {
      await saveImage({
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
