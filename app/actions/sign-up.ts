'use server'

import { ActionResponse } from '@/app/actions/response-type'
import { createSession } from '@/lib/session'
import { createUser, getUserByEmail } from '@/lib/user'
import { z } from 'zod'

// Define Zod schema for signup validation
const SignUpSchema = z
  .object({
    email: z.email('Invalid email format').min(1, 'Email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type SignUpData = z.infer<typeof SignUpSchema>
export type SignupValues = Pick<SignUpData, 'email'>
export type SignUpState = ActionResponse & {
  values: SignupValues
}

export async function signUp(
  prevState: SignUpState,
  formData: FormData
): Promise<SignUpState> {
  const raw = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  }

  const values: SignupValues = { email: raw.email }

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
    if (!user) {
      throw new Error('Failed to create account')
    }

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
