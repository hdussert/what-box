'use server'

import { ActionResponse } from '@/app/actions/response-type'
import { getBoxById } from '@/lib/box'
import { uploadFile } from '@/lib/files'
import { createImageRecord } from '@/lib/image'
import { getCurrentUser } from '@/lib/user'
import { z } from 'zod'

const ImagesUploadSchema = z.object({
  boxId: z.string().min(1, 'Missing box id'),
  images: z
    .array(z.instanceof(File))
    .min(1, 'Select at least 1 image')
    .max(5, 'Max 5 images')
    .refine((files) => files.every((f) => f.size > 0), 'Empty file detected')
    .refine(
      (files) =>
        files.every((f) =>
          ['image/jpeg', 'image/png', 'image/webp'].includes(f.type)
        ),
      'Only JPG, PNG, WEBP are allowed'
    ),
})

type UploadFileData = z.infer<typeof ImagesUploadSchema>
export type UploadImageState = ActionResponse

export async function uploadImages(
  prevState: UploadImageState,
  formData: FormData
): Promise<ActionResponse> {
  const raw = {
    images: formData.getAll('images') as File[],
    boxId: formData.get('boxId') as string,
  }

  try {
    // Validate input data
    const data: UploadFileData = ImagesUploadSchema.parse(raw)

    // Verify user is authenticated
    const user = await getCurrentUser()

    // Verify box exists and belongs to user
    const box = await getBoxById(user.id, data.boxId)
    if (!box) throw new Error('Box not found')

    // Upload each image (blob storage) and create Image records (db)
    for (const image of data.images) {
      const blob = await uploadFile(image, box.id)
      await createImageRecord(user.id, box.id, blob.url, blob.pathname)
    }

    return {
      success: true,
      message: 'Images uploaded successfully',
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Validation failed',
        errors: z.flattenError(error).fieldErrors,
      }
    }
    return {
      success: false,
      message: (error as Error).message,
      error: 'Failed to upload the image(s)',
    }
  }
}
