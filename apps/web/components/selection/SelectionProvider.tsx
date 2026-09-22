'use client'

import { useSelectionState } from '@/components/selection/useSelectionState'
import { createContext, useContext } from 'react'

type SelectionContextValue = ReturnType<typeof useSelectionState>
const SelectionContext = createContext<SelectionContextValue | null>(null)

type SelectionProviderProps = {
  children: React.ReactNode
}

export const SelectionProvider = ({ children }: SelectionProviderProps) => {
  const selection = useSelectionState()
  return (
    <SelectionContext.Provider value={selection}>
      {children}
    </SelectionContext.Provider>
  )
}

export const useSelection = () => {
  const context = useContext(SelectionContext)
  if (!context) {
    throw new Error('useSelection must be used within a SelectionProvider')
  }
  return context
}
