import { ReactNode } from 'react'

type ActionLabelProps = {
  icon: ReactNode
  label: string
  count?: number
}

/** A bulk action's button content: icon only on mobile, then its label and selected count. */
const ActionLabel = ({ icon, label, count }: ActionLabelProps) => {
  return (
    <>
      {icon}
      <span className="sr-only sm:not-sr-only">{label}</span>
      {count ? <span className="font-mono">{count}</span> : null}
    </>
  )
}

export default ActionLabel
