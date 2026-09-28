'use server'

import { ActionResponse } from '@/actions/types'
import { toUserMessage } from '@/lib/errors'
import { createSession } from '@/lib/session'
import { checkCredentials } from '@/lib/user'
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

    // Doesn't say which of the two is wrong, so emails can't be probed
    const user = await checkCredentials(
      data.email,
      data.password,
      'Invalid email or password',
    )

    // Create session
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
      message: toUserMessage(error, 'Sign in failed'),
      error: 'Failed to sign in',
      values,
    }
  }

  // Outside the try so the catch can't swallow it. Redirecting from the action
  // sends the next page in the same response: no idle form in between.
  // The hidden input is user-controlled, so it's checked again here.
  redirect(safeRedirectPath(formData.get('redirectTo')), 'replace')
}
