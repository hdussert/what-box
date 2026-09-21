'use client'

import { getBoxesByIdsAction } from '@/actions/boxes/get-boxes-by-ids'
import ToolbarButton from '@/components/ToolbarButton'
import BoxLabelsSheet from '@/components/boxes/labels/BoxLabelsSheet'
import { BoxWithRelations } from '@/lib/box'
import { LoaderCircle, Printer } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

type PrintLabelsButtonProps = { boxIds: string[] }

const PrintLabelsButton = ({ boxIds }: PrintLabelsButtonProps) => {
  const [boxes, setBoxes] = useState<BoxWithRelations[]>()
  const [isPending, startTransition] = useTransition()

  const print = () => {
    if (!boxIds.length) {
      toast.error('Nothing to print !')
      return
    }

    startTransition(async () => {
      const fetchedBoxes = await getBoxesByIdsAction(boxIds)
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

export default PrintLabelsButton
