'use client'

import ToolbarButton from '@/app/components/box/dashboard/ToolbarButton'
import LabelsSheet from '@/app/components/box/labels/LabelsSheet'
import { Box } from '@/db/schema'
import { Printer } from 'lucide-react'

type PrintLabelsProps = {
  boxesIds: string[]
}
const PrintLabels = ({ boxesIds }: PrintLabelsProps) => {
  // TODO : Fetch the boxes everytime the button is pressed ?
  const boxes: Box[] = []
  const print = () => {
    // boxes = getBoxesByIds(boxesIds)...
    window.print()
  }
  return (
    <>
      <ToolbarButton onClick={print}>
        <Printer />
      </ToolbarButton>
      <LabelsSheet boxes={boxes} />
    </>
  )
}

export default PrintLabels
