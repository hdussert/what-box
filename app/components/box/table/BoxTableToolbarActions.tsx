'use client'

import { deleteBoxesAndAssociatedDatas } from '@/app/actions/delete-boxes'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Printer, Trash2 } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { useBoxTableContext } from './BoxTableProvider'

const BoxTableToolbarActions = () => {
  const { selectedIds, setSelectedIds } = useBoxTableContext()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteBoxesAndAssociatedDatas(selectedIds)

      if (result.success) {
        toast.success(`${result.deleted} box(es) deleted`)
        setSelectedIds([])
        setShowDeleteDialog(false)
      } else {
        toast.error(result.message || 'Failed to delete boxes')
      }
    })
  }

  const handlePrint = () => {
    // TODO: Implement print labels
    console.log('Print labels:', selectedIds)
  }

  if (selectedIds.length === 0) return null

  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          {selectedIds.length} selected
        </span>
        <Button size="sm" variant="outline" onClick={handlePrint}>
          <Printer className="h-4 w-4" />
          <span className="ml-2 hidden sm:inline">Print</span>
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash2 className="h-4 w-4" />
          <span className="ml-2 hidden sm:inline">Delete</span>
        </Button>
      </div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {selectedIds.length} box(es)?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. All images and items in these boxes
              will also be deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default BoxTableToolbarActions
