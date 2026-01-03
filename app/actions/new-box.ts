'use server'

import { ActionResponse } from '@/app/actions/response-type'
import { createUserBox, getUserBoxByShortId } from '@/lib/box'
import { generateShortId } from '@/lib/id'
import { z } from 'zod'

const NewBoxSchema = z.object({
  name: z.string().min(1, 'Name is required'),
})

type NewBoxData = z.infer<typeof NewBoxSchema>
type NewBoxValues = Pick<NewBoxData, 'name'>
type NewBoxResult = {
  id: string
}

export type NewBoxState = ActionResponse & {
  values: NewBoxValues
  result?: NewBoxResult
}
export async function newBox(
  prevState: NewBoxState,
  formData: FormData
): Promise<NewBoxState> {
  const raw = {
    name: formData.get('name') as string,
  }

  const values: NewBoxValues = { name: raw.name }
  try {
    const data = NewBoxSchema.parse(raw)

    let shortId = ''
    while (true) {
      shortId = generateShortId()
      // Check for uniqueness of shortId for this user
      const existingBox = await getUserBoxByShortId(shortId)
      if (!existingBox) {
        break
      }
    }

    const newBox = await createUserBox(data.name, shortId)
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
