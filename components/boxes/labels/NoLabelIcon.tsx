import { PrinterX } from 'lucide-react'

/** Marks a box whose label isn't printed yet, for screen readers and on hover too. */
const NoLabelIcon = () => {
  const label = 'No label yet'

  return (
    <span title={label}>
      <PrinterX className="size-4" aria-hidden />
      <span className="sr-only">{label}</span>
    </span>
  )
}

export default NoLabelIcon
