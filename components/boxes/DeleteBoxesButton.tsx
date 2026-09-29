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
import { pluralize } from '@/lib/utils'
import { Trash } from 'lucide-react'
import { ReactNode, useState, useTransition } from 'react'
import { toast } from 'sonner'

type DeleteBoxesButtonProps = {
  boxIds: string[]
  onSuccess?: () => void
  children?: ReactNode
}

export function DeleteBoxesButton({
  boxIds,
  onSuccess,
  children = <Trash />,
}: DeleteBoxesButtonProps) {
  const trigger = <ToolbarButton disabled={!boxIds.length} />
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useIsMobile()

  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteBoxesAction(boxIds)

      if (result.success) {
        toast.success(
          `${pluralize(result.deleted, { one: 'box', other: 'boxes' })} deleted`,
        )
        onSuccess?.()
      } else {
        toast.error(result.error || 'Failed to delete boxes')
      }
      setIsOpen(false)
    })
  }

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger render={trigger}>{children}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              Delete {pluralize(boxIds.length, { one: 'box', other: 'boxes' })}?
            </DrawerTitle>
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
      <DialogTrigger render={trigger}>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete {pluralize(boxIds.length, { one: 'box', other: 'boxes' })}?
          </DialogTitle>
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
