'use client'

import ListControls from '@/app/components/common/list/ListControls'
import SelectionToolbar from '@/app/components/common/selection/SelectionToolBar'
import { DeleteItemsDialog } from '@/app/components/item/DeleteItemsDialog'
import { NewItemDialog } from '@/app/components/item/NewItemDialog'

type ItemsToolbarProps = {
  boxId: string
}

const ItemsToolbar = ({ boxId }: ItemsToolbarProps) => {
  return (
    <div className="sticky top-0 z-20 shadow-xl bg-background -mx-2 px-2 py-2 space-y-2 border-b">
      <ListControls />
      <SelectionToolbar
        selectionActions={({ selectedIds, clearSelection }) => [
          <DeleteItemsDialog
            key="delete"
            itemsIds={selectedIds}
            successCallback={clearSelection}
          />,
        ]}
        actions={<NewItemDialog boxId={boxId} />}
      />
    </div>
  )
}

export default ItemsToolbar
