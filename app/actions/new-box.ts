'use server'

import { ActionResponse } from '@/app/actions/response-type'
import { createUserBox } from '@/lib/box'
import z from 'zod'

const NewBoxSchema = z.object({
  name: z.string().min(1, 'Name is required'),
})

export type NewBoxData = z.infer<typeof NewBoxSchema>

export async function newBox(
  data: NewBoxData
): Promise<ActionResponse & { data?: { id: string } }> {
  const validationResult = NewBoxSchema.safeParse(data)
  if (!validationResult.success) {
    return {
      success: false,
      message: 'Validation failed',
      errors: z.flattenError(validationResult.error).fieldErrors,
    }
  }

  try {
    const newBox = await createUserBox(data.name)
    return {
      success: true,
      message: 'Box created successfully',
      data: newBox,
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
