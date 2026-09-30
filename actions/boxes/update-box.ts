'use server'

import { ActionResponse } from '@/actions/types'
import { updateBox } from '@/lib/box'
import { toUserMessage } from '@/lib/errors'
import { revalidatePath } from 'next/cache'
import { unstable_rethrow } from 'next/navigation'
import { z } from 'zod'

const UpdateBoxSchema = z.object({
  id: z.string().trim().min(1, 'Box is required'),
  name: z.string().trim().min(1, 'Name is required'),
})

type UpdateBoxValues = z.infer<typeof UpdateBoxSchema>

export type UpdateBoxState = ActionResponse & {
  values: UpdateBoxValues
}

export async function updateBoxAction(
  prevState: UpdateBoxState,
  formData: FormData,
): Promise<UpdateBoxState> {
  const raw = {
    id: formData.get('id') as string,
    name: formData.get('name') as string,
  }
  const values: UpdateBoxValues = raw

  try {
    const data = UpdateBoxSchema.parse(raw)

    const box = await updateBox(data)

    revalidatePath(`/boxes/${box.id}`)
    revalidatePath('/dashboard')

    return {
      success: true,
      message: 'Box updated successfully',
      values: { id: box.id, name: box.name },
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
      message: toUserMessage(error, 'Failed to update the box'),
      error: 'Failed to update box',
      values,
    }
  }
}
