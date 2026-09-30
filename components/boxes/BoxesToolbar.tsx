'use client'

import { DeleteBoxesButton } from '@/components/boxes/DeleteBoxesButton'
import PrintLabelsButton from '@/components/boxes/labels/PrintLabelsButton'
import NewBoxButton from '@/components/boxes/NewBoxButton'
import ListControls from '@/components/list/ListControls'
import ActionLabel from '@/components/selection/ActionLabel'
import { useSelection } from '@/components/selection/SelectionProvider'
import SelectionToolbar from '@/components/selection/SelectionToolbar'
import ToolbarButton from '@/components/ToolbarButton'
import { Separator } from '@/components/ui/separator'
import { Printer, Trash } from 'lucide-react'

type BoxesToolbarProps = {
  boxIds: string[]
  unprintedIds: string[]
}

const BoxesToolbar = ({ boxIds, unprintedIds }: BoxesToolbarProps) => {
  const { startSelecting } = useSelection()

  return (
    <div className="sticky top-0 z-20 shadow-xl bg-background -mx-2 p-2 border-b">
      <ListControls />
      <Separator className="mt-2 mb-1" />
      <SelectionToolbar
        ids={boxIds}
        presets={[{ label: 'Unprinted', ids: unprintedIds }]}
        startActions={
          <>
            <ToolbarButton onClick={startSelecting}>
              <ActionLabel icon={<Printer />} label="Print" />
            </ToolbarButton>
            <ToolbarButton onClick={startSelecting}>
              <ActionLabel icon={<Trash />} label="Delete" />
            </ToolbarButton>
          </>
        }
        selectionActions={({ selectedIds, done }) => (
          <>
            <PrintLabelsButton boxIds={selectedIds} onSuccess={done}>
              <ActionLabel
                icon={<Printer />}
                label="Print"
                count={selectedIds.length}
              />
            </PrintLabelsButton>
            <DeleteBoxesButton boxIds={selectedIds} onSuccess={done}>
              <ActionLabel
                icon={<Trash />}
                label="Delete"
                count={selectedIds.length}
              />
            </DeleteBoxesButton>
          </>
        )}
        actions={<NewBoxButton label="Add" />}
      />
    </div>
  )
}

export default BoxesToolbar
