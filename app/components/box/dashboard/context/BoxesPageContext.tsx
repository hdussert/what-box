'use client'

import { useBoxesPage } from '@/app/components/box/dashboard/context/useBoxesPage'
import { BoxesPaginated } from '@/lib/box/types'
import { createContext, useContext } from 'react'

type BoxesPageContextValue = ReturnType<typeof useBoxesPage>
const BoxesPageContext = createContext<BoxesPageContextValue | null>(null)

type BoxesProviderProps = BoxesPaginated & {
  children: React.ReactNode
}
export const BoxesPageContextProvider = ({
  children,
  ...props
}: BoxesProviderProps) => {
  const context = useBoxesPage(props)
  return (
    <BoxesPageContext.Provider value={context}>
      {children}
    </BoxesPageContext.Provider>
  )
}

export const useBoxesPageContext = () => {
  const context = useContext(BoxesPageContext)
  if (!context) {
    throw new Error(
      'useBoxesContext must be used within a BoxesContextProvider',
    )
  }
  return context
}
