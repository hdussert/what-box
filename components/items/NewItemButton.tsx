'use client'

import ToolbarButton from '@/components/ToolbarButton'
import NewItemForm from '@/components/items/NewItemForm'
import { Checkbox } from '@/components/ui/checkbox'
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
import { Field, FieldLabel } from '@/components/ui/field'
import { useIsMobile } from '@/hooks/useIsMobile'
import { Plus } from 'lucide-react'
import { useState } from 'react'

type NewItemButtonProps = {
  boxId: string
}

export function NewItemButton({ boxId }: NewItemButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [keepOpen, setKeepOpen] = useState(false)

  const isMobile = useIsMobile()

  const handleSuccess = () => {
    if (!keepOpen) {
      setIsOpen(false)
    }
  }

  const keepOpenCheckbox = (
    <Field orientation="horizontal" className="w-fit gap-2">
      <Checkbox
        id="keep-open"
        checked={keepOpen}
        onCheckedChange={(checked) => setKeepOpen(checked === true)}
      />
      <FieldLabel htmlFor="keep-open" className="text-sm font-normal">
        Keep open
      </FieldLabel>
    </Field>
  )

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger render={<ToolbarButton />}>
          <Plus /> Add
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="flex-row items-center justify-between">
            <DrawerTitle>New item</DrawerTitle>
            {keepOpenCheckbox}
          </DrawerHeader>
          <NewItemForm
            boxId={boxId}
            onSuccess={handleSuccess}
            className="px-4 pb-4"
          />
        </DrawerContent>
      </Drawer>
    )
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<ToolbarButton />}>
        <Plus /> Add
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex-row items-center justify-between pr-6">
          <DialogTitle>New item</DialogTitle>
          {keepOpenCheckbox}
        </DialogHeader>
        <NewItemForm boxId={boxId} onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  )
}
