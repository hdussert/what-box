'use client'

import { BoxesDeleteDialog } from '@/app/components/box/table/dialog/BoxesDeleteDialog'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'

const BoxesDeleteButton = () => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setShowDeleteDialog(true)}
      >
        <Trash2 />
      </Button>
      <BoxesDeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      />
    </>
  )
}

export default BoxesDeleteButton
