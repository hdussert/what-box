'use client'

import DeleteItemsButton from '@/components/items/DeleteItemsButton'
import { NewItemDialog } from '@/components/items/NewItemDialog'
import ListControls from '@/components/list/ListControls'
import SelectionToolbar from '@/components/selection/SelectionToolBar'

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
            successCallback={clearSelection}
          />,
        ]}
        actions={<NewItemDialog boxId={boxId} />}
      />
    </div>
  )
}

export default ItemsToolbar
