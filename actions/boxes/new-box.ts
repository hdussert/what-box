'use server'

import { ActionResponse } from '@/actions/response-type'
import { createBox, getBoxByShortId } from '@/lib/box'
import { generateShortId } from '@/lib/id'
import { IMAGE_MIME } from '@/lib/image/const'
import { createImage } from '@/lib/image/image'
import { getCurrentUser } from '@/lib/user'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const NewBoxSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  image: z.file().max(4_500_000).mime(IMAGE_MIME).optional(),
})

type NewBoxData = z.infer<typeof NewBoxSchema>
type NewBoxValues = Omit<NewBoxData, 'image'>

type NewBoxResult = {
  id: string
}

export type NewBoxState = ActionResponse & {
  values: NewBoxValues
  result?: NewBoxResult
}
export async function newBox(
  prevState: NewBoxState,
  formData: FormData,
  image?: File,
): Promise<NewBoxState> {
  // Get current authentified user

  const raw = {
    name: formData.get('name') as string,
    image: image,
  }
  const values: NewBoxValues = raw

  try {
    const user = await getCurrentUser()
    const data = NewBoxSchema.parse(raw)

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
      await createImage({
        boxId: box.id,
        image: data.image,
      })
    }

    revalidatePath('/dashboard')
    return {
      success: true,
      message: 'Box created successfully',
      values,
      result: { id: box.id },
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
      error: 'Failed to create box',
      values,
    }
  }
}
