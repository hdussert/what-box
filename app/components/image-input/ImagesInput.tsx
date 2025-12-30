import { useImagesInput } from '@/app/components/image-input/ImagesInputProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InputHTMLAttributes } from 'react'

type ImagesInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'ref'
>

export const ImagesInput = (props: ImagesInputProps) => {
  const { inputRef, handleImagesChange } = useImagesInput()

  const openPicker = () => {
    inputRef.current?.click()
  }

  return (
    <div>
      <Input
        ref={inputRef}
        {...props}
        className="sr-only" // Hidden visuallly
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp"
        onChange={(e) => {
          handleImagesChange(e)
          props.onChange?.(e)
        }}
      />
      <Button
        onClick={(e) => {
          e.preventDefault()
          openPicker()
        }}
      >
        Add images
      </Button>
    </div>
  )
}
