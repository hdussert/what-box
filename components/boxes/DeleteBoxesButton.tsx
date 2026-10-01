import { DeleteBoxesDialog } from '@/components/boxes/DeleteBoxesDialog'
import { useDialog } from '@/components/dialog/DialogProvider'
import ToolbarButton from '@/components/ToolbarButton'
import { Trash } from 'lucide-react'
import { ReactNode } from 'react'

type DeleteBoxesButtonProps = {
  boxIds: string[]
  onSuccess?: () => void
  children?: ReactNode
}

const DeleteBoxesButton = ({
  boxIds,
  onSuccess,
  children = <Trash />,
}: DeleteBoxesButtonProps) => {
  const { openDialog } = useDialog()
  return (
    <ToolbarButton
      disabled={!boxIds.length}
      onClick={() => openDialog(DeleteBoxesDialog, { boxIds, onSuccess })}
    >
      {children}
    </ToolbarButton>
  )
}

export default DeleteBoxesButton
