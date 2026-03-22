'use client'

import { deleteItemsAction } from '@/app/actions/item-actions'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Trash2 } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { useItemTableContext } from './ItemTableProvider'

const ItemTableToolbarActions = () => {
  const { selectedIds, setSelectedIds, boxId } = useItemTableContext()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteItemsAction(boxId, selectedIds)
      if (result.success) {
        toast.success(`${result.deleted} item(s) deleted`)
        setSelectedIds([])
        setShowDeleteDialog(false)
      } else {
        toast.error(result.error || 'Failed to delete')
      }
    })
  }

  if (selectedIds.length === 0) return null

  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          {selectedIds.length} selected
        </span>
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
            <DialogTitle>Delete {selectedIds.length} item(s)?</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
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

export default ItemTableToolbarActions
