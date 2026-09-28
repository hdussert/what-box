'use server'

import { ActionResponse } from '@/actions/types'
import { toUserMessage } from '@/lib/errors'
import { deleteImage } from '@/lib/image/mutations'
import { unstable_rethrow } from 'next/navigation'
import z from 'zod'

const DeleteImageSchema = z.object({
  boxId: z.string().trim().min(1, 'Box is required'),
  itemId: z.string().trim().min(1, 'Item is required').optional().nullable(),
})

type DeleteImageData = z.infer<typeof DeleteImageSchema>

export async function deleteImageAction(
  data: DeleteImageData,
): Promise<ActionResponse> {
  try {
    await deleteImage(DeleteImageSchema.parse(data))

    return {
      success: true,
      message: 'Image deleted successfully',
    }
  } catch (error) {
    // Let getCurrentUser()'s sign-in redirect through
    unstable_rethrow(error)
    return {
      success: false,
      message: toUserMessage(error, 'Failed to delete the image'),
    }
  }
}
