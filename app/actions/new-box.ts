'use server'

import { ActionResponse } from '@/app/actions/response-type'
import { createBox } from '@/lib/box'
import { getCurrentUser } from '@/lib/user'
import z from 'zod'

const NewBoxSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  items: z.array(z.string()).optional(),
})

export type NewBoxData = z.infer<typeof NewBoxSchema>

export async function newBox(formData: FormData): Promise<ActionResponse> {
  try {
    const data = {
      name: formData.get('name') as string,
      items: formData.getAll('items').map((item) => item as string),
    }

    console.log('Items:', data.items)
    const validationResult = NewBoxSchema.safeParse(data)
    if (!validationResult.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: z.flattenError(validationResult.error).fieldErrors,
      }
    }

    const user = await getCurrentUser()
    await createBox(user.id, data.name, data.items)

    return {
      success: true,
      message: 'Box created successfully',
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
