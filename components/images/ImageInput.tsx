import ImageInputClearButton from '@/components/images/ImageInputClearButton'
import ImageInputPreview from '@/components/images/ImageInputPreview'
import { FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  IMAGE_MIME_TYPES,
  MAX_IMAGE_SIZE,
  MAX_IMAGE_SIZE_READABLE,
} from '@/lib/image/const'
import { cn } from '@/lib/utils'
import { ImagePlus, LoaderCircle } from 'lucide-react'
import { InputHTMLAttributes, useRef, useState } from 'react'

type ImageInputProps = {
  label?: string
  description?: string
  image?: File
  /** Called when the user picks a valid file, or clears it (undefined). */
  onImageChange: (file?: File) => void
  isLoading?: boolean
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'ref' | 'onChange' | 'value'
>

const ImageInput = ({
  className,
  label,
  description,
  image,
  onImageChange,
  disabled,
  isLoading,
  ...props
}: ImageInputProps) => {
  const [error, setError] = useState<string>()
  const inputRef = useRef<HTMLInputElement>(null)

  const openInput = () => {
    inputRef.current?.click()
  }
  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
    }
    onImageChange(undefined)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    setError(undefined)
    if (!file) {
      onImageChange(undefined)
      return
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError(`File can not exceed ${MAX_IMAGE_SIZE_READABLE}`)
      return
    }

    onImageChange(file)
  }

  return image ? (
    <ImageInputPreview image={image} className={cn('relative', className)}>
      {isLoading ? (
        <div className="absolute inset-0 bg-secondary/80 flex items-center justify-center">
          <LoaderCircle size={48} className="animate-spin " />
        </div>
      ) : (
        <ImageInputClearButton
          disabled={disabled}
          onClear={clearInput}
          className="absolute inset-0 h-full opacity-0 hover:opacity-100"
        />
      )}
    </ImageInputPreview>
  ) : (
    <div className={cn('flex flex-col *:w-full', className)}>
      <Input
        {...props}
        ref={inputRef}
        onChange={handleChange}
        disabled={disabled}
        className="sr-only hidden"
        type="file"
        accept={IMAGE_MIME_TYPES.join(',')}
      />

      <div
        onClick={disabled ? undefined : openInput}
        className={cn(
          { 'cursor-pointer': !disabled },
          'flex flex-col justify-center items-center bg-input/30 rounded-md p-4 w-fit aspect-square relative',
        )}
      >
        <ImagePlus size={48} />
        <FieldLabel>{label}</FieldLabel>
        <FieldDescription>{description}</FieldDescription>
        <FieldError>{error}</FieldError>
      </div>
    </div>
  )
}

export default ImageInput
