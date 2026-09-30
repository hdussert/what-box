import { useState } from 'react'

export function useSelectionState() {
  const [activeAction, setActiveAction] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const isSelecting = activeAction !== null

  /** Enters selection mode for the bulk action with this id */
  const startSelecting = (actionId: string) => setActiveAction(actionId)
  const stopSelecting = () => {
    setActiveAction(null)
    setSelectedIds([])
  }

  const selectAll = (ids: string[]) => setSelectedIds(ids)

  const isSelected = (id: string) => selectedIds.includes(id)

  const toggleSelect = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((_id) => _id !== id)
        : [...current, id],
    )
  }

  return {
    activeAction,
    isSelecting,
    startSelecting,
    stopSelecting,

    selectedIds,
    selectAll,
    isSelected,
    toggleSelect,
  }
}
