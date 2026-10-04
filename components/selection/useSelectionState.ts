import { useState } from 'react'

export function useSelectionState() {
  const [isSelecting, setIsSelecting] = useState(false)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const startSelecting = () => setIsSelecting(true)
  const stopSelecting = () => {
    setIsSelecting(false)
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
    isSelecting,
    startSelecting,
    stopSelecting,

    selectedIds,
    selectAll,
    isSelected,
    toggleSelect,
  }
}
