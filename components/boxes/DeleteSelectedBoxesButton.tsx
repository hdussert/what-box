'use client'

import { DeleteBoxesButton } from '@/components/boxes/DeleteBoxesButton'
import ActionLabel from '@/components/selection/ActionLabel'
import { useSelection } from '@/components/selection/SelectionProvider'
import { Trash } from 'lucide-react'

/** Deletes the selected boxes after confirming, then ends selection mode. */
const DeleteSelectedBoxesButton = () => {
  const { selectedIds, stopSelecting } = useSelection()

  return (
    <DeleteBoxesButton boxIds={selectedIds} onSuccess={stopSelecting}>
      <ActionLabel icon={Trash} label="Delete" />
    </DeleteBoxesButton>
  )
}

export default DeleteSelectedBoxesButton
