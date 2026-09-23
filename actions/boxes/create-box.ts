'use server'

import { ActionResponse } from '@/actions/types'
import { createBox, getBoxByShortId } from '@/lib/box'
import { generateShortId } from '@/lib/id'
import { IMAGE_MIME_TYPES, MAX_IMAGE_SIZE } from '@/lib/image/const'
import { saveImage } from '@/lib/image/mutations'
import { getCurrentUser } from '@/lib/user'
import { revalidatePath } from 'next/cache'
import { unstable_rethrow } from 'next/navigation'
import { z } from 'zod'

const CreateBoxSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  image: z.file().max(MAX_IMAGE_SIZE).mime(IMAGE_MIME_TYPES).optional(),
})

type CreateBoxData = z.infer<typeof CreateBoxSchema>
type CreateBoxValues = Omit<CreateBoxData, 'image'>

type CreateBoxResult = {
  id: string
}

export type CreateBoxState = ActionResponse & {
  values: CreateBoxValues
  result?: CreateBoxResult
}
export async function createBoxAction(
  prevState: CreateBoxState,
  formData: FormData,
  image?: File,
): Promise<CreateBoxState> {
  // Get current authenticated user

  const raw = {
    name: formData.get('name') as string,
    image: image,
  }
  const values: CreateBoxValues = raw

  try {
    // Auth check only: throws when signed out
    await getCurrentUser()
    const data = CreateBoxSchema.parse(raw)

    // Check for uniqueness of shortId for this user
    let shortId = generateShortId()
    while (true) {
      const isShortIdAvailable = !(await getBoxByShortId(shortId))
      if (isShortIdAvailable) break

      shortId = generateShortId()
    }

    // Create box
    const box = await createBox(data.name, shortId)

    // Upload files
    if (data.image) {
      await saveImage({ boxId: box.id, image: data.image })
    }

    revalidatePath('/dashboard')
    return {
      success: true,
      message: 'Box created successfully',
      values,
      result: { id: box.id },
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
      message: (error as Error).message,
      error: 'Failed to create box',
      values,
    }
  }
}
