import { deleteItemsAction } from '@/app/actions/item-actions'
import { useItemTableContext } from '@/app/components/box/item/ItemTableProvider'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useTransition } from 'react'
import { toast } from 'sonner'

type DeleteItemsDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteItemsDialog({
  open,
  onOpenChange,
}: DeleteItemsDialogProps) {
  const { selectedIds, clearSelection, boxId } = useItemTableContext()
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteItemsAction(boxId, selectedIds)

      if (result.success) {
        toast.success(`${result.deleted} item(s) deleted`)
        clearSelection()
        onOpenChange(false)
      } else {
        toast.error(result.error || 'Failed to delete items')
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {selectedIds.length} item(s)?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
