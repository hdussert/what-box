'use client'

import { DeleteBoxesDialog } from '@/app/components/box/DeleteBoxesDialog'
import PrintLabels from '@/app/components/box/labels/PrintLabels'
import NewBoxButton from '@/app/components/box/new/NewBoxButton'
import ListControls from '@/app/components/common/list/ListControls'
import SelectionToolbar from '@/app/components/common/selection/SelectionToolBar'
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
          <PrintLabels key="print" boxesIds={selectedIds} />,
        ]}
        actions={<NewBoxButton label="Add" />}
      />
    </div>
  )
}

export default BoxesToolbar
