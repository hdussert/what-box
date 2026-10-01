'use client'

import DeleteItemsButton from '@/components/items/DeleteItemsButton'
import ActionLabel from '@/components/selection/ActionLabel'
import { useSelection } from '@/components/selection/SelectionProvider'
import { Trash } from 'lucide-react'

/** Deletes the selected items after confirming, then ends selection mode. */
const DeleteSelectedItemsButton = () => {
  const { selectedIds, stopSelecting } = useSelection()

  return (
    <DeleteItemsButton itemIds={selectedIds} onSuccess={stopSelecting}>
      <ActionLabel icon={Trash} label="Delete" count={selectedIds.length} />
    </DeleteItemsButton>
  )
}

export default DeleteSelectedItemsButton
