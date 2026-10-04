'use client'

import { getBoxesByIdsAction } from '@/actions/boxes/get-boxes-by-ids'
import BoxLabelsSheet from '@/components/boxes/labels/BoxLabelsSheet'
import { MarkLabelsPrintedDialog } from '@/components/boxes/labels/MarkLabelsPrintedDialog'
import { useDialog } from '@/components/dialog/DialogProvider'
import { BoxWithRelations } from '@/lib/box'
import { useState, useTransition } from 'react'
import { flushSync } from 'react-dom'

type UsePrintLabelsOptions = {
  /** Called once the print dialog closes */
  onDone?: () => void
}

/**
 * Prints the labels of the given boxes, then asks whether the unprinted ones
 * printed correctly. The caller renders `sheet`.
 */
export function usePrintLabels({ onDone }: UsePrintLabelsOptions = {}) {
  const [boxes, setBoxes] = useState<BoxWithRelations[]>()
  const [isPending, startTransition] = useTransition()
  const { openDialog } = useDialog()

  const handleAfterPrint = (unprintedIds: string[]) => {
    // Another button's print would otherwise include this sheet too
    setBoxes(undefined)
    onDone?.()
    if (unprintedIds.length) {
      openDialog(MarkLabelsPrintedDialog, { boxIds: unprintedIds })
    }
  }

  const print = (boxIds: string[]) => {
    startTransition(async () => {
      const fetchedBoxes = (await getBoxesByIdsAction(boxIds)) ?? []
      const unprintedIds = fetchedBoxes
        .filter((box) => !box.labelPrinted)
        .map(({ id }) => id)

      // print() needs the sheet and its print styles in the page, and a plain
      // setState only schedules the render
      flushSync(() => setBoxes(fetchedBoxes))

      // window.print() doesn't block on iOS, and onDone may unmount the sheet
      window.addEventListener(
        'afterprint',
        () => handleAfterPrint(unprintedIds),
        { once: true },
      )
      window.print()
    })
  }

  const sheet = boxes ? <BoxLabelsSheet boxes={boxes} /> : null

  return { print, isPending, sheet }
}
