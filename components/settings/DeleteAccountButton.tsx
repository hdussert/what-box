'use client'

import { useDialog } from '@/components/dialog/DialogProvider'
import { DeleteAccountDialog } from '@/components/settings/DeleteAccountDialog'
import { Button } from '@/components/ui/button'

const DeleteAccountButton = () => {
  const { openDialog } = useDialog()
  return (
    <Button
      variant="outlineDestructive"
      className="self-start"
      onClick={() => openDialog(DeleteAccountDialog, {})}
    >
      Delete account
    </Button>
  )
}

export default DeleteAccountButton
