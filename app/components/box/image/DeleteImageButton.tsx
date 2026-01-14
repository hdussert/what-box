'use client'

import { deleteImages } from '@/app/actions/delete-images'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

type DeleteImageButtonProps = {
  imageId: string
}

const DeleteImageButton = ({ imageId }: DeleteImageButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    const response = await deleteImages([imageId])
    if (response.success) {
      toast.success('Image deleted successfully')
    } else {
      toast.error(response.message || 'Failed to delete image')
    }
    setIsDeleting(false)
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="secondary"
          size="icon-sm"
          disabled={isDeleting}
          onClick={handleDelete}
          className="top-1 right-1 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        >
          <Trash />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Delete Image</TooltipContent>
    </Tooltip>
  )
}

export default DeleteImageButton
