'use client'

import DeleteItemsButton from '@/components/items/DeleteItemsButton'
import { NewItemButton } from '@/components/items/NewItemButton'
import ListControls from '@/components/list/ListControls'
import SelectionToolbar from '@/components/selection/SelectionToolbar'
import { BulkAction } from '@/components/selection/types'
import { Trash } from 'lucide-react'

type ItemsToolbarProps = {
  boxId: string
  itemIds: string[]
}

const BULK_ACTIONS: BulkAction[] = [
  {
    id: 'delete',
    label: 'Delete',
    icon: Trash,
    renderButton: ({ selectedIds, done, renderLabel }) => (
      <DeleteItemsButton itemIds={selectedIds} onSuccess={done}>
        {renderLabel()}
      </DeleteItemsButton>
    ),
  },
]

const ItemsToolbar = ({ boxId, itemIds }: ItemsToolbarProps) => {
  return (
    <div className="sticky top-0 z-20 shadow-xl bg-background -mx-2 px-2 py-2 space-y-2 border-b">
      <ListControls />
      <SelectionToolbar
        ids={itemIds}
        bulkActions={BULK_ACTIONS}
        actions={<NewItemButton boxId={boxId} />}
      />
    </div>
  )
}

export default ItemsToolbar
