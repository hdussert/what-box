'use client'

import { signUp, SignUpState } from '@/app/actions/sign-up'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

const initialState: SignUpState = {
  success: false,
  message: '',
  errors: undefined,
  values: {
    email: '',
  },
}

export default function SignUpForm() {
  const router = useRouter()

  // Use useActionState hook for the form submission action
  const [state, formAction, isPending] = useActionState<SignUpState, FormData>(
    signUp,
    initialState
  )

  useEffect(() => {
    if (!state.message) return

    if (state.success) {
      toast.success(state.message)
      router.push('/dashboard')
      router.refresh()
    } else {
      toast.error(state.message)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          name="email"
          type="email"
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
          name="password"
          type="password"
          autoComplete="new-password"
          required
          disabled={isPending}
        />
        <FieldError>
          {state?.errors?.password && state.errors.password[0]}
        </FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          disabled={isPending}
        />
        <FieldError>
          {state?.errors?.confirmPassword && state.errors.confirmPassword[0]}
        </FieldError>
      </Field>

      <Button type="submit" className="w-full mt-2" disabled={isPending}>
        Sign up
      </Button>
    </form>
  )
}
