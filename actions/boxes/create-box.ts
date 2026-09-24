'use server'

import { ActionResponse } from '@/actions/types'
import { createBox, deleteBoxes, getBoxByShortId } from '@/lib/box'
import { generateShortId } from '@/lib/id'
import { IMAGE_MIME_TYPES, MAX_IMAGE_SIZE } from '@/lib/image/const'
import { saveImage } from '@/lib/image/mutations'
import { prepareImage } from '@/lib/image/prepare'
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
    // Before creating the box, so a bad image doesn't leave one behind
    const image = data.image ? await prepareImage(data.image) : null

    // Check for uniqueness of shortId for this user
    let shortId = generateShortId()
    while (true) {
      const isShortIdAvailable = !(await getBoxByShortId(shortId))
      if (isShortIdAvailable) break

      shortId = generateShortId()
    }

    // Create box
    const box = await createBox(data.name, shortId)

    if (image) {
      try {
        await saveImage({ boxId: box.id, image })
      } catch (error) {
        // Don't keep a box without the photo the user asked for: a retry
        // would create a duplicate
        await deleteBoxes([box.id]).catch((cleanupError) =>
          console.error('Failed to delete the box', {
            id: box.id,
            cleanupError,
          }),
        )
        throw error
      }
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
