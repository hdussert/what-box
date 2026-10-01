import {
  deleteAccountAction,
  DeleteAccountState,
} from '@/actions/auth/delete-account'
import { DialogBaseProps } from '@/components/dialog/DialogProvider'
import {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from '@/components/dialog/ResponsiveDialog'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useActionState } from 'react'

const initialState: DeleteAccountState = { success: false, message: '' }

const TITLE = 'Delete your account?'
const DESCRIPTION =
  'Your boxes, items and photos will be deleted for good. This cannot be undone.'

export function DeleteAccountDialog({ isOpen, setIsOpen }: DialogBaseProps) {
  const [state, formAction, isPending] = useActionState(
    deleteAccountAction,
    initialState,
  )

  const hasFormError = !state.success && state.message && !state.errors

  // On success the action redirects, so the dialog never sees it
  const passwordField = (
    <>
      {hasFormError && <FieldError>{state.message}</FieldError>}
      <Field>
        <FieldLabel htmlFor="deleteAccountPassword">
          Confirm with your password
        </FieldLabel>
        <Input
          id="deleteAccountPassword"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={isPending}
        />
        <FieldError>{state.errors?.password?.[0]}</FieldError>
      </Field>
    </>
  )

  const deleteButton = (
    <Button type="submit" variant="destructive" disabled={isPending}>
      {isPending ? 'Deleting...' : 'Delete account'}
    </Button>
  )

  return (
    <ResponsiveDialog open={isOpen} onOpenChange={setIsOpen}>
      <ResponsiveDialogContent>
        <form action={formAction} className="flex flex-col gap-4">
          <ResponsiveDialogHeader>
            <ResponsiveDialogTitle>{TITLE}</ResponsiveDialogTitle>
            <ResponsiveDialogDescription>
              {DESCRIPTION}
            </ResponsiveDialogDescription>
          </ResponsiveDialogHeader>
          <div className="flex flex-col gap-4">{passwordField}</div>
          <ResponsiveDialogFooter>
            <ResponsiveDialogClose
              disabled={isPending}
              render={<Button variant="secondary" />}
            >
              Cancel
            </ResponsiveDialogClose>
            {deleteButton}
          </ResponsiveDialogFooter>
        </form>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  )
}
