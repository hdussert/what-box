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
type SigninValues = Pick<SignInData, 'email'>
export type SignInState = ActionResponse & {
  values: SigninValues
}

export async function signIn(
  prevState: SignInState,
  formData: FormData
): Promise<SignInState> {
  const raw: SignInData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const values: SigninValues = { email: raw.email }
  try {
    // Validate with Zod
    const data = SignInSchema.parse(raw)

    // Find user by email
    const user = await getUserByEmail(data.email)
    if (!user) {
      throw new Error('Invalid email or password')
    }

    // Verify password
    const isPasswordValid = await verifyPassword(data.password, user.password)
    if (!isPasswordValid) {
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
