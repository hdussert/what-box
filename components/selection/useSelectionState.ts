import { useState } from 'react'

export function useSelectionState() {
  const [mode, setMode] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const isSelecting = mode !== null

  const startSelecting = (nextMode: string) => setMode(nextMode)
  const stopSelecting = () => {
    setMode(null)
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
    mode,
    isSelecting,
    startSelecting,
    stopSelecting,

    selectedIds,
    selectAll,
    isSelected,
    toggleSelect,
  }
}
