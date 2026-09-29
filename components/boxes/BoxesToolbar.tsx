'use client'

import { DeleteBoxesButton } from '@/components/boxes/DeleteBoxesButton'
import PrintLabelsButton from '@/components/boxes/labels/PrintLabelsButton'
import NewBoxButton from '@/components/boxes/NewBoxButton'
import ListControls from '@/components/list/ListControls'
import SelectionToolbar from '@/components/selection/SelectionToolbar'
import { SelectionMode } from '@/components/selection/types'
import { Separator } from '@/components/ui/separator'
import { Printer, Trash } from 'lucide-react'

const modes: SelectionMode[] = [
  {
    name: 'print',
    label: 'Print labels',
    icon: <Printer />,
    hint: 'Pick boxes to print',
    confirm: ({ selectedIds, done }) => (
      <PrintLabelsButton
        boxIds={selectedIds}
        onSuccess={done}
        variant="default"
      >
        <Printer /> Print {selectedIds.length}{' '}
        {selectedIds.length === 1 ? 'label' : 'labels'}
      </PrintLabelsButton>
    ),
  },
  {
    name: 'delete',
    label: 'Delete',
    icon: <Trash />,
    hint: 'Pick boxes to delete',
    confirm: ({ selectedIds, done }) => (
      <DeleteBoxesButton
        boxIds={selectedIds}
        onSuccess={done}
        variant="destructive"
      >
        <Trash /> Delete {selectedIds.length}{' '}
        {selectedIds.length === 1 ? 'box' : 'boxes'}
      </DeleteBoxesButton>
    ),
  },
]

type BoxesToolbarProps = {
  boxIds: string[]
}

const BoxesToolbar = ({ boxIds }: BoxesToolbarProps) => {
  return (
    <div className="sticky top-0 z-20 shadow-xl bg-background -mx-2 px-2 pt-2">
      <ListControls />
      <Separator className="mt-2 mb-1" />
      <SelectionToolbar
        modes={modes}
        ids={boxIds}
        actions={<NewBoxButton label="Add" />}
      />
    </div>
  )
}

export default BoxesToolbar
