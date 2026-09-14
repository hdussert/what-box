'use client'

import NewBoxForm from '@/app/components/box/new/NewBoxForm'
import { useNewBoxModalContext } from '@/app/components/box/new/NewBoxModalContext'
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
import { useIsMobile } from '@/hooks/use-mobile'
import { useRouter } from 'next/navigation'

const NewBoxModal = () => {
  const { open, onOpenChange, closeNewBoxModal } = useNewBoxModalContext()
  const router = useRouter()
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange} noBodyStyles>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>New Box</DrawerTitle>
            <DrawerDescription>
              Create a new box and start taking inventory
            </DrawerDescription>
          </DrawerHeader>
          <NewBoxForm
            onSuccess={(boxId) => {
              router.push('/boxes/' + boxId)
              closeNewBoxModal()
            }}
            className="px-4 mb-12"
          />
        </DrawerContent>
      </Drawer>
    )
  }
  return (
    <Dialog modal open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New box</DialogTitle>
          <DialogDescription>
            Create a new box and start taking inventory
          </DialogDescription>
        </DialogHeader>
        <NewBoxForm
          onSuccess={(boxId) => {
            router.push('/boxes/' + boxId)
            closeNewBoxModal()
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

export default NewBoxModal
