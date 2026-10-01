import { Spinner } from '@/components/ui/spinner'
import { LucideIcon } from 'lucide-react'

type ActionLabelProps = {
  icon: LucideIcon
  label: string
  count?: number
  /** Shows a spinner in place of the icon */
  isPending?: boolean
}

/** A bulk action's button content: icon only on mobile, then its label and selected count. */
const ActionLabel = ({
  icon: Icon,
  label,
  count,
  isPending,
}: ActionLabelProps) => {
  return (
    <>
      {isPending ? (
        <Spinner data-icon="inline-start" />
      ) : (
        <Icon data-icon="inline-start" />
      )}
      <span className="sr-only sm:not-sr-only">{label}</span>
      {count ? <span className="font-mono">{count}</span> : null}
    </>
  )
}

export default ActionLabel
