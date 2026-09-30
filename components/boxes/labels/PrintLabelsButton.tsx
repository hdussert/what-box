'use client'

import { getBoxesByIdsAction } from '@/actions/boxes/get-boxes-by-ids'
import { markLabelsPrintedAction } from '@/actions/boxes/mark-labels-printed'
import ToolbarButton from '@/components/ToolbarButton'
import BoxLabelsSheet from '@/components/boxes/labels/BoxLabelsSheet'
import { Spinner } from '@/components/ui/spinner'
import { BoxWithRelations } from '@/lib/box'
import { LABEL_WORDS } from '@/lib/box/const'
import { pluralize } from '@/lib/utils'
import { Printer } from 'lucide-react'
import { ReactNode, useState, useTransition } from 'react'
import { toast } from 'sonner'

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

  const print = () => {
    startTransition(async () => {
      const fetchedBoxes = await getBoxesByIdsAction(boxIds)
      setBoxes(fetchedBoxes)
      const unprintedIds = (fetchedBoxes ?? [])
        .filter((box) => !box.labelPrinted)
        .map(({ id }) => id)

      // Important: wait until React has rendered the labels.
      requestAnimationFrame(() => {
        // window.print() doesn't block on iOS, and onSuccess may unmount the sheet
        window.addEventListener(
          'afterprint',
          () => {
            // Another button's print would otherwise include this sheet too
            setBoxes(undefined)
            onSuccess?.()
            offerToMarkPrinted(unprintedIds)
          },
          { once: true },
        )
        window.print()
      })
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

/**
 * Asks before marking: the browser can't tell a finished print from a
 * cancelled one.
 */
function offerToMarkPrinted(boxIds: string[]) {
  if (!boxIds.length) {
    return
  }

  toast(`Mark ${pluralize(boxIds.length, LABEL_WORDS)} as printed?`, {
    duration: 15_000,
    action: {
      label: 'Mark',
      onClick: async () => {
        const result = await markLabelsPrintedAction(boxIds)
        if (result.success) {
          toast.success(
            `${pluralize(result.marked, LABEL_WORDS)} marked as printed`,
          )
        } else {
          toast.error(result.message)
        }
      },
    },
  })
}

export default PrintLabelsButton
