import { markLabelsPrintedAction } from '@/actions/boxes/mark-labels-printed'
import { DialogBaseProps } from '@/components/dialog/DialogProvider'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { useIsMobile } from '@/hooks/useIsMobile'
import { LABEL_WORDS } from '@/lib/box/const'
import { pluralize } from '@/lib/utils'
import { useTransition } from 'react'
import { toast } from 'sonner'

type MarkLabelsPrintedDialogProps = {
  boxIds: string[]
} & DialogBaseProps

const TITLE = 'Did the labels print correctly?'

/**
 * Asks after the print dialog closes: the browser can't tell a finished print
 * from a cancelled one.
 */
export function MarkLabelsPrintedDialog({
  isOpen,
  setIsOpen,
  boxIds,
}: MarkLabelsPrintedDialogProps) {
  const isMobile = useIsMobile()
  const [isPending, startTransition] = useTransition()

  const description = `${pluralize(boxIds.length, LABEL_WORDS)} will be marked as printed.`

  const handleMark = () => {
    startTransition(async () => {
      const result = await markLabelsPrintedAction(boxIds)

      if (result.success) {
        toast.success(
          `${pluralize(result.marked, LABEL_WORDS)} marked as printed`,
        )
      } else {
        toast.error(result.message)
      }
      setIsOpen(false)
    })
  }

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{TITLE}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose
              disabled={isPending}
              render={<Button variant="secondary" />}
            >
              Not now
            </DrawerClose>
            <Button onClick={handleMark} disabled={isPending}>
              {isPending ? 'Marking...' : 'Mark as printed'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{TITLE}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose
            disabled={isPending}
            render={<Button variant="secondary" />}
          >
            Not now
          </DialogClose>
          <Button onClick={handleMark} disabled={isPending}>
            {isPending ? 'Marking...' : 'Mark as printed'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
