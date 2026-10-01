'use client'

import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from '@/components/dialog/ResponsiveDialog'
import NewItemForm from '@/components/items/NewItemForm'
import ToolbarButton from '@/components/ToolbarButton'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldLabel } from '@/components/ui/field'
import { Plus } from 'lucide-react'
import { useState } from 'react'

type NewItemButtonProps = {
  boxId: string
}

export function NewItemButton({ boxId }: NewItemButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [keepOpen, setKeepOpen] = useState(false)

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

  return (
    <ResponsiveDialog open={isOpen} onOpenChange={setIsOpen}>
      <ResponsiveDialogTrigger render={<ToolbarButton />}>
        <Plus data-icon="inline-start" /> Add
      </ResponsiveDialogTrigger>
      <ResponsiveDialogContent>
        <ResponsiveDialogHeader className="flex-row items-center justify-between">
          <ResponsiveDialogTitle>New item</ResponsiveDialogTitle>
          {keepOpenCheckbox}
        </ResponsiveDialogHeader>
        <NewItemForm boxId={boxId} onSuccess={handleSuccess} />
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  )
}
