import { Printer, PrinterCheck } from 'lucide-react'

type LabelStatusProps = {
  isPrinted: boolean
}

/** A box's label state as an icon, with the same text for screen readers and on hover. */
const LabelStatus = ({ isPrinted }: LabelStatusProps) => {
  const label = isPrinted ? 'Label printed' : 'No label yet'
  const Icon = isPrinted ? PrinterCheck : Printer

  return (
    <span title={label}>
      <Icon className="size-4" aria-hidden />
      <span className="sr-only">{label}</span>
    </span>
  )
}

export default LabelStatus
