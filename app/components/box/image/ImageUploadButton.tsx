import { useImageUpload } from '@/app/components/box/image/ImageUploadProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ImagePlus } from 'lucide-react'
import { InputHTMLAttributes } from 'react'

type ImageUploadButtonProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'ref'
>

export const ImageUploadButton = (props: ImageUploadButtonProps) => {
  const { fileInputRef, handleFilesSelected } = useImageUpload()

  const openFilePicker = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="inline-block relative">
      <Input
        ref={fileInputRef}
        {...props}
        className="sr-only"
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp"
        onChange={(e) => {
          handleFilesSelected(e)
          props.onChange?.(e)
        }}
      />
      <Button
        variant="outline"
        size="sm"
        onClick={(e) => {
          e.preventDefault()
          openFilePicker()
        }}
      >
        <ImagePlus />
        Add images
      </Button>
    </div>
  )
}
