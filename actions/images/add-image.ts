'use server'

import { ActionResponse } from '@/actions/response-type'
import { IMAGE_MIME } from '@/lib/image/const'
import { createImage } from '@/lib/image/image'
import z from 'zod'

const AddImageSchema = z.object({
  image: z.file().max(4_500_000).mime(IMAGE_MIME),
  boxId: z.string().trim().min(1, 'Owner ID is required'),
  itemId: z
    .string()
    .trim()
    .min(1, 'Owner ID is required')
    .optional()
    .nullable(),
})

type AddImageData = z.infer<typeof AddImageSchema>

export async function addImage(data: AddImageData): Promise<ActionResponse> {
  try {
    const { image, boxId, itemId = null } = AddImageSchema.parse(data)
    await createImage({
      boxId,
      itemId,
      image,
    })

    return {
      success: true,
      message: 'Image uploaded successfully',
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || 'Failed to upload the image',
    }
  }
}
