'use client'

import DeleteItemsButton from '@/components/items/DeleteItemsButton'
import { NewItemButton } from '@/components/items/NewItemButton'
import ListControls from '@/components/list/ListControls'
import SelectionToolbar from '@/components/selection/SelectionToolbar'

type ItemsToolbarProps = {
  boxId: string
}

const ItemsToolbar = ({ boxId }: ItemsToolbarProps) => {
  return (
    <div className="sticky top-0 z-20 shadow-xl bg-background -mx-2 px-2 py-2 space-y-2 border-b">
      <ListControls />
      <SelectionToolbar
        selectionActions={({ selectedIds, clearSelection }) => [
          <DeleteItemsButton
            key="delete"
            itemIds={selectedIds}
            onSuccess={clearSelection}
          />,
        ]}
        actions={<NewItemButton boxId={boxId} />}
      />
    </div>
  )
}

export default ItemsToolbar
