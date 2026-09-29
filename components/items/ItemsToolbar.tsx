'use client'

import DeleteItemsButton from '@/components/items/DeleteItemsButton'
import { NewItemButton } from '@/components/items/NewItemButton'
import ListControls from '@/components/list/ListControls'
import SelectionToolbar from '@/components/selection/SelectionToolbar'
import { SelectionMode } from '@/components/selection/types'
import { Trash } from 'lucide-react'

const modes: SelectionMode[] = [
  {
    name: 'delete',
    label: 'Delete',
    icon: <Trash />,
    hint: 'Pick items to delete',
    confirm: ({ selectedIds, done }) => (
      <DeleteItemsButton
        itemIds={selectedIds}
        onSuccess={done}
        variant="destructive"
      >
        <Trash /> Delete {selectedIds.length}{' '}
        {selectedIds.length === 1 ? 'item' : 'items'}
      </DeleteItemsButton>
    ),
  },
]

type ItemsToolbarProps = {
  boxId: string
  itemIds: string[]
}

const ItemsToolbar = ({ boxId, itemIds }: ItemsToolbarProps) => {
  return (
    <div className="sticky top-0 z-20 shadow-xl bg-background -mx-2 px-2 py-2 space-y-2 border-b">
      <ListControls />
      <SelectionToolbar
        modes={modes}
        ids={itemIds}
        actions={<NewItemButton boxId={boxId} />}
      />
    </div>
  )
}

export default ItemsToolbar
