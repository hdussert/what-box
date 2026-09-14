'use client'

import { getBoxesForLabels } from '@/app/actions/get-boxes-for-labels'
import BoxLabelsSheet from '@/app/components/box/labels/LabelsSheet'
import ToolbarButton from '@/app/components/common/ToolbarButton'
import { BoxWithAll } from '@/lib/box'
import { LoaderCircle, Printer } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

type PrintLabelsProps = { boxesIds: string[] }

const PrintLabels = ({ boxesIds }: PrintLabelsProps) => {
  const [boxes, setBoxes] = useState<BoxWithAll[]>()
  const [isPending, startTransition] = useTransition()

  const print = () => {
    if (!boxesIds.length) {
      toast.error('Nothing to print !')
      return
    }

    startTransition(async () => {
      const fetchedBoxes = await getBoxesForLabels(boxesIds)
      setBoxes(fetchedBoxes)
      // Important: wait until React has rendered the labels.
      requestAnimationFrame(() => {
        window.print()
      })
    })
  }

  return (
    <>
      <ToolbarButton onClick={print} disabled={isPending}>
        {isPending ? <LoaderCircle className="animate-spin" /> : <Printer />}
      </ToolbarButton>
      {boxes ? <BoxLabelsSheet boxes={boxes} /> : null}
    </>
  )
}

export default PrintLabels
