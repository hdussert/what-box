'use client'

import DeleteSelectedItemsButton from '@/components/items/DeleteSelectedItemsButton'
import { NewItemButton } from '@/components/items/NewItemButton'
import ListControls from '@/components/list/ListControls'
import SelectionToolbar from '@/components/selection/SelectionToolbar'

type ItemsToolbarProps = {
  boxId: string
  itemIds: string[]
}

const ItemsToolbar = ({ boxId, itemIds }: ItemsToolbarProps) => {
  return (
    <div className="sticky top-0 z-20 shadow-xl bg-background -mx-2 px-2 py-2 space-y-2 border-b">
      <ListControls />
      <SelectionToolbar ids={itemIds} actions={<NewItemButton boxId={boxId} />}>
        <DeleteSelectedItemsButton />
      </SelectionToolbar>
    </div>
  )
}

export default ItemsToolbar
