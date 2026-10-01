'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useIsMobile } from '@/hooks/useIsMobile'
import { cn } from 'cn'
import {
  ComponentProps,
  createContext,
  ReactElement,
  ReactNode,
  useContext,
} from 'react'

type RootProps = {
  open: boolean
  onOpenChange: (isOpen: boolean) => void
  children: ReactNode
}

type ButtonPartProps = {
  render?: ReactElement
  disabled?: boolean
  children?: ReactNode
}

type PartProps = ComponentProps<'div'>

type TextPartProps = {
  className?: string
  children: ReactNode
}

const IsMobileContext = createContext<boolean | null>(null)

function useIsMobileDialog() {
  const isMobile = useContext(IsMobileContext)
  if (isMobile === null) {
    throw new Error(
      'ResponsiveDialog parts must be used within a ResponsiveDialog',
    )
  }
  return isMobile
}

/** A dialog on desktop and a bottom drawer on mobile, with the same parts as `Dialog`. */
function ResponsiveDialog(props: RootProps) {
  const isMobile = useIsMobile()
  return (
    <IsMobileContext.Provider value={isMobile}>
      {isMobile ? <Drawer {...props} /> : <Dialog {...props} />}
    </IsMobileContext.Provider>
  )
}

function ResponsiveDialogTrigger(props: ButtonPartProps) {
  return useIsMobileDialog() ? (
    <DrawerTrigger {...props} />
  ) : (
    <DialogTrigger {...props} />
  )
}

function ResponsiveDialogClose(props: ButtonPartProps) {
  return useIsMobileDialog() ? (
    <DrawerClose {...props} />
  ) : (
    <DialogClose {...props} />
  )
}

function ResponsiveDialogContent({ children }: { children: ReactNode }) {
  return useIsMobileDialog() ? (
    <DrawerContent>
      {/* Spaces the parts like DialogContent; header and footer drop their own padding */}
      <div className="flex flex-col gap-4 p-4">{children}</div>
    </DrawerContent>
  ) : (
    <DialogContent>{children}</DialogContent>
  )
}

function ResponsiveDialogHeader({ className, ...props }: PartProps) {
  return useIsMobileDialog() ? (
    <DrawerHeader className={cn('p-0', className)} {...props} />
  ) : (
    // Clears the dialog's close button
    <DialogHeader className={cn('pr-6', className)} {...props} />
  )
}

function ResponsiveDialogTitle(props: TextPartProps) {
  return useIsMobileDialog() ? (
    <DrawerTitle {...props} />
  ) : (
    <DialogTitle {...props} />
  )
}

function ResponsiveDialogDescription(props: TextPartProps) {
  return useIsMobileDialog() ? (
    <DrawerDescription {...props} />
  ) : (
    <DialogDescription {...props} />
  )
}

function ResponsiveDialogFooter({ className, ...props }: PartProps) {
  return useIsMobileDialog() ? (
    <DrawerFooter className={cn('p-0', className)} {...props} />
  ) : (
    <DialogFooter className={className} {...props} />
  )
}

export {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
}
