'use client'

import { ListParamsProps, useListParams } from '@/components/list/useListParams'
import { createContext, PropsWithChildren, useContext } from 'react'

type ListContextValue = ReturnType<typeof useListParams>
const ListContext = createContext<ListContextValue | null>(null)

type ListProviderProps = PropsWithChildren<ListParamsProps>
const ListProvider = ({ children, ...props }: ListProviderProps) => {
  const context = useListParams(props)

  return <ListContext.Provider value={context}>{children}</ListContext.Provider>
}

export function useList() {
  const ctx = useContext(ListContext)
  if (!ctx)
    throw new Error(
      'useListParamsContext must be used within ListParamsProvider',
    )
  return ctx
}

export default ListProvider
