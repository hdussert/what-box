'use client'

import DeleteItemsButton from '@/components/items/DeleteItemsButton'
import { NewItemButton } from '@/components/items/NewItemButton'
import ListControls from '@/components/list/ListControls'
import ActionLabel from '@/components/selection/ActionLabel'
import { useSelection } from '@/components/selection/SelectionProvider'
import SelectionToolbar from '@/components/selection/SelectionToolbar'
import ToolbarButton from '@/components/ToolbarButton'
import { Trash } from 'lucide-react'

type ItemsToolbarProps = {
  boxId: string
  itemIds: string[]
}

const ItemsToolbar = ({ boxId, itemIds }: ItemsToolbarProps) => {
  const { startSelecting } = useSelection()

  return (
    <div className="sticky top-0 z-20 shadow-xl bg-background -mx-2 px-2 py-2 space-y-2 border-b">
      <ListControls />
      <SelectionToolbar
        ids={itemIds}
        startActions={
          <ToolbarButton onClick={startSelecting}>
            <ActionLabel icon={Trash} label="Delete" />
          </ToolbarButton>
        }
        selectionActions={({ selectedIds, done }) => (
          <DeleteItemsButton itemIds={selectedIds} onSuccess={done}>
            <ActionLabel
              icon={Trash}
              label="Delete"
              count={selectedIds.length}
            />
          </DeleteItemsButton>
        )}
        actions={<NewItemButton boxId={boxId} />}
      />
    </div>
  )
}

export default ItemsToolbar
