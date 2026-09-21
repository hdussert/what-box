import { useDialog } from '@/components/dialog/DialogProvider'
import { DeleteItemsDialog } from '@/components/items/DeleteItemsDialog'
import ToolbarButton from '@/components/ToolbarButton'

type DeleteItemsButtonProps = {
  itemIds: string[]
  successCallback?: () => void
}

const DeleteItemsButton = ({
  itemIds,
  successCallback,
}: DeleteItemsButtonProps) => {
  const { openDialog } = useDialog()
  return (
    <ToolbarButton
      onClick={(event) => {
        event.stopPropagation()
        openDialog(DeleteItemsDialog, { itemIds, successCallback })
      }}
    >
      Delete
    </ToolbarButton>
  )
}

export default DeleteItemsButton
