import { deleteBoxesAndAssociatedDatas } from '@/app/actions/delete-boxes'
import ToolbarButton from '@/app/components/common/list/ToolbarButton'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useIsMobile } from '@/hooks/use-mobile'
import { Trash } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

type DeleteBoxesDialogProps = {
  boxesIds: string[]
  successCallback?: () => void
}

export function DeleteBoxes({
  boxesIds,
  successCallback,
}: DeleteBoxesDialogProps) {
  const [open, onOpenChange] = useState(false)
  const isMobile = useIsMobile()

  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteBoxesAndAssociatedDatas(boxesIds)

      if (result.success) {
        toast.success(`${result.deleted} box(es) deleted`)
        successCallback?.()
      } else {
        toast.error(result.error || 'Failed to delete boxes')
      }
      onOpenChange(false)
    })
  }

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger asChild>
          <ToolbarButton>
            <Trash />
          </ToolbarButton>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Delete {boxesIds.length} box(es)?</DrawerTitle>
            <DrawerDescription>
              This action cannot be undone. All images and items in these boxes
              will also be deleted.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose disabled={isPending}>Cancel</DrawerClose>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <ToolbarButton>
          <Trash />
        </ToolbarButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {boxesIds.length} box(es)?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. All images and items in these boxes
            will also be deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose disabled={isPending}>Cancel</DialogClose>
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
