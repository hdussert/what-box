'use client'

import { deleteBoxesAction } from '@/actions/boxes/delete-boxes'
import ToolbarButton from '@/components/ToolbarButton'
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
import { useIsMobile } from '@/hooks/useIsMobile'
import { Trash } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

type DeleteBoxesButtonProps = {
  boxIds: string[]
  onSuccess?: () => void
}

export function DeleteBoxesButton({
  boxIds,
  onSuccess,
}: DeleteBoxesButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useIsMobile()

  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteBoxesAction(boxIds)

      if (result.success) {
        toast.success(`${result.deleted} box(es) deleted`)
        onSuccess?.()
      } else {
        toast.error(result.error || 'Failed to delete boxes')
      }
      setIsOpen(false)
    })
  }

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen} noBodyStyles>
        <DrawerTrigger asChild>
          <ToolbarButton>
            <Trash />
          </ToolbarButton>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Delete {boxIds.length} box(es)?</DrawerTitle>
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <ToolbarButton>
          <Trash />
        </ToolbarButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {boxIds.length} box(es)?</DialogTitle>
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
