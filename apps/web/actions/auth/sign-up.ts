'use server'

import { ActionResponse } from '@/actions/types'
import { createSession } from '@/lib/session'
import { createUser, getUserByEmail } from '@/lib/user'
import { SignUpData, SignUpSchema } from '@what-box/shared'
import { z } from 'zod'

export type SignUpValues = Pick<SignUpData, 'email'>
export type SignUpState = ActionResponse & {
  values: SignUpValues
}

export async function signUpAction(
  prevState: SignUpState,
  formData: FormData,
): Promise<SignUpState> {
  const raw = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  }

  const values: SignUpValues = { email: raw.email }

  try {
    // Validate with Zod
    const data = SignUpSchema.parse(raw)

    // Check if user already exists
    const existingUser = await getUserByEmail(data.email)
    if (existingUser) {
      throw new Error('Failed to create account')
    }

    // Create new user
    const user = await createUser(data.email, data.password)

    // Create session for the newly registered user
    await createSession(user.id)

    return {
      success: true,
      message: 'Account created successfully',
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
        'An error occurred while creating your account',
      error: 'Failed to create account',
      values,
    }
  }
}
