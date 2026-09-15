'use client'

import { useSelectionState } from '@/components/selection/useSelectionState'
import { createContext, useContext } from 'react'

type SelectionContextValue = ReturnType<typeof useSelectionState>
const SelectionContext = createContext<SelectionContextValue | null>(null)

type SelectionProviderprops = {
  children: React.ReactNode
}

export const SelectionProvider = ({ children }: SelectionProviderprops) => {
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
    throw new Error(
      'useSelectionContext must be used within a SelectionProvider',
    )
  }
  return context
}
