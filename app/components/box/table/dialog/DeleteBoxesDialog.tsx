import { deleteBoxesAndAssociatedDatas } from '@/app/actions/delete-boxes'
import { useBoxTableContext } from '@/app/components/box/table/BoxTableProvider'
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

type DeleteBoxesDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteBoxesDialog({
  open,
  onOpenChange,
}: DeleteBoxesDialogProps) {
  const { selectedIds, clearSelection } = useBoxTableContext()
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteBoxesAndAssociatedDatas(selectedIds)

      if (result.success) {
        toast.success(`${result.deleted} box(es) deleted`)
        clearSelection()
        onOpenChange(false)
      } else {
        toast.error(result.error || 'Failed to delete boxes')
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {selectedIds.length} box(es)?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. All images and items in these boxes
            will also be deleted.
          </DialogDescription>
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
