'use server'

import { ActionResponse } from '@/actions/types'
import { createSession } from '@/lib/session'
import { lockoutMessage, verifyCredentials } from '@/lib/user'
import { safeRedirectPath } from '@/lib/utils'
import { redirect } from 'next/navigation'
import { z } from 'zod'

// Define Zod schema for signin validation
const SignInSchema = z.object({
  email: z.email('Invalid email format').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
})

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

    const result = await verifyCredentials(data.email, data.password)
    if (result.status === 'locked') {
      throw new Error(lockoutMessage(result.lockedUntil))
    }
    if (result.status === 'invalid') {
      throw new Error('Invalid email or password')
    }

    // Create session
    await createSession(result.user.id)
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

  // Outside the try so the catch can't swallow it. Redirecting from the action
  // sends the next page in the same response: no idle form in between.
  // The hidden input is user-controlled, so it's checked again here.
  // 'replace': Back must not return to the sign-in form
  redirect(safeRedirectPath(formData.get('redirectTo')), 'replace')
}
