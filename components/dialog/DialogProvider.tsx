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

type DialogComponent<P extends object = object> = ComponentType<
  P & DialogBaseProps
>

// A render function instead of { component, props }, so each dialog's props stay typed
type DialogState = {
  render: (baseProps: DialogBaseProps) => ReactNode
}

type DialogContextValue = {
  openDialog: <P extends object>(
    component: DialogComponent<P>,
    props: P,
  ) => void
  closeDialog: () => void
}

const DialogContext = createContext<DialogContextValue | null>(null)

export function DialogProvider({ children }: { children: ReactNode }) {
  const [dialog, setDialog] = useState<DialogState | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const openDialog = useCallback(
    <P extends object>(Component: DialogComponent<P>, props: P) => {
      setDialog({
        render: (baseProps) => <Component {...props} {...baseProps} />,
      })
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

      {dialog?.render({ isOpen, setIsOpen })}
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
