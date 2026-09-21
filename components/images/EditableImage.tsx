'use client'

import { addImageAction } from '@/actions/images/add-image'
import { deleteImageAction } from '@/actions/images/delete-image'
import ImageInput from '@/components/images/ImageInput'
import ImagePreview from '@/components/images/ImagePreview'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'

type EditableImageProps = {
  itemId?: string
  boxId: string
  imageUrl?: string | null
  isEditing?: boolean
  className?: string
  isInputDisabled?: boolean
}

const EditableImage = ({
  imageUrl,
  isEditing,
  isInputDisabled,
  itemId,
  boxId,
  className,
}: EditableImageProps) => {
  const [newImage, setNewImage] = useState<File>()
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleChange = () => {
    if (!newImage) {
      return
    }
    startTransition(async () => {
      const result = await addImageAction({
        image: newImage,
        itemId: itemId,
        boxId: boxId,
      })
      if (result.success) {
        toast.success('Image uploaded !')
        router.refresh()
      } else {
        toast.error('Could not upload the image.')
      }
    })
  }

  const deleteImage = () => {
    if (!imageUrl) {
      return
    }
    startTransition(async () => {
      const result = await deleteImageAction({ boxId, itemId })
      if (result.success) {
        setNewImage(undefined)
        toast.success('Image deleted !')
        router.refresh()
      } else {
        toast.error('Could not delete the image.')
      }
    })
  }

  useEffect(() => {
    handleChange()
  }, [newImage])

  return imageUrl ? (
    <ImagePreview src={imageUrl} alt="Image" className={className}>
      {isEditing ? (
        <Button
          type="button"
          variant="secondary"
          size="icon-sm"
          className="absolute top-2 right-2"
          disabled={isPending}
          onClick={deleteImage}
        >
          <Trash />
        </Button>
      ) : null}
    </ImagePreview>
  ) : (
    <ImageInput
      image={newImage}
      setImage={setNewImage}
      className={className}
      disabled={isInputDisabled || isPending}
      isLoading={isPending}
    />
  )
}

export default EditableImage
