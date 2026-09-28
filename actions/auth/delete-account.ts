'use server'

import { ActionResponse } from '@/actions/types'
import { deleteAllImageFiles } from '@/lib/image/storage'
import { deleteSession } from '@/lib/session'
import { deleteCurrentUser, verifyCurrentPassword } from '@/lib/user'
import { redirect, unstable_rethrow } from 'next/navigation'
import { z } from 'zod'

const DeleteAccountSchema = z.object({
  password: z.string().min(1, 'Enter your password'),
})

export type DeleteAccountData = z.infer<typeof DeleteAccountSchema>
// No values echoed back: it's a password
export type DeleteAccountState = ActionResponse

export async function deleteAccountAction(
  prevState: DeleteAccountState,
  formData: FormData,
): Promise<DeleteAccountState> {
  const raw: DeleteAccountData = {
    password: formData.get('password') as string,
  }

  try {
    const data = DeleteAccountSchema.parse(raw)

    await verifyCurrentPassword(data.password, 'Incorrect password')

    // Photos first, and stop if that fails: once the account is gone, no
    // one could clean up what's left
    await deleteAllImageFiles().catch((error) => {
      console.error('Failed to delete image files:', error)
      throw new Error(
        "Couldn't delete your photos, so your account was kept: please try again.",
      )
    })
    await deleteCurrentUser().catch((error) => {
      console.error('Failed to delete the user:', error)
      throw new Error(
        "Your photos were deleted, but your account couldn't be: please try again.",
      )
    })
    await deleteSession()
  } catch (error) {
    // Let getCurrentUser()'s sign-in redirect through
    unstable_rethrow(error)
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Validation failed',
        errors: z.flattenError(error).fieldErrors,
      }
    }

    return {
      success: false,
      message: (error as Error).message || 'Account deletion failed',
      error: 'Failed to delete your account',
    }
  }

  // Outside the try so the catch can't swallow it
  redirect('/', 'replace')
}
