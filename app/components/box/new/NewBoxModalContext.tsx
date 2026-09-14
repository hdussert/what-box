'use client'

import NewBoxModal from '@/app/components/box/new/NewBoxModal'
import { createContext, PropsWithChildren, useContext, useState } from 'react'

type NewBoxModalContextValue = {
  open: boolean
  onOpenChange: (bool: boolean) => void
  openNewBoxModal: () => void
  closeNewBoxModal: () => void
}

const NewBoxModalContext = createContext<NewBoxModalContextValue | null>(null)

export function NewBoxModalProvider({ children }: PropsWithChildren) {
  const [open, onOpenChange] = useState(false)
  const value = {
    open,
    onOpenChange,
    openNewBoxModal: () => onOpenChange(true),
    closeNewBoxModal: () => onOpenChange(false),
  }
  return (
    <NewBoxModalContext.Provider value={value}>
      {children}
      <NewBoxModal />
    </NewBoxModalContext.Provider>
  )
}

export function useNewBoxModalContext() {
  const ctx = useContext(NewBoxModalContext)
  if (!ctx)
    throw new Error('useNewBoxModal must be used within NewBoxModalProvider')
  return ctx
}
