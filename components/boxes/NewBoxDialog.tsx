'use client'

import NewBoxForm from '@/components/boxes/NewBoxForm'
import { DialogBaseProps } from '@/components/dialog/DialogProvider'
import {
  ResponsiveDialog,
  ResponsiveDialogBody,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from '@/components/dialog/ResponsiveDialog'

type NewBoxDialogProps = DialogBaseProps

const NewBoxDialog = ({ isOpen, setIsOpen }: NewBoxDialogProps) => {
  return (
    <ResponsiveDialog open={isOpen} onOpenChange={setIsOpen}>
      <ResponsiveDialogContent>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>New box</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Create a new box and start taking inventory
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <ResponsiveDialogBody>
          <NewBoxForm />
        </ResponsiveDialogBody>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  )
}

export default NewBoxDialog
