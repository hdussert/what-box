'use client'

import { addImageAction } from '@/actions/images/add-image'
import { deleteImagesAction } from '@/actions/images/delete-images'
import ImageInput from '@/components/images/ImageInput'
import ImagePreview from '@/components/images/ImagePreview'
import { Button } from '@/components/ui/button'
import { ImageRecord } from '@/db/schema'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'

type EditableImageProps = {
  itemId?: string
  boxId: string
  image?: ImageRecord
  isEditing?: boolean
  className?: string
  isInputDisabled?: boolean
}

const EditableImage = ({
  image,
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
    if (!image) {
      return
    }
    startTransition(async () => {
      const result = await deleteImagesAction([image.pathname])
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

  return image ? (
    <ImagePreview src={image.url} alt="Image" className={className}>
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
