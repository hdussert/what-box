'use server'

import { ActionResponse } from '@/actions/types'
import { createSession } from '@/lib/session'
import { SignInSchema, verifyCredentials } from '@/lib/user'
import { z } from 'zod'

export type SignInData = z.infer<typeof SignInSchema>
type SignInValues = Pick<SignInData, 'email'>
export type SignInState = ActionResponse & {
  values: SignInValues
}

export async function signInAction(
  prevState: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const raw: SignInData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const values: SignInValues = { email: raw.email }
  try {
    // Validate with Zod
    const data = SignInSchema.parse(raw)

    const user = await verifyCredentials(data.email, data.password)
    if (!user) {
      throw new Error('Invalid email or password')
    }

    // Create session
    await createSession(user.id)

    return {
      success: true,
      message: 'Signed in successfully',
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
      message: (error as Error).message || 'Sign in failed',
      error: 'Failed to sign in',
      values,
    }
  }
}
