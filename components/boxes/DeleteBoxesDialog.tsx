import { deleteBoxesAction } from '@/actions/boxes/delete-boxes'
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
import { BOX_WORDS } from '@/lib/box/const'
import { pluralize } from '@/lib/utils'
import { useTransition } from 'react'
import { toast } from 'sonner'

type DeleteBoxesDialogProps = {
  boxIds: string[]
  onSuccess?: () => void
} & DialogBaseProps

export function DeleteBoxesDialog({
  isOpen,
  setIsOpen,
  boxIds,
  onSuccess,
}: DeleteBoxesDialogProps) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteBoxesAction(boxIds)

      if (result.success) {
        toast.success(`${pluralize(result.deleted, BOX_WORDS)} deleted`)
        onSuccess?.()
      } else {
        toast.error(result.error || 'Failed to delete boxes')
      }
      setIsOpen(false)
    })
  }

  return (
    <ResponsiveDialog open={isOpen} onOpenChange={setIsOpen}>
      <ResponsiveDialogContent>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>
            Delete {pluralize(boxIds.length, BOX_WORDS)}?
          </ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            This action cannot be undone. All images and items in these boxes
            will also be deleted.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <ResponsiveDialogFooter>
          <ResponsiveDialogClose
            disabled={isPending}
            render={<Button variant="secondary" />}
          >
            Cancel
          </ResponsiveDialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  )
}
