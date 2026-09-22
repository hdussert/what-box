'use client'

import {
  ComponentType,
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'

export type DialogBaseProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

type DialogComponent<P = {}> = ComponentType<P & DialogBaseProps>

type DialogState = {
  component: DialogComponent<any>
  props: any
}

type DialogContextValue = {
  openDialog: <P>(component: DialogComponent<P>, props: P) => void
  closeDialog: () => void
}

const DialogContext = createContext<DialogContextValue | null>(null)

export function DialogProvider({ children }: { children: ReactNode }) {
  const [dialog, setDialog] = useState<DialogState | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const openDialog = useCallback(
    <P,>(component: DialogComponent<P>, props: P) => {
      setDialog({ component, props })
      setIsOpen(true)
    },
    [],
  )

  const closeDialog = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}

      {dialog && (
        <dialog.component
          {...dialog.props}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </DialogContext.Provider>
  )
}

export function useDialog() {
  const context = useContext(DialogContext)

  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider')
  }

  return context
}
