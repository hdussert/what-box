import { markLabelsPrintedAction } from '@/actions/boxes/mark-labels-printed'
import { DialogBaseProps } from '@/components/dialog/DialogProvider'
import {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from '@/components/dialog/ResponsiveDialog'
import { Button } from '@/components/ui/button'
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

  return (
    <ResponsiveDialog open={isOpen} onOpenChange={setIsOpen}>
      <ResponsiveDialogContent>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>{TITLE}</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            {description}
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <ResponsiveDialogFooter>
          <ResponsiveDialogClose
            disabled={isPending}
            render={<Button variant="secondary" />}
          >
            Not now
          </ResponsiveDialogClose>
          <Button onClick={handleMark} disabled={isPending}>
            {isPending ? 'Marking...' : 'Mark as printed'}
          </Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  )
}
