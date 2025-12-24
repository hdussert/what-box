'use client'

import NewBoxForm from '@/app/components/box/NewBoxForm'
import { useNewBoxModal } from '@/app/components/providers/NewBoxModalProvider'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'

const NewBoxModal = () => {
  const { isOpen, closeModal } = useNewBoxModal()
  const router = useRouter()

  return (
    <Dialog
      modal
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) closeModal()
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New box</DialogTitle>
          <DialogDescription>
            Create a new box to start organizing your items.
          </DialogDescription>
        </DialogHeader>
        <NewBoxForm
          onSuccess={(boxId) => {
            router.push('/boxes/' + boxId)
            closeModal()
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

export default NewBoxModal
