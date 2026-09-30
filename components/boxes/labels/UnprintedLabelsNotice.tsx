'use client'

import PrintLabelsButton from '@/components/boxes/labels/PrintLabelsButton'
import { BOX_WORDS } from '@/lib/box/const'
import { pluralize } from '@/lib/utils'
import { Printer } from 'lucide-react'

type UnprintedLabelsNoticeProps = {
  boxIds: string[]
}

/** Counts the listed boxes that have no printed label yet, with a shortcut to print them. */
const UnprintedLabelsNotice = ({ boxIds }: UnprintedLabelsNoticeProps) => {
  if (!boxIds.length) {
    return null
  }

  return (
    <div className="flex items-center justify-between gap-2 rounded-md bg-muted/50 px-3 py-1 text-sm text-muted-foreground">
      <span>{pluralize(boxIds.length, BOX_WORDS)} without a label</span>
      <PrintLabelsButton boxIds={boxIds}>
        <Printer /> Print
      </PrintLabelsButton>
    </div>
  )
}

export default UnprintedLabelsNotice
