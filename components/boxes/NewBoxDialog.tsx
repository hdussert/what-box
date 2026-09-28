'use client'

import NewBoxForm from '@/components/boxes/NewBoxForm'
import { DialogBaseProps } from '@/components/dialog/DialogProvider'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { useIsMobile } from '@/hooks/useIsMobile'

type NewBoxDialogProps = DialogBaseProps

const NewBoxDialog = ({ isOpen, setIsOpen }: NewBoxDialogProps) => {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen} noBodyStyles>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>New Box</DrawerTitle>
            <DrawerDescription>
              Create a new box and start taking inventory
            </DrawerDescription>
          </DrawerHeader>
          <NewBoxForm className="px-4 mb-12" />
        </DrawerContent>
      </Drawer>
    )
  }
  return (
    <Dialog modal open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New box</DialogTitle>
          <DialogDescription>
            Create a new box and start taking inventory
          </DialogDescription>
        </DialogHeader>
        <NewBoxForm />
      </DialogContent>
    </Dialog>
  )
}

export default NewBoxDialog
