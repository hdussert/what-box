import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

/** A named subset of the rows, selected in one tap (e.g. unprinted boxes). */
type SelectionPreset = {
  label: string
  ids: string[]
}

type BulkActionButtonProps = {
  selectedIds: string[]
  /** Ends selection mode */
  done: () => void
  /** The button's content: icon, label and selected count */
  label: ReactNode
}

/** An action applied to the selected rows, e.g. Print or Delete. */
export type BulkAction = {
  id: string
  label: string
  icon: LucideIcon
  /** Shortcuts shown only while this action is selecting */
  presets?: SelectionPreset[]
  /** The button that applies the action to the selection */
  renderButton: (props: BulkActionButtonProps) => ReactNode
}
