'use server'

import {
  newPasswordFields,
  withMatchingPasswords,
} from '@/actions/auth/schemas'
import { ActionResponse } from '@/actions/types'
import { createSession } from '@/lib/session'
import { changePassword, lockoutMessage } from '@/lib/user'
import { z } from 'zod'

const ChangePasswordSchema = withMatchingPasswords(
  z.object({
    currentPassword: z.string().min(1, 'Enter your current password'),
    ...newPasswordFields,
  }),
)

export type ChangePasswordData = z.infer<typeof ChangePasswordSchema>
// No values echoed back: they're all passwords
export type ChangePasswordState = ActionResponse

export async function changePasswordAction(
  prevState: ChangePasswordState,
  formData: FormData,
): Promise<ChangePasswordState> {
  const raw: ChangePasswordData = {
    currentPassword: formData.get('currentPassword') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  }

  try {
    const data = ChangePasswordSchema.parse(raw)

    const result = await changePassword(data.currentPassword, data.password)
    if (result.status === 'locked') {
      throw new Error(lockoutMessage(result.lockedUntil))
    }
    if (result.status === 'invalid') {
      throw new Error('Incorrect current password')
    }

    // The change revoked every session: keep this browser signed in
    await createSession(result.user.id)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Validation failed',
        errors: z.flattenError(error).fieldErrors,
      }
    }

    return {
      success: false,
      message: (error as Error).message || 'Password change failed',
      error: 'Failed to change your password',
    }
  }

  return { success: true, message: 'Password changed' }
}
