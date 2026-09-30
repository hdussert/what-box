'use client'

import UpdateBoxForm from '@/components/boxes/UpdateBoxForm'
import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'
import { Box } from '@/db/schema'
import { Pen } from 'lucide-react'
import { useCallback, useState } from 'react'

type BoxNameProps = {
  box: Pick<Box, 'id' | 'name'>
}

const BoxName = ({ box }: BoxNameProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = useCallback(() => setIsEditing(true), [])
  const handleStopEditing = useCallback(() => setIsEditing(false), [])

  if (isEditing) {
    return (
      <UpdateBoxForm
        box={box}
        onCancel={handleStopEditing}
        onSuccess={handleStopEditing}
      />
    )
  }

  return (
    <div className="flex min-h-9 items-center gap-1">
      <Typography.H2 className="min-w-0 text-xl uppercase wrap-break-word leading-[normal] sm:text-2xl">
        {box.name}
      </Typography.H2>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Edit name"
        onClick={handleEdit}
      >
        <Pen />
      </Button>
    </div>
  )
}

export default BoxName
