'use server'

import { ActionResponse } from '@/app/actions/response-type'
import { ForgotPasswordEmailTemplate } from '@/app/components/auth/ForgotPasswordEmailTemplate'
import { env } from '@/env'
import { resend } from '@/lib/email/resend'
import { generateJWT } from '@/lib/session'
import { getUserByEmail } from '@/lib/user'
import { z } from 'zod'

const ForgotPasswordSchema = z.object({
  email: z.email('Invalid email format').min(1, 'Email is required'),
})

export type ForgotPasswordData = z.infer<typeof ForgotPasswordSchema>
type ForgotPasswordValues = Pick<ForgotPasswordData, 'email'>

export type ForgotPasswordState = ActionResponse & {
  values: ForgotPasswordValues
}

export async function forgotPassword(
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
    console.log(user)
    if (user) {
      const token = await generateJWT({ userId: user.id })

      // TODO : env variable for domain name
      const domain =
        env.NODE_ENV === 'production'
          ? 'https://whatbox.vercel.app/'
          : 'http://localhost:3001'

      const newPasswordLink = `${domain}/new-password?token=${token}`

      // TODO: handle errors (not sure if it throws properly)
      resend.emails.send({
        from: 'WhatBox <whatbox@hdussert.com>',
        to: [user.email],
        subject: 'Password reset',
        react: ForgotPasswordEmailTemplate({
          firstName: user.email,
          link: newPasswordLink,
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
