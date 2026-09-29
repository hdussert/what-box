import { ReactNode } from 'react'

/** A bulk action that starts selection mode and ends on its confirm button. */
export type SelectionMode = {
  name: string
  label: string
  icon: ReactNode
  /** Shown while picking, e.g. "Pick boxes to print" */
  hint: string
  confirm: (props: { selectedIds: string[]; done: () => void }) => ReactNode
}
