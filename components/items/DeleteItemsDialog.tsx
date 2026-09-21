import { deleteItemsAndAssociatedDatas } from '@/actions/items/delete-items'
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
import { useIsMobile } from '@/hooks/use-mobile'
import { useTransition } from 'react'
import { toast } from 'sonner'

type DeleteItemsDialogProps = {
  itemIds: string[]
  successCallback?: () => void
} & DialogBaseProps

export function DeleteItemsDialog({
  open,
  setOpen,
  itemIds,
  successCallback,
}: DeleteItemsDialogProps) {
  const isMobile = useIsMobile()

  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteItemsAndAssociatedDatas(itemIds)

      if (result.success) {
        toast.success(`${result.deleted} item(s) deleted`)
        successCallback?.()
      } else {
        toast.error(result.error || 'Failed to delete items')
      }
      setOpen(false)
    })
  }

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen} noBodyStyles>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Delete {itemIds.length} item(s)?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose disabled={isPending} asChild>
              <Button variant="secondary">Cancel</Button>
            </DrawerClose>
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {itemIds.length} item(s)?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. All images and items in these items
            will also be deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose disabled={isPending} asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
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
