'use server'

import { NewPasswordSchema } from '@/actions/auth/schemas'
import { ActionResponse } from '@/actions/types'
import { UserError, toUserMessage } from '@/lib/errors'
import { createSession } from '@/lib/session'
import { createUser, getUserByEmail } from '@/lib/user'
import { redirect } from 'next/navigation'
import { z } from 'zod'

// Define Zod schema for signup validation
const SignUpSchema = z
  .object({
    email: z.email('Invalid email format').min(1, 'Email is required'),
  })
  .and(NewPasswordSchema)

export type SignUpData = z.infer<typeof SignUpSchema>
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
      throw new UserError('Failed to create account')
    }

    // Create new user
    const user = await createUser(data.email, data.password)

    // Create session for the newly registered user
    await createSession(user.id)
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
      message: toUserMessage(
        error,
        'An error occurred while creating your account',
      ),
      error: 'Failed to create account',
      values,
    }
  }

  // Outside the try so the catch can't swallow it
  redirect('/dashboard', 'replace')
}
