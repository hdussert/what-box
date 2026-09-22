import { useDialog } from '@/components/dialog/DialogProvider'
import { DeleteItemsDialog } from '@/components/items/DeleteItemsDialog'
import ToolbarButton from '@/components/ToolbarButton'

type DeleteItemsButtonProps = {
  itemIds: string[]
  onSuccess?: () => void
}

const DeleteItemsButton = ({ itemIds, onSuccess }: DeleteItemsButtonProps) => {
  const { openDialog } = useDialog()
  return (
    <ToolbarButton
      onClick={(event) => {
        event.stopPropagation()
        openDialog(DeleteItemsDialog, { itemIds, onSuccess })
      }}
    >
      Delete
    </ToolbarButton>
  )
}

export default DeleteItemsButton
