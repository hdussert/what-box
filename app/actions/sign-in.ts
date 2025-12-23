'use server'

import { ActionResponse } from '@/app/actions/response-type'
import { verifyPassword } from '@/lib/password'
import { createSession } from '@/lib/session'
import { getUserByEmail } from '@/lib/user'
import { z } from 'zod'

// Define Zod schema for signin validation
const SignInSchema = z.object({
  email: z.email('Invalid email format').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
})

export type SignInData = z.infer<typeof SignInSchema>

export async function signIn(data: SignInData): Promise<ActionResponse> {
  try {
    // Validate with Zod
    const validationResult = SignInSchema.safeParse(data)
    if (!validationResult.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: z.flattenError(validationResult.error).fieldErrors,
      }
    }

    // Find user by email
    const user = await getUserByEmail(data.email)
    if (!user) {
      return {
        success: false,
        message: 'Invalid email or password',
      }
    }

    // Verify password
    const isPasswordValid = await verifyPassword(data.password, user.password)
    if (!isPasswordValid) {
      return {
        success: false,
        message: 'Invalid email or password',
      }
    }

    // Create session
    await createSession(user.id)

    return {
      success: true,
      message: 'Signed in successfully',
    }
  } catch (error) {
    console.error('Sign in error:', error)
    return {
      success: false,
      message: 'An error occurred while signing in',
      error: 'Failed to sign in',
    }
  }
}
