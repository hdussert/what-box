'use server'

import { ActionResponse } from '@/actions/types'
import { IMAGE_MIME_TYPES } from '@/lib/image/const'
import { saveImage } from '@/lib/image/mutations'
import z from 'zod'

const AddImageSchema = z.object({
  image: z.file().max(4_500_000).mime(IMAGE_MIME_TYPES),
  boxId: z.string().trim().min(1, 'Box is required'),
  itemId: z.string().trim().min(1, 'Item is required').optional().nullable(),
})

type AddImageData = z.infer<typeof AddImageSchema>

export async function addImageAction(
  data: AddImageData,
): Promise<ActionResponse> {
  try {
    const { image, boxId, itemId = null } = AddImageSchema.parse(data)
    await saveImage({ boxId, itemId, image })

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
