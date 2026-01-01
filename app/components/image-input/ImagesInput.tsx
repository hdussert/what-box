import { useImagesInput } from '@/app/components/image-input/ImagesInputProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ImagePlus } from 'lucide-react'
import { InputHTMLAttributes } from 'react'

type ImagesInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'ref'
>

export const ImagesInput = (props: ImagesInputProps) => {
  const { fileInputRef: inputRef, onFilesSelected } = useImagesInput()

  const openPicker = () => {
    inputRef.current?.click()
  }

  return (
    <div className="inline-block">
      <Input
        ref={inputRef}
        {...props}
        className="sr-only" // Hidden visuallly
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp"
        onChange={(e) => {
          onFilesSelected(e)
          props.onChange?.(e)
        }}
      />
      <Button
        variant="outline"
        onClick={(e) => {
          e.preventDefault()
          openPicker()
        }}
      >
        <ImagePlus />
        Add images
      </Button>
    </div>
  )
}
