'use client'

import {
  useListParams,
  UseListParamsProps,
} from '@/app/components/common/list/useListParams'
import { createContext, PropsWithChildren, useContext } from 'react'

type ListParamsContextValue = ReturnType<typeof useListParams>
const ListParamsContext = createContext<ListParamsContextValue | null>(null)

type ListParamsProviderProps = PropsWithChildren<UseListParamsProps>
const ListParamsProvider = ({
  children,
  ...props
}: ListParamsProviderProps) => {
  const context = useListParams(props)

  return (
    <ListParamsContext.Provider value={context}>
      {children}
    </ListParamsContext.Provider>
  )
}

export function useListParamsContext() {
  const ctx = useContext(ListParamsContext)
  if (!ctx)
    throw new Error(
      'useListParamsContext must be used within ListParamsProvider',
    )
  return ctx
}

export default ListParamsProvider
