'use client'

import ListControls from '@/app/components/common/list/ListControls'
import SelectionToolbar from '@/app/components/common/selection/SelectionToolBar'
import { DeleteItems } from '@/app/components/item/DeleteItems'

const ItemsToolbar = () => {
  return (
    <div className="sticky top-0 z-20 shadow-xl bg-background -mx-2 px-2 border-b pt-2">
      <ListControls />
      <SelectionToolbar
        actions={({ selectedIds, clearSelection }) => [
          <DeleteItems
            key="delete"
            itemsIds={selectedIds}
            successCallback={clearSelection}
          />,
        ]}
      />
    </div>
  )
}

export default ItemsToolbar
