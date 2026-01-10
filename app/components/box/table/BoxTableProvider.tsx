import {
  BoxTableContextValue,
  useBoxTable,
} from '@/app/components/box/table/useBoxTable'
import { BoxesPaginated } from '@/lib/box/types'
import { createContext, useContext } from 'react'

const BoxTableContext = createContext<BoxTableContextValue | null>(null)

type BoxTableProviderProps = BoxesPaginated & {
  children: React.ReactNode
}
export const BoxTableContextProvider = ({
  children,
  ...props
}: BoxTableProviderProps) => {
  const context = useBoxTable(props)
  return (
    <BoxTableContext.Provider value={context}>
      {children}
    </BoxTableContext.Provider>
  )
}

export const useBoxTableContext = () => {
  const context = useContext(BoxTableContext)
  if (!context) {
    throw new Error(
      'useBoxTableContext must be used within a BoxTableContextProvider'
    )
  }
  return context
}
