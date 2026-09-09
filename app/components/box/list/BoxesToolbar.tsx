'use client'

import { DeleteBoxes } from '@/app/components/box/DeleteBoxes'
import PrintLabels from '@/app/components/box/labels/PrintLabels'
import ListControls from '@/app/components/common/list/ListControls'
import SelectionToolbar from '@/app/components/common/selection/SelectionToolBar'

const BoxesToolbar = () => {
  return (
    <div className="sticky top-0 z-20 shadow-xl bg-background -mx-2 px-2 border-b pt-2">
      <ListControls />
      <SelectionToolbar
        actions={({ selectedIds, clearSelection }) => [
          <DeleteBoxes
            key="delete"
            boxesIds={selectedIds}
            successCallback={clearSelection}
          />,
          <PrintLabels key="print" boxesIds={selectedIds} />,
        ]}
      />
    </div>
  )
}

export default BoxesToolbar
