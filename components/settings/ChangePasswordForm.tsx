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

const FIELDS = [
  {
    name: 'currentPassword',
    label: 'Current password',
    autoComplete: 'current-password',
  },
  { name: 'password', label: 'New password', autoComplete: 'new-password' },
  {
    name: 'confirmPassword',
    label: 'Confirm new password',
    autoComplete: 'new-password',
  },
]

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

      {FIELDS.map(({ name, label, autoComplete }) => (
        <Field key={name}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <Input
            id={name}
            name={name}
            type="password"
            autoComplete={autoComplete}
            required
            disabled={isPending}
          />
          <FieldError>{state.errors?.[name]?.[0]}</FieldError>
        </Field>
      ))}

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Changing…' : 'Change password'}
      </Button>
    </form>
  )
}

export default ChangePasswordForm
