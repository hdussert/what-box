'use client'

import { getBoxesByIdsAction } from '@/actions/boxes/get-boxes-by-ids'
import ToolbarButton from '@/components/ToolbarButton'
import BoxLabelsSheet from '@/components/boxes/labels/BoxLabelsSheet'
import { Spinner } from '@/components/ui/spinner'
import { BoxWithRelations } from '@/lib/box'
import { Printer } from 'lucide-react'
import { ComponentProps, ReactNode, useState, useTransition } from 'react'

type PrintLabelsButtonProps = {
  boxIds: string[]
  /** Called once the print dialog closes */
  onSuccess?: () => void
  variant?: ComponentProps<typeof ToolbarButton>['variant']
  children?: ReactNode
}

const PrintLabelsButton = ({
  boxIds,
  onSuccess,
  variant,
  children = <Printer />,
}: PrintLabelsButtonProps) => {
  const [boxes, setBoxes] = useState<BoxWithRelations[]>()
  const [isPending, startTransition] = useTransition()

  const print = () => {
    startTransition(async () => {
      const fetchedBoxes = await getBoxesByIdsAction(boxIds)
      setBoxes(fetchedBoxes)
      // Important: wait until React has rendered the labels.
      requestAnimationFrame(() => {
        // window.print() doesn't block on iOS, and onSuccess may unmount the sheet
        if (onSuccess) {
          window.addEventListener('afterprint', onSuccess, { once: true })
        }
        window.print()
      })
    })
  }

  return (
    <>
      <ToolbarButton
        variant={variant}
        onClick={print}
        disabled={isPending || !boxIds.length}
      >
        {isPending ? <Spinner /> : children}
      </ToolbarButton>
      {boxes ? <BoxLabelsSheet boxes={boxes} /> : null}
    </>
  )
}

export default PrintLabelsButton
