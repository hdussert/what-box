'use client'

import { ActionResponse } from '@/app/actions/response-type'
import { SignInData, signIn } from '@/app/actions/sign-in'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

import { useActionState } from 'react'
import { toast } from 'sonner'

type SignInState = ActionResponse & {
  data: SignInData
}
const initialState: SignInState = {
  success: false,
  message: '',
  errors: undefined,
  data: {
    email: '',
    password: '',
  },
}

const SignInForm = () => {
  const router = useRouter()

  // Use useActionState hook for the form submission action
  const [state, formAction, isPending] = useActionState<SignInState, FormData>(
    async (_: SignInState, formData: FormData) => {
      const data: SignInData = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      }

      try {
        const result = await signIn(data)

        // Handle successful submission
        if (result.success) {
          toast.success('Signed in successfully')
          router.push('/dashboard')
          router.refresh()
        }

        if (!result.success) {
          toast.error(result.message || 'Sign in failed')
        }

        return {
          ...result,
          data,
        }
      } catch (err) {
        return {
          success: false,
          message: (err as Error).message || 'An error occurred',
          errors: undefined,
          data,
        }
      }
    },
    initialState
  )
  return (
    <form action={formAction} className="space-y-6">
      {state?.message && !state.success && (
        <FieldError>{state.message}</FieldError>
      )}

      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="m@example.com"
          autoComplete="email"
          required
          disabled={isPending}
          defaultValue={state.data.email}
        />

        <FieldError>{state?.errors?.email && state.errors.email[0]}</FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Input
          id="password"
          type="password"
          name="password"
          autoComplete="current-password"
          required
          disabled={isPending}
          defaultValue={state.data.password}
        />
        <FieldError>
          {state?.errors?.password && state.errors.password[0]}
        </FieldError>
      </Field>
      <Button type="submit" className="w-full" disabled={isPending}>
        Sign in
      </Button>
    </form>
  )
}

export default SignInForm
