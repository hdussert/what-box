'use client'

import {
  BoxesContextValue,
  useBoxes,
} from '@/app/components/box/table/useBoxes'
import { BoxesPaginated } from '@/lib/box/types'
import { createContext, useContext } from 'react'

const BoxesContext = createContext<BoxesContextValue | null>(null)

type BoxesProviderProps = BoxesPaginated & {
  children: React.ReactNode
}

export const BoxesContextProvider = ({
  children,
  ...props
}: BoxesProviderProps) => {
  const context = useBoxes(props)
  return (
    <BoxesContext.Provider value={context}>{children}</BoxesContext.Provider>
  )
}

export const useBoxesContext = () => {
  const context = useContext(BoxesContext)
  if (!context) {
    throw new Error(
      'useBoxesContext must be used within a BoxesContextProvider',
    )
  }
  return context
}
