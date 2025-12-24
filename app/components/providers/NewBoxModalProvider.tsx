'use client'

import NewBoxModal from '@/app/components/modals/NewBoxModal'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react'

type NewBoxModalContextValue = {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const NewBoxModalContext = createContext<NewBoxModalContextValue | null>(null)

export function NewBoxModalProvider({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false)

  const value = useMemo(
    () => ({
      isOpen: open,
      openModal: () => setOpen(true),
      closeModal: () => setOpen(false),
    }),
    [open]
  )

  return (
    <NewBoxModalContext.Provider value={value}>
      {children}
      <NewBoxModal />
    </NewBoxModalContext.Provider>
  )
}

export function useNewBoxModal() {
  const ctx = useContext(NewBoxModalContext)
  if (!ctx)
    throw new Error('useNewBoxModal must be used within NewBoxModalProvider')
  return ctx
}
