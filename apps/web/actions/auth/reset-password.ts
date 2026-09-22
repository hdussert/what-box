'use server'

import { ActionResponse } from '@/actions/types'
import { createSession, verifyAccessToken } from '@/lib/session'
import { updatePassword } from '@/lib/user'
import { z } from 'zod'

// Define Zod schema for signup validation
const ResetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type ResetPasswordData = z.infer<typeof ResetPasswordSchema>
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

    const { valid, user, error } = await verifyAccessToken(token)
    if (!valid || !user) {
      throw new Error(error)
    }

    await updatePassword(user.id, password)

    // Create session for the newly registered user
    await createSession(user.id)

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
