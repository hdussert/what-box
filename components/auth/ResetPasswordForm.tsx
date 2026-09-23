'use client'

import {
  resetPasswordAction,
  ResetPasswordState,
} from '@/actions/auth/reset-password'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useSearchParams } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

const initialState: ResetPasswordState = {
  success: false,
  message: '',
  errors: undefined,
  values: {
    password: '',
    confirmPassword: '',
  },
}

export default function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  // Use useActionState hook for the form submission action
  const [state, formAction, isPending] = useActionState<
    ResetPasswordState,
    FormData
  >(
    (state, formData) => resetPasswordAction(state, formData, token || ''),
    initialState,
  )

  useEffect(() => {
    if (state.message) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <form action={formAction} className="space-y-6">
      {state?.message && !state.success && (
        <FieldError>{state.message}</FieldError>
      )}

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
        {isPending ? 'Updating…' : 'Confirm'}
      </Button>
    </form>
  )
}
