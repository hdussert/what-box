import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { PrinterX } from 'lucide-react'

/** Marks a box whose label isn't printed yet, with the same text in a tooltip and for screen readers. */
const NoLabelIcon = () => {
  const label = 'No label yet'

  return (
    <Tooltip>
      <TooltipTrigger render={<span />}>
        <PrinterX className="size-4" aria-hidden />
        <span className="sr-only">{label}</span>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

export default NoLabelIcon
