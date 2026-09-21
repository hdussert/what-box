import ImageInputClearButton from '@/components/images/ImageInputClearButton'
import ImageInputPreview from '@/components/images/ImageInputPreview'
import { FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { IMAGE_MIME } from '@/lib/image/const'
import { cn } from '@/lib/utils'
import { ImagePlus, LoaderCircle } from 'lucide-react'
import { InputHTMLAttributes, useRef, useState } from 'react'

type ImageInputProps = {
  label?: string
  description?: string
  image?: File
  setImage: (file?: File) => void
  loading?: boolean
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'ref' | 'onChange' | 'value'
>

const MAX_IMAGE_SIZE = 4.9 * 1000 * 1000
const MAX_IMAGE_SIZE_READABLE = '4.9MB'

const ImageInput = ({
  className,
  label,
  description,
  image,
  setImage,
  disabled,
  loading,
  ...props
}: ImageInputProps) => {
  const [error, setError] = useState<string>()
  const inputRef = useRef<HTMLInputElement>(null)

  const openInput = (event: React.MouseEvent<HTMLElement>) => {
    inputRef.current?.click()
  }
  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
    }
    setImage(undefined)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    setError(undefined)
    if (!file) {
      setImage(undefined)
      return
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError(`File can not exceed ${MAX_IMAGE_SIZE_READABLE}`)
      return
    }

    setImage(file)
  }

  return image ? (
    <ImageInputPreview image={image} className={cn('relative', className)}>
      {loading ? (
        <div className="absolute inset-0 bg-secondary/80 flex items-center justify-center">
          <LoaderCircle size={48} className="animate-spin " />
        </div>
      ) : (
        <ImageInputClearButton
          disabled={disabled}
          clearInput={clearInput}
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
        className="sr-only"
        type="file"
        accept={IMAGE_MIME.join(',')}
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
