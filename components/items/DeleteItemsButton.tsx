import { useDialog } from '@/components/dialog/DialogProvider'
import { DeleteItemsDialog } from '@/components/items/DeleteItemsDialog'
import ToolbarButton from '@/components/ToolbarButton'
import { ReactNode } from 'react'

type DeleteItemsButtonProps = {
  itemIds: string[]
  onSuccess?: () => void
  className?: string
  children?: ReactNode
}

const DeleteItemsButton = ({
  itemIds,
  onSuccess,
  className,
  children = 'Delete',
}: DeleteItemsButtonProps) => {
  const { openDialog } = useDialog()
  return (
    <ToolbarButton
      className={className}
      disabled={!itemIds.length}
      onClick={(event) => {
        event.stopPropagation()
        openDialog(DeleteItemsDialog, { itemIds, onSuccess })
      }}
    >
      {children}
    </ToolbarButton>
  )
}

export default DeleteItemsButton
