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
import { ComponentProps, ReactElement, ReactNode } from 'react'

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

/** A dialog on desktop and a bottom drawer on mobile, with the same parts as `Dialog`. */
function ResponsiveDialog(props: RootProps) {
  const isMobile = useIsMobile()
  return isMobile ? <Drawer {...props} /> : <Dialog {...props} />
}

function ResponsiveDialogTrigger(props: ButtonPartProps) {
  const isMobile = useIsMobile()
  return isMobile ? <DrawerTrigger {...props} /> : <DialogTrigger {...props} />
}

function ResponsiveDialogClose(props: ButtonPartProps) {
  const isMobile = useIsMobile()
  return isMobile ? <DrawerClose {...props} /> : <DialogClose {...props} />
}

function ResponsiveDialogContent({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile()
  return isMobile ? (
    <DrawerContent>{children}</DrawerContent>
  ) : (
    <DialogContent>{children}</DialogContent>
  )
}

function ResponsiveDialogHeader(props: PartProps) {
  const isMobile = useIsMobile()
  return isMobile ? <DrawerHeader {...props} /> : <DialogHeader {...props} />
}

function ResponsiveDialogTitle(props: TextPartProps) {
  const isMobile = useIsMobile()
  return isMobile ? <DrawerTitle {...props} /> : <DialogTitle {...props} />
}

function ResponsiveDialogDescription(props: TextPartProps) {
  const isMobile = useIsMobile()
  return isMobile ? (
    <DrawerDescription {...props} />
  ) : (
    <DialogDescription {...props} />
  )
}

/** The content between header and footer, padded like them on mobile. */
function ResponsiveDialogBody({ className, ...props }: PartProps) {
  const isMobile = useIsMobile()
  return (
    // Without a footer, the drawer's bottom padding comes from the body
    <div className={cn(isMobile && 'px-4 last:pb-4', className)} {...props} />
  )
}

function ResponsiveDialogFooter(props: PartProps) {
  const isMobile = useIsMobile()
  return isMobile ? <DrawerFooter {...props} /> : <DialogFooter {...props} />
}

export {
  ResponsiveDialog,
  ResponsiveDialogBody,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
}
