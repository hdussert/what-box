import { useDialog } from '@/components/dialog/DialogProvider'
import { DeleteItemsDialog } from '@/components/items/DeleteItemsDialog'
import ToolbarButton from '@/components/ToolbarButton'
import { ComponentProps, ReactNode } from 'react'

type DeleteItemsButtonProps = {
  itemIds: string[]
  onSuccess?: () => void
  className?: string
  variant?: ComponentProps<typeof ToolbarButton>['variant']
  children?: ReactNode
}

const DeleteItemsButton = ({
  itemIds,
  onSuccess,
  className,
  variant,
  children = 'Delete',
}: DeleteItemsButtonProps) => {
  const { openDialog } = useDialog()
  return (
    <ToolbarButton
      className={className}
      variant={variant}
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
