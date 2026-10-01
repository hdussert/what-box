import { deleteItemsAction } from '@/actions/items/delete-items'
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
import { ITEM_WORDS } from '@/lib/item/const'
import { pluralize } from '@/lib/utils'
import { useTransition } from 'react'
import { toast } from 'sonner'

type DeleteItemsDialogProps = {
  itemIds: string[]
  onSuccess?: () => void
} & DialogBaseProps

export function DeleteItemsDialog({
  isOpen,
  setIsOpen,
  itemIds,
  onSuccess,
}: DeleteItemsDialogProps) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteItemsAction(itemIds)

      if (result.success) {
        toast.success(`${pluralize(result.deleted, ITEM_WORDS)} deleted`)
        onSuccess?.()
      } else {
        toast.error(result.error || 'Failed to delete items')
      }
      setIsOpen(false)
    })
  }

  return (
    <ResponsiveDialog open={isOpen} onOpenChange={setIsOpen}>
      <ResponsiveDialogContent>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>
            Delete {pluralize(itemIds.length, ITEM_WORDS)}?
          </ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            This action cannot be undone.
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
