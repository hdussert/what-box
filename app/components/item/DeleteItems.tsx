import { deleteItemsAndAssociatedDatas } from '@/app/actions/delete-items'
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

type DeleteItemsProps = {
  itemsIds: string[]
  successCallback?: () => void
}

export function DeleteItems({ itemsIds, successCallback }: DeleteItemsProps) {
  const [open, onOpenChange] = useState(false)
  const isMobile = useIsMobile()

  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteItemsAndAssociatedDatas(itemsIds)

      if (result.success) {
        toast.success(`${result.deleted} item(s) deleted`)
        successCallback?.()
      } else {
        toast.error(result.error || 'Failed to delete items')
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
            <DrawerTitle>Delete {itemsIds.length} item(s)?</DrawerTitle>
            <DrawerDescription>
              This action cannot be undone. All images and items in these items
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
          <DialogTitle>Delete {itemsIds.length} item(s)?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. All images and items in these items
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
