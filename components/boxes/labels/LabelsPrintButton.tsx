'use client'

import { fetchBoxesByIds } from '@/actions/boxes/fetch-boxes-by-ids'
import ToolbarButton from '@/components/ToolbarButton'
import BoxLabelsSheet from '@/components/boxes/labels/LabelsSheet'
import { BoxWithAll } from '@/lib/box'
import { LoaderCircle, Printer } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

type LabelsPrintButtonProps = { boxIds: string[] }

const LabelsPrintButton = ({ boxIds }: LabelsPrintButtonProps) => {
  const [boxes, setBoxes] = useState<BoxWithAll[]>()
  const [isPending, startTransition] = useTransition()

  const print = () => {
    if (!boxIds.length) {
      toast.error('Nothing to print !')
      return
    }

    startTransition(async () => {
      const fetchedBoxes = await fetchBoxesByIds(boxIds)
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

export default LabelsPrintButton
