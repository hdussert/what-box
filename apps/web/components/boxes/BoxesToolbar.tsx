'use client'

import { DeleteBoxesButton } from '@/components/boxes/DeleteBoxesButton'
import PrintLabelsButton from '@/components/boxes/labels/PrintLabelsButton'
import NewBoxButton from '@/components/boxes/NewBoxButton'
import ListControls from '@/components/list/ListControls'
import SelectionToolbar from '@/components/selection/SelectionToolbar'
import { Separator } from '@/components/ui/separator'

const BoxesToolbar = () => {
  return (
    <div className="sticky top-0 z-20 shadow-xl bg-background -mx-2 px-2 pt-2">
      <ListControls />
      <Separator className="mt-2 mb-1" />
      <SelectionToolbar
        selectionActions={({ selectedIds, clearSelection }) => [
          <DeleteBoxesButton
            key="delete"
            boxIds={selectedIds}
            onSuccess={clearSelection}
          />,
          <PrintLabelsButton key="print" boxIds={selectedIds} />,
        ]}
        actions={<NewBoxButton label="Add" />}
      />
    </div>
  )
}

export default BoxesToolbar
