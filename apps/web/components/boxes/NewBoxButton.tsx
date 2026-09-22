'use client'

import ToolbarButton from '@/components/ToolbarButton'
import NewBoxDialog from '@/components/boxes/NewBoxDialog'
import { useDialog } from '@/components/dialog/DialogProvider'
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
