'use client'

import NewBoxDialog from '@/app/components/box/new/NewBoxDialog'
import ToolbarButton from '@/app/components/common/ToolbarButton'
import { useDialog } from '@/app/components/dialog/DialogContext'
import { PackagePlus } from 'lucide-react'

type NewBoxButtonProps = { label: string }

const NewBoxButton = ({ label }: NewBoxButtonProps) => {
  const { openDialog } = useDialog()
  return (
    <ToolbarButton
      onClick={() => {
        openDialog(NewBoxDialog, {})
      }}
    >
      <PackagePlus />
      {label}
    </ToolbarButton>
  )
}
export default NewBoxButton
