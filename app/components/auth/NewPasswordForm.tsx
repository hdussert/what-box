'use client'

import { newPassword, NewPasswordState } from '@/app/actions/new-password'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useRouter, useSearchParams } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

const initialState: NewPasswordState = {
  success: false,
  message: '',
  errors: undefined,
  values: {
    password: '',
    confirmPassword: '',
  },
}

export default function NewPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  // Use useActionState hook for the form submission action
  const [state, formAction, isPending] = useActionState<
    NewPasswordState,
    FormData
  >(
    (state, formData) => newPassword(state, formData, token || ''),
    initialState,
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
        Confirm
      </Button>
    </form>
  )
}
