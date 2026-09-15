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
  open: boolean
  setOpen: (open: boolean) => void
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
  const [open, setOpen] = useState(false)

  const openDialog = useCallback(
    <P,>(component: DialogComponent<P>, props: P) => {
      setDialog({ component, props })
      setOpen(true)
    },
    [],
  )

  const closeDialog = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}

      {dialog && (
        <dialog.component {...dialog.props} open={open} setOpen={setOpen} />
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
