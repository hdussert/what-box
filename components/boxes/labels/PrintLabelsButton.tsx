'use client'

import { getBoxesByIdsAction } from '@/actions/boxes/get-boxes-by-ids'
import ToolbarButton from '@/components/ToolbarButton'
import BoxLabelsSheet from '@/components/boxes/labels/BoxLabelsSheet'
import { MarkLabelsPrintedDialog } from '@/components/boxes/labels/MarkLabelsPrintedDialog'
import { useDialog } from '@/components/dialog/DialogProvider'
import { Spinner } from '@/components/ui/spinner'
import { BoxWithRelations } from '@/lib/box'
import { Printer } from 'lucide-react'
import { ComponentProps, ReactNode, useState, useTransition } from 'react'
import { flushSync } from 'react-dom'

type PrintLabelsButtonProps = {
  boxIds: string[]
  /** Called once the print dialog closes */
  onSuccess?: () => void
  variant?: ComponentProps<typeof ToolbarButton>['variant']
  /** A function gets the pending state; anything else is replaced by a spinner while pending */
  children?: ReactNode | ((isPending: boolean) => ReactNode)
}

const PrintLabelsButton = ({
  boxIds,
  onSuccess,
  variant,
  children = <Printer />,
}: PrintLabelsButtonProps) => {
  const [boxes, setBoxes] = useState<BoxWithRelations[]>()
  const [isPending, startTransition] = useTransition()
  const { openDialog } = useDialog()

  const handleAfterPrint = (unprintedIds: string[]) => {
    // Another button's print would otherwise include this sheet too
    setBoxes(undefined)
    onSuccess?.()
    if (unprintedIds.length) {
      openDialog(MarkLabelsPrintedDialog, { boxIds: unprintedIds })
    }
  }

  const print = () => {
    startTransition(async () => {
      const fetchedBoxes = (await getBoxesByIdsAction(boxIds)) ?? []
      const unprintedIds = fetchedBoxes
        .filter((box) => !box.labelPrinted)
        .map(({ id }) => id)

      // print() needs the sheet and its print styles in the page, and a plain
      // setState only schedules the render
      flushSync(() => setBoxes(fetchedBoxes))

      // window.print() doesn't block on iOS, and onSuccess may unmount the sheet
      window.addEventListener(
        'afterprint',
        () => handleAfterPrint(unprintedIds),
        {
          once: true,
        },
      )
      window.print()
    })
  }

  const renderContent = () => {
    if (typeof children === 'function') {
      return children(isPending)
    }
    return isPending ? <Spinner /> : children
  }

  return (
    <>
      <ToolbarButton
        variant={variant}
        onClick={print}
        disabled={isPending || !boxIds.length}
      >
        {renderContent()}
      </ToolbarButton>
      {boxes ? <BoxLabelsSheet boxes={boxes} /> : null}
    </>
  )
}

export default PrintLabelsButton
