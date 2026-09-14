'use client'

import ToolbarButton from '@/app/components/common/ToolbarButton'
import NewItemForm from '@/app/components/item/NewItemForm'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useIsMobile } from '@/hooks/use-mobile'
import { Plus } from 'lucide-react'
import { useState } from 'react'

type NewItemDialogProps = {
  boxId: string
}

export function NewItemDialog({ boxId }: NewItemDialogProps) {
  const [open, onOpenChange] = useState(false)

  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange} noBodyStyles>
        <DrawerTrigger asChild>
          <ToolbarButton>
            <Plus /> Add
          </ToolbarButton>
        </DrawerTrigger>
        <DrawerContent className="px-3 mb-6">
          <DrawerHeader>
            <DrawerTitle>New item</DrawerTitle>
          </DrawerHeader>
          <NewItemForm boxId={boxId} onSuccess={() => onOpenChange(false)} />
        </DrawerContent>
      </Drawer>
    )
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <ToolbarButton>
          <Plus /> Add
        </ToolbarButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New item</DialogTitle>
        </DialogHeader>
        <NewItemForm boxId={boxId} onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}
