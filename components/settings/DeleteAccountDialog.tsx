import {
  deleteAccountAction,
  DeleteAccountState,
} from '@/actions/auth/delete-account'
import { DialogBaseProps } from '@/components/dialog/DialogProvider'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useActionState } from 'react'

const initialState: DeleteAccountState = { success: false, message: '' }

const TITLE = 'Delete your account?'
const DESCRIPTION =
  'Your boxes, items and photos will be deleted for good. This cannot be undone.'

export function DeleteAccountDialog({ isOpen, setIsOpen }: DialogBaseProps) {
  const isMobile = useIsMobile()
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

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <form action={formAction}>
            <DrawerHeader>
              <DrawerTitle>{TITLE}</DrawerTitle>
              <DrawerDescription>{DESCRIPTION}</DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-col gap-4 px-4">{passwordField}</div>
            <DrawerFooter>
              <DrawerClose
                disabled={isPending}
                render={<Button variant="secondary" />}
              >
                Cancel
              </DrawerClose>
              {deleteButton}
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    )
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <form action={formAction} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>{TITLE}</DialogTitle>
            <DialogDescription>{DESCRIPTION}</DialogDescription>
          </DialogHeader>
          {passwordField}
          <DialogFooter>
            <DialogClose
              disabled={isPending}
              render={<Button variant="secondary" />}
            >
              Cancel
            </DialogClose>
            {deleteButton}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
