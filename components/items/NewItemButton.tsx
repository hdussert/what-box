'use client'

import ToolbarButton from '@/components/ToolbarButton'
import NewItemForm from '@/components/items/NewItemForm'
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
import { useIsMobile } from '@/hooks/useIsMobile'
import { Plus } from 'lucide-react'
import { useState } from 'react'

type NewItemButtonProps = {
  boxId: string
}

export function NewItemButton({ boxId }: NewItemButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen} noBodyStyles>
        <DrawerTrigger asChild>
          <ToolbarButton>
            <Plus /> Add
          </ToolbarButton>
        </DrawerTrigger>
        <DrawerContent className="px-3 mb-6">
          <DrawerHeader>
            <DrawerTitle>New item</DrawerTitle>
          </DrawerHeader>
          <NewItemForm boxId={boxId} onSuccess={() => setIsOpen(false)} />
        </DrawerContent>
      </Drawer>
    )
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <ToolbarButton>
          <Plus /> Add
        </ToolbarButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New item</DialogTitle>
        </DialogHeader>
        <NewItemForm boxId={boxId} onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
