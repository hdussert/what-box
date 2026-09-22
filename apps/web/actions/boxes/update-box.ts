'use server'

import { ActionResponse } from '@/actions/types'
import { updateBox } from '@/lib/box'
import { UpdateBoxData, UpdateBoxSchema } from '@what-box/shared'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

type UpdateBoxValues = UpdateBoxData

type UpdateBoxResult = {
  id: string
}

export type UpdateBoxState = ActionResponse & {
  values: UpdateBoxValues
  result?: UpdateBoxResult
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
    if (!box) {
      throw new Error('Failed to update the box')
    }

    revalidatePath(`/boxes/${box.id}`)
    revalidatePath('/dashboard')

    return {
      success: true,
      message: 'Box updated successfully',
      values: { id: box.id, name: box.name },
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
      error: 'Failed to update box',
      values,
    }
  }
}
