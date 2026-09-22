'use server'

import { ActionResponse } from '@/actions/types'
import { ForgotPasswordEmailTemplate } from '@/components/auth/ForgotPasswordEmailTemplate'
import { env } from '@/env'
import { resend } from '@/lib/email/resend'
import { generateResetToken } from '@/lib/session'
import {
  canRequestPasswordReset,
  getUserByEmail,
  recordPasswordResetRequest,
} from '@/lib/user'
import { z } from 'zod'

const ForgotPasswordSchema = z.object({
  email: z.email('Invalid email format').min(1, 'Email is required'),
})

export type ForgotPasswordData = z.infer<typeof ForgotPasswordSchema>
type ForgotPasswordValues = Pick<ForgotPasswordData, 'email'>

export type ForgotPasswordState = ActionResponse & {
  values: ForgotPasswordValues
}

export async function forgotPasswordAction(
  prevState: ForgotPasswordState,
  formData: FormData,
): Promise<ForgotPasswordState> {
  const raw: ForgotPasswordData = {
    email: formData.get('email') as string,
  }

  const values: ForgotPasswordValues = { email: raw.email }
  try {
    // Validate with Zod
    const data = ForgotPasswordSchema.parse(raw)

    // Find user by email
    const user = await getUserByEmail(data.email)

    // Same generic response whether the account doesn't exist or the
    // cooldown is active - neither is revealed to the caller.
    if (user && canRequestPasswordReset(user)) {
      await recordPasswordResetRequest(user.id)

      const token = await generateResetToken(user.id)

      const resetPasswordLink = `${env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`

      // TODO: handle errors (not sure if it throws properly)
      resend.emails.send({
        from: 'WhatBox <whatbox@hdussert.com>',
        to: [user.email],
        subject: 'Password reset',
        react: ForgotPasswordEmailTemplate({
          email: user.email,
          link: resetPasswordLink,
        }),
      })
    }

    return {
      success: true,
      message:
        "If the account exists we've sent a link to setup a new password",
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
      message: (error as Error).message || 'Internal Server Error',
      error: 'Internal Server Error',
      values,
    }
  }
}
