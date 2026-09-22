'use server'

import { ActionResponse } from '@/actions/types'
import { requestPasswordReset } from '@/lib/user'
import { ForgotPasswordData, ForgotPasswordSchema } from '@what-box/shared'
import { z } from 'zod'

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
    const data = ForgotPasswordSchema.parse(raw)
    await requestPasswordReset(data.email)

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
