'use client'

import { ListStateOptions, useListState } from '@/components/list/useListState'
import { createContext, PropsWithChildren, useContext } from 'react'

type ListContextValue = ReturnType<typeof useListState>
const ListContext = createContext<ListContextValue | null>(null)

type ListProviderProps = PropsWithChildren<ListStateOptions>
const ListProvider = ({ children, ...props }: ListProviderProps) => {
  const context = useListState(props)

  return <ListContext.Provider value={context}>{children}</ListContext.Provider>
}

export function useList() {
  const ctx = useContext(ListContext)
  if (!ctx) throw new Error('useList must be used within ListProvider')
  return ctx
}

export default ListProvider
