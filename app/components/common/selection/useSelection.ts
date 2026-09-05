import { useState } from 'react'

export type SelectionContextValue = ReturnType<typeof useSelection>

export function useSelection() {
  const [isSelecting, setIsSelecting] = useState<boolean>(false)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const clearSelection = () => setSelectedIds([])

  const startSelecting = () => setIsSelecting(true)
  const stopSelecting = () => {
    setIsSelecting(false)
    setSelectedIds([])
  }

  const isSelected = (id: string) => selectedIds.includes(id)

  const toggleSelect = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((_id) => _id !== id)
        : [...current, id],
    )
  }

  return {
    isSelecting,
    startSelecting,
    stopSelecting,

    selectedIds,
    clearSelection,
    isSelected,
    toggleSelect,
  }
}
