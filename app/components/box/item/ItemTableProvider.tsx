'use client'

import {
  ItemTableContextValue,
  useItemTable,
} from '@/app/components/box/item/useItemTable'
import { ItemsPaginated } from '@/lib/item/types'
import { createContext, useContext } from 'react'

const ItemTableContext = createContext<ItemTableContextValue | null>(null)

type ItemTableProviderProps = ItemsPaginated & {
  boxId: string
  children: React.ReactNode
}

export const ItemTableProvider = ({
  children,
  ...props
}: ItemTableProviderProps) => {
  const context = useItemTable(props)
  return (
    <ItemTableContext.Provider value={context}>
      {children}
    </ItemTableContext.Provider>
  )
}

export const useItemTableContext = () => {
  const context = useContext(ItemTableContext)
  if (!context) {
    throw new Error('useItemTableContext must be used within ItemTableProvider')
  }
  return context
}
