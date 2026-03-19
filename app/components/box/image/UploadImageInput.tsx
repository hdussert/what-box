import { useFilesUploadContext } from '@/app/components/box/image/FilesUploadContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ImagePlus } from 'lucide-react'
import { InputHTMLAttributes, useRef } from 'react'

type UploadImageInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'ref'
>

export const UploadImageInput = (props: UploadImageInputProps) => {
  const { addFilesToUpload } = useFilesUploadContext()

  const inputRef = useRef<HTMLInputElement>(null)

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get the selected files from the input event
    const files = e.target.files ? Array.from(e.target.files) : []
    if (!files.length) return

    // Add the selected files to the upload queue
    addFilesToUpload(files)
    props.onChange?.(e)

    // Clear the input value to allow selecting the same file again if needed
    if (inputRef.current) inputRef.current.value = ''
  }

  const openFilePicker = () => {
    inputRef.current?.click()
  }

  return (
    <div className="inline-block relative">
      <Input
        ref={inputRef}
        {...props}
        className="sr-only"
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp"
        onChange={onInputChange}
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
