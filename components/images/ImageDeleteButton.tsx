'use client'

import { deleteImages } from '@/actions/images/delete-images'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

type DeleteImageButtonProps = {
  pathname: string
}

const ImageDeleteButton = ({ pathname }: DeleteImageButtonProps) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleDelete = () => {
    startTransition(async () => {
      const response = await deleteImages([pathname])
      if (response.success) {
        toast.success('Image deleted successfully')
        router.refresh()
      } else {
        toast.error(response.message || 'Failed to delete image')
      }
    })
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="secondary"
          size="icon-sm"
          disabled={isPending}
          onClick={handleDelete}
          className="z-10 top-1 right-1 absolute"
        >
          <Trash />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Delete Image</TooltipContent>
    </Tooltip>
  )
}

export default ImageDeleteButton
