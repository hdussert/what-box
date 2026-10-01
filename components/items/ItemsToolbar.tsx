'use client'

import DeleteItemsButton from '@/components/items/DeleteItemsButton'
import { NewItemButton } from '@/components/items/NewItemButton'
import ListControls from '@/components/list/ListControls'
import ActionLabel from '@/components/selection/ActionLabel'
import { useSelection } from '@/components/selection/SelectionProvider'
import SelectionToolbar from '@/components/selection/SelectionToolbar'
import { BulkAction } from '@/components/selection/types'
import { Trash } from 'lucide-react'

type ItemsToolbarProps = {
  boxId: string
  itemIds: string[]
}

const ItemsToolbar = ({ boxId, itemIds }: ItemsToolbarProps) => {
  const { selectedIds, stopSelecting } = useSelection()

  const bulkActions: BulkAction[] = [
    {
      id: 'delete',
      label: 'Delete',
      icon: Trash,
      button: (
        <DeleteItemsButton itemIds={selectedIds} onSuccess={stopSelecting}>
          <ActionLabel icon={Trash} label="Delete" count={selectedIds.length} />
        </DeleteItemsButton>
      ),
    },
  ]

  return (
    <div className="sticky top-0 z-20 shadow-xl bg-background -mx-2 px-2 py-2 space-y-2 border-b">
      <ListControls />
      <SelectionToolbar
        ids={itemIds}
        bulkActions={bulkActions}
        actions={<NewItemButton boxId={boxId} />}
      />
    </div>
  )
}

export default ItemsToolbar
