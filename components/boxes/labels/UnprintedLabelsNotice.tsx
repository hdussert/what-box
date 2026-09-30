'use client'

import PrintLabelsButton from '@/components/boxes/labels/PrintLabelsButton'
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert'
import { pluralize } from '@/lib/utils'
import { Printer, PrinterX } from 'lucide-react'

const UNPRINTED_WORDS = {
  one: "label hasn't been printed",
  other: "labels haven't been printed",
}

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
      <AlertTitle>{pluralize(boxIds.length, UNPRINTED_WORDS)}</AlertTitle>
      <AlertDescription>
        Once printed, stick each label on its box.
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
