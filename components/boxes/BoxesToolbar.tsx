'use client'

import { DeleteBoxesDialog } from '@/components/boxes/DeleteBoxesDialog'
import LabelsPrintButton from '@/components/boxes/labels/LabelsPrintButton'
import NewBoxButton from '@/components/boxes/new/NewBoxButton'
import ListControls from '@/components/list/ListControls'
import SelectionToolbar from '@/components/selection/SelectionToolBar'
import { Separator } from '@/components/ui/separator'

const BoxesToolbar = () => {
  return (
    <div className="sticky top-0 z-20 shadow-xl bg-background -mx-2 px-2 pt-2">
      <ListControls />
      <Separator className="mt-2 mb-1" />
      <SelectionToolbar
        selectionActions={({ selectedIds, clearSelection }) => [
          <DeleteBoxesDialog
            key="delete"
            boxesIds={selectedIds}
            successCallback={clearSelection}
          />,
          <LabelsPrintButton key="print" boxIds={selectedIds} />,
        ]}
        actions={<NewBoxButton label="Add" />}
      />
    </div>
  )
}

export default BoxesToolbar
