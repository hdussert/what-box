'use server'

import { ActionResponse } from '@/actions/types'
import { createSession } from '@/lib/session'
import { resetPassword } from '@/lib/user'
import { ResetPasswordData, ResetPasswordSchema } from '@what-box/shared'
import { z } from 'zod'

export type ResetPasswordValues = ResetPasswordData
export type ResetPasswordState = ActionResponse & {
  values: ResetPasswordValues
}

export async function resetPasswordAction(
  prevState: ResetPasswordState,
  formData: FormData,
  token: string,
): Promise<ResetPasswordState> {
  const raw = {
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  }

  const values: ResetPasswordValues = {
    password: raw.password,
    confirmPassword: raw.confirmPassword,
  }

  try {
    const { password } = ResetPasswordSchema.parse(raw)

    const result = await resetPassword(token, password)
    if (result.status === 'invalid') {
      throw new Error(result.error)
    }

    // Create session for the newly registered user
    await createSession(result.user.id)

    return {
      success: true,
      message: 'Password updated',
      values,
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
      message:
        (error as Error).message ||
        'An error occurred while changing your password',
      error: 'Failed to change your password',
      values,
    }
  }
}
