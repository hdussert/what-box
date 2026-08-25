'use client'

import { forgotPassword } from '@/app/actions/forgot-password'
import { SignInState } from '@/app/actions/sign-in'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

const initialState: SignInState = {
  success: false,
  message: '',
  errors: undefined,
  values: {
    email: '',
  },
}

const ForgotPasswordForm = () => {
  // Use useActionState hook for the form submission action
  const [state, formAction, isPending] = useActionState<SignInState, FormData>(
    forgotPassword,
    initialState,
  )

  useEffect(() => {
    if (!state.message) return

    if (state.success) {
      toast.success(state.message)
    } else {
      toast.error(state.message)
    }
  }, [state.success, state.message])

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
          defaultValue={state.values.email}
        />

        <FieldError>{state?.errors?.email && state.errors.email[0]}</FieldError>
      </Field>

      <Button type="submit" className="w-full" disabled={isPending}>
        Reset password
      </Button>
    </form>
  )
}

export default ForgotPasswordForm
