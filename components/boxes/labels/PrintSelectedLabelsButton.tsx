'use client'

import { usePrintLabels } from '@/components/boxes/labels/usePrintLabels'
import ActionLabel from '@/components/selection/ActionLabel'
import { useSelection } from '@/components/selection/SelectionProvider'
import ToolbarButton from '@/components/ToolbarButton'
import { Printer } from 'lucide-react'

/** Prints the selected boxes' labels, then ends selection mode. */
const PrintSelectedLabelsButton = () => {
  const { selectedIds, stopSelecting } = useSelection()
  const { print, isPending, sheet } = usePrintLabels({ onDone: stopSelecting })

  return (
    <>
      <ToolbarButton
        onClick={() => print(selectedIds)}
        disabled={isPending || !selectedIds.length}
      >
        <ActionLabel icon={Printer} label="Print" isPending={isPending} />
      </ToolbarButton>
      {sheet}
    </>
  )
}

export default PrintSelectedLabelsButton
