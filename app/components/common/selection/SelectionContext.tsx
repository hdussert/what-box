'use client'

import {
  SelectionContextValue,
  useSelection,
} from '@/app/components/common/selection/useSelection'
import { createContext, useContext } from 'react'

const SelectionContext = createContext<SelectionContextValue | null>(null)

type SelectionProviderprops = {
  children: React.ReactNode
}

export const SelectionContextProvider = ({
  children,
}: SelectionProviderprops) => {
  const context = useSelection()
  return (
    <SelectionContext.Provider value={context}>
      {children}
    </SelectionContext.Provider>
  )
}

export const useSelectionContext = () => {
  const context = useContext(SelectionContext)
  if (!context) {
    throw new Error(
      'useSelectionContext must be used within a SelectionContextProvider',
    )
  }
  return context
}
