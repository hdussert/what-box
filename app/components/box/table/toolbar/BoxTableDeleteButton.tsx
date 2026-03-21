'use client'

import { DeleteBoxesDialog } from '@/app/components/box/table/dialog/DeleteBoxesDialog'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useBoxTableContext } from '../BoxTableProvider'

const BoxTableDeleteButton = () => {
  const { selectedIds } = useBoxTableContext()
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
      <DeleteBoxesDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      />
    </>
  )
}

export default BoxTableDeleteButton
