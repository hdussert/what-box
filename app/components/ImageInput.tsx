import ImageThumbnail from '@/app/components/box/image/ImageThumbnail'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { IMAGE_MIME } from '@/lib/image/const'
import { ImagePlus, X } from 'lucide-react'
import {
  InputHTMLAttributes,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react'

type InputImageProps = {
  label: string
  description: string
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'ref'>

const ImageInput = ({ label, description, ...props }: InputImageProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>()
  const [files, setFiles] = useState<FileList | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)
  const openImagePicker = () => {
    inputRef.current?.click()
  }

  const clearSelection: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    setFiles(null)

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(undefined)
    }
  }

  useEffect(() => {
    if (!files || !files.length) {
      return
    }

    const url = URL.createObjectURL(files[0])
    setPreviewUrl(url)
    return () => {
      URL.revokeObjectURL(url)
    }
  }, [files])

  return (
    <Field className="size-64 mx-auto">
      <Input
        {...props}
        ref={inputRef}
        onChange={(e) => setFiles(e.target.files)}
        className="sr-only"
        type="file"
        accept={IMAGE_MIME.join(',')}
      />
      {previewUrl ? (
        <ImageThumbnail src={previewUrl} alt="box image" className="relative">
          <Button
            variant="secondary"
            size="icon-sm"
            className="absolute top-2 right-2"
            onClick={clearSelection}
          >
            <X />
          </Button>
        </ImageThumbnail>
      ) : (
        <div
          className="flex flex-col justify-center items-center bg-input/30 rounded-md p-4 w-fit border border-dashed cursor-pointer aspect-square"
          onClick={openImagePicker}
        >
          <ImagePlus size={64} />
          <FieldLabel className="justify-center">{label}</FieldLabel>
          <FieldDescription className="text-center">
            {description}
          </FieldDescription>
        </div>
      )}
    </Field>
  )
}

export default ImageInput
