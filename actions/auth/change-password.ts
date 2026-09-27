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

// No values echoed back: they're all passwords
export type ChangePasswordState = ActionResponse

export async function changePasswordAction(
  prevState: ChangePasswordState,
  formData: FormData,
): Promise<ChangePasswordState> {
  const parsed = ChangePasswordSchema.safeParse({
    currentPassword: formData.get('currentPassword'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  })
  if (!parsed.success) {
    return {
      success: false,
      message: 'Validation failed',
      errors: z.flattenError(parsed.error).fieldErrors,
    }
  }

  const { currentPassword, password } = parsed.data
  const result = await changePassword(currentPassword, password)
  if (result.status === 'invalid') {
    return {
      success: false,
      message: 'Validation failed',
      errors: { currentPassword: ['Incorrect password'] },
    }
  }
  if (result.status === 'locked') {
    return { success: false, message: lockoutMessage(result.lockedUntil) }
  }

  // The change revoked every session: keep this browser signed in
  await createSession(result.user.id)
  return { success: true, message: 'Password changed' }
}
