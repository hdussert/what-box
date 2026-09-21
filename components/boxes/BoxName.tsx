'use client'

import UpdateBoxForm from '@/components/boxes/update/UpdateBoxForm'
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
    <div className="flex min-h-9 items-center justify-center px-12">
      <div className="relative min-w-24 px-3">
        <Typography.H2 className="uppercase break-words leading-[normal]">
          {box.name}
        </Typography.H2>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Edit name"
          className="absolute top-1/2 left-full ml-1 -translate-y-1/2"
          onClick={handleEdit}
        >
          <Pen />
        </Button>
      </div>
    </div>
  )
}

export default BoxName
