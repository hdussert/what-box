'use client'

import { SignInState, signInAction } from '@/actions/auth/sign-in'
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

type SignInFormProps = {
  /** Where to go after signing in; must already be a safe, same-site path. */
  redirectTo: string
}

const SignInForm = ({ redirectTo }: SignInFormProps) => {
  // Use useActionState hook for the form submission action
  const [state, formAction, isPending] = useActionState<SignInState, FormData>(
    signInAction,
    initialState,
  )

  useEffect(() => {
    if (state.message) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="redirectTo" value={redirectTo} />
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

      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Input
          id="password"
          type="password"
          name="password"
          autoComplete="current-password"
          required
          disabled={isPending}
        />
        <FieldError>
          {state?.errors?.password && state.errors.password[0]}
        </FieldError>
      </Field>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  )
}

export default SignInForm
