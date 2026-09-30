'use client'

import { getBoxesByIdsAction } from '@/actions/boxes/get-boxes-by-ids'
import ToolbarButton from '@/components/ToolbarButton'
import BoxLabelsSheet from '@/components/boxes/labels/BoxLabelsSheet'
import { MarkLabelsPrintedDialog } from '@/components/boxes/labels/MarkLabelsPrintedDialog'
import { useDialog } from '@/components/dialog/DialogProvider'
import { Spinner } from '@/components/ui/spinner'
import { BoxWithRelations } from '@/lib/box'
import { Printer } from 'lucide-react'
import { ReactNode, useState, useTransition } from 'react'
import { flushSync } from 'react-dom'

type PrintLabelsButtonProps = {
  boxIds: string[]
  /** Called once the print dialog closes */
  onSuccess?: () => void
  children?: ReactNode
}

const PrintLabelsButton = ({
  boxIds,
  onSuccess,
  children = <Printer />,
}: PrintLabelsButtonProps) => {
  const [boxes, setBoxes] = useState<BoxWithRelations[]>()
  const [isPending, startTransition] = useTransition()
  const { openDialog } = useDialog()

  const print = () => {
    startTransition(async () => {
      const fetchedBoxes = await getBoxesByIdsAction(boxIds)
      const unprintedIds = (fetchedBoxes ?? [])
        .filter((box) => !box.labelPrinted)
        .map(({ id }) => id)

      // print() needs the sheet and its print styles in the page, and a plain
      // setState only schedules the render
      flushSync(() => setBoxes(fetchedBoxes))

      // window.print() doesn't block on iOS, and onSuccess may unmount the sheet
      window.addEventListener(
        'afterprint',
        () => {
          // Another button's print would otherwise include this sheet too
          setBoxes(undefined)
          onSuccess?.()
          if (unprintedIds.length) {
            openDialog(MarkLabelsPrintedDialog, { boxIds: unprintedIds })
          }
        },
        { once: true },
      )
      window.print()
    })
  }

  return (
    <>
      <ToolbarButton onClick={print} disabled={isPending || !boxIds.length}>
        {isPending ? <Spinner /> : children}
      </ToolbarButton>
      {boxes ? <BoxLabelsSheet boxes={boxes} /> : null}
    </>
  )
}

export default PrintLabelsButton
