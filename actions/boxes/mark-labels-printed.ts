'use server'

import { markLabelsPrinted } from '@/lib/box'
import { toUserMessage } from '@/lib/errors'
import { revalidatePath } from 'next/cache'
import { unstable_rethrow } from 'next/navigation'
import z from 'zod'

const BoxIdsSchema = z.array(z.string().min(1)).min(1)

export async function markLabelsPrintedAction(boxIds: string[]) {
  try {
    const ids = BoxIdsSchema.parse(boxIds)
    const marked = await markLabelsPrinted(ids)
    revalidatePath('/dashboard')

    return { success: true, marked } as const
  } catch (error) {
    // Let getCurrentUser()'s sign-in redirect through
    unstable_rethrow(error)
    return {
      success: false,
      message: toUserMessage(error, 'Failed to mark the labels as printed'),
    } as const
  }
}
