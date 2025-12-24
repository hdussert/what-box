'use server'

import { ActionResponse } from '@/app/actions/response-type'
import { createBox } from '@/lib/box'
import { getCurrentUser } from '@/lib/user'
import z from 'zod'

const NewBoxSchema = z.object({
  name: z.string().min(1, 'Name is required'),
})

export type NewBoxData = z.infer<typeof NewBoxSchema>

export async function newBox(
  data: NewBoxData
): Promise<ActionResponse & { data?: { id: string } }> {
  try {
    const validationResult = NewBoxSchema.safeParse(data)
    if (!validationResult.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: z.flattenError(validationResult.error).fieldErrors,
      }
    }

    const user = await getCurrentUser()
    const newBox = await createBox(user.id, data.name)

    return {
      success: true,
      message: 'Box created successfully',
      data: {
        id: newBox!.id,
      },
    }
  } catch (error) {
    console.error('Error creating box:', error)
    return {
      success: false,
      message: 'An error occurred while creating the box',
      error: (error as Error).message,
    }
  }
}
