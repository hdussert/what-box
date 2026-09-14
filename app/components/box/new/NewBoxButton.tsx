'use client'

import { useNewBoxModalContext } from '@/app/components/box/new/NewBoxModalContext'
import ToolbarButton from '@/app/components/common/ToolbarButton'
import { PackagePlus } from 'lucide-react'

type NewBoxButtonProps = { label: string }

const NewBoxButton = ({ label }: NewBoxButtonProps) => {
  const { openNewBoxModal } = useNewBoxModalContext()
  return (
    <ToolbarButton onClick={openNewBoxModal}>
      <PackagePlus />
      {label}
    </ToolbarButton>
  )
}
export default NewBoxButton
