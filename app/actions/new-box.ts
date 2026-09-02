'use server'

import { ActionResponse } from '@/app/actions/response-type'
import { createBox, getBoxByShortId } from '@/lib/box'
import { generateShortId } from '@/lib/id'
import { getCurrentUser } from '@/lib/user'
import { z } from 'zod'

const NewBoxSchema = z.object({
  name: z.string().min(1, 'Name is required'),
})

type NewBoxData = z.infer<typeof NewBoxSchema>
type NewBoxValues = NewBoxData

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
): Promise<NewBoxState> {
  // Get current authentified user
  const { id: userId } = await getCurrentUser()

  const raw = {
    name: formData.get('name') as string,
  }

  const values: NewBoxValues = raw
  try {
    const data = NewBoxSchema.parse(raw)

    let shortId = generateShortId()
    while (true) {
      // Check for uniqueness of shortId for this user
      const isShortIdAvailable = !(await getBoxByShortId(shortId))
      if (isShortIdAvailable) break

      shortId = generateShortId()
    }

    const newBox = await createBox(userId, data.name, shortId)
    return {
      success: true,
      message: 'Box created successfully',
      values,
      result: { id: newBox.id },
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
