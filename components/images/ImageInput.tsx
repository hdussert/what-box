import ImageThumbnail from '@/components/images/ImageThumbnail'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { IMAGE_MIME } from '@/lib/image/const'
import { cn } from '@/lib/utils'
import { Plus, X } from 'lucide-react'
import { InputHTMLAttributes, useEffect, useRef, useState } from 'react'

type InputImageProps = {
  label: string
  description: string
  value?: File
  onChange: (file?: File) => void
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'ref' | 'onChange' | 'value'
>

const ImageInput = ({
  label,
  description,
  value,
  onChange,
  className,
  ...props
}: InputImageProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>()
  const [error, setError] = useState<string>()
  const inputRef = useRef<HTMLInputElement>(null)

  const openImagePicker = () => {
    inputRef.current?.click()
  }

  useEffect(() => {
    if (!value) {
      setPreviewUrl(undefined)
      if (inputRef.current) {
        inputRef.current.value = ''
      }
      return
    }

    // Check size
    setError(undefined)
    if (value.size > 1000 * 1000 * 4.9) {
      setError('File can not exceed 4.9MB')
      onChange(undefined)
      return
    }

    const url = URL.createObjectURL(value)
    setPreviewUrl(url)

    return () => URL.revokeObjectURL(url)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.files?.[0])
  }

  const clearSelection = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
    }

    onChange(undefined)
  }
  return previewUrl ? (
    <ImageThumbnail
      src={previewUrl}
      alt="box image"
      className="relative size-24 shrink-0"
    >
      <Button
        type="button"
        variant="secondary"
        size="icon-sm"
        className="absolute top-2 right-2"
        onClick={clearSelection}
      >
        <X />
      </Button>
    </ImageThumbnail>
  ) : (
    <Field className={cn('size-24', className)}>
      <Input
        {...props}
        ref={inputRef}
        onChange={handleChange}
        className="sr-only"
        type="file"

        accept={IMAGE_MIME.join(',')}
      />

      <div
        className="flex flex-col justify-center items-center bg-input/30 rounded-md p-4 w-fit border border-dashed cursor-pointer aspect-square"
        onClick={openImagePicker}
      >
        <Plus />
        <FieldLabel className="justify-center">{label}</FieldLabel>
        <FieldDescription className="text-center">
          {description}
        </FieldDescription>
        <FieldError>{error}</FieldError>
      </div>
    </Field>
  )
}

export default ImageInput
