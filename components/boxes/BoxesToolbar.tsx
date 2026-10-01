'use client'

import { DeleteBoxesButton } from '@/components/boxes/DeleteBoxesButton'
import PrintLabelsButton from '@/components/boxes/labels/PrintLabelsButton'
import NewBoxButton from '@/components/boxes/NewBoxButton'
import ListControls from '@/components/list/ListControls'
import SelectionToolbar from '@/components/selection/SelectionToolbar'
import { BulkAction } from '@/components/selection/types'
import { Printer, Trash } from 'lucide-react'

type BoxesToolbarProps = {
  boxIds: string[]
  unprintedIds: string[]
}

const BoxesToolbar = ({ boxIds, unprintedIds }: BoxesToolbarProps) => {
  const bulkActions: BulkAction[] = [
    {
      id: 'print',
      label: 'Print',
      icon: Printer,
      presets: [{ label: 'Unprinted', ids: unprintedIds }],
      renderButton: ({ selectedIds, done, renderLabel }) => (
        <PrintLabelsButton boxIds={selectedIds} onSuccess={done}>
          {renderLabel}
        </PrintLabelsButton>
      ),
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: Trash,
      renderButton: ({ selectedIds, done, renderLabel }) => (
        <DeleteBoxesButton boxIds={selectedIds} onSuccess={done}>
          {renderLabel()}
        </DeleteBoxesButton>
      ),
    },
  ]

  return (
    <div className="sticky top-0 z-20 flex flex-col gap-2 shadow-xl bg-background -mx-2 p-2 border-b">
      <ListControls />
      <SelectionToolbar
        ids={boxIds}
        bulkActions={bulkActions}
        actions={<NewBoxButton label="Add" />}
      />
    </div>
  )
}

export default BoxesToolbar
