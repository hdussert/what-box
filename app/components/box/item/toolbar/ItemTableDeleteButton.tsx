'use client'

import { DeleteItemsDialog } from '@/app/components/box/item/dialog/DeleteItemsDialog'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useItemTableContext } from '../ItemTableProvider'

const ItemTableDeleteButton = () => {
  const { selectedIds } = useItemTableContext()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  return (
    <>
      <Button
        size="sm"
        variant="outlineDestructive"
        disabled={selectedIds.length === 0}
        onClick={() => setShowDeleteDialog(true)}
      >
        <Trash2 />
      </Button>
      <DeleteItemsDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      />
    </>
  )
}

export default ItemTableDeleteButton
