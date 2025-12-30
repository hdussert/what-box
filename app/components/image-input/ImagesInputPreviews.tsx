import { useImagesInput } from '@/app/components/image-input/ImagesInputProvider'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Image from 'next/image'

const ImagePreview = ({
  preview,
  index,
}: {
  preview: string
  index: number
}) => {
  const { clear } = useImagesInput()
  return (
    <div className="relative h-32 w-32 mt-2">
      <Button
        className="absolute top-[-4] right-[-4] rounded-full"
        variant="destructive"
        size="icon-sm"
        onClick={(e) => {
          e.preventDefault()
          clear(index)
        }}
      >
        <X size={12} />
      </Button>
      <Image
        src={preview}
        width={128}
        height={128}
        alt={`Preview ${index + 1}`}
        className="border-2 rounded h-full w-full object-cover"
      />
    </div>
  )
}

export const ImagesPreviews = () => {
  const { previews } = useImagesInput()
  return (
    <div className="mt-4 flex gap-4 overflow-x-auto">
      {previews.map((preview, index) => (
        <ImagePreview key={index} preview={preview} index={index} />
      ))}
    </div>
  )
}
