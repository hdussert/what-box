'use client'

import PrintLabelsButton from '@/components/boxes/labels/PrintLabelsButton'
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert'
import { BOX_WORDS } from '@/lib/box/const'
import { pluralize } from '@/lib/utils'
import { Printer, PrinterX } from 'lucide-react'

type UnprintedLabelsNoticeProps = {
  boxIds: string[]
}

/** Counts the listed boxes that have no printed label yet, with a shortcut to print them. */
const UnprintedLabelsNotice = ({ boxIds }: UnprintedLabelsNoticeProps) => {
  if (!boxIds.length) {
    return null
  }

  return (
    <Alert role="status" className="has-data-[slot=alert-action]:pr-24">
      <PrinterX />
      <AlertTitle>
        {pluralize(boxIds.length, BOX_WORDS)} without a label
      </AlertTitle>
      <AlertDescription>
        Print their QR labels to find them by scanning.
      </AlertDescription>
      <AlertAction>
        <PrintLabelsButton boxIds={boxIds}>
          <Printer /> Print
        </PrintLabelsButton>
      </AlertAction>
    </Alert>
  )
}

export default UnprintedLabelsNotice
