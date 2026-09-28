'use client'

import {
  changePasswordAction,
  ChangePasswordState,
} from '@/actions/auth/change-password'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

const initialState: ChangePasswordState = { success: false, message: '' }

/** Change the signed-in user's password; the form clears after each try. */
const ChangePasswordForm = () => {
  const [state, formAction, isPending] = useActionState(
    changePasswordAction,
    initialState,
  )

  useEffect(() => {
    if (state.success) {
      toast.success(state.message)
    }
  }, [state])

  const hasFormError = !state.success && state.message && !state.errors

  return (
    <form action={formAction} className="space-y-6">
      {hasFormError && <FieldError>{state.message}</FieldError>}

      <Field>
        <FieldLabel htmlFor="currentPassword">Current password</FieldLabel>
        <Input
          id="currentPassword"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          required
          disabled={isPending}
        />
        <FieldError>{state.errors?.currentPassword?.[0]}</FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor="password">New password</FieldLabel>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          disabled={isPending}
        />
        <FieldError>{state.errors?.password?.[0]}</FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor="confirmPassword">Confirm new password</FieldLabel>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          disabled={isPending}
        />
        <FieldError>{state.errors?.confirmPassword?.[0]}</FieldError>
      </Field>

      <Button type="submit" variant="foreground" disabled={isPending}>
        {isPending ? 'Changing…' : 'Change password'}
      </Button>
    </form>
  )
}

export default ChangePasswordForm
