import { Button } from '@/components/ui/button'

type ImageInputClearButtonProps = {
  disabled?: boolean
  clearInput: () => void
  className?: string
}

const ImageInputClearButton = ({
  disabled,
  clearInput,
  className,
}: ImageInputClearButtonProps) => {
  return (
    <Button
      type="button"
      variant="secondary"
      className={className}
      disabled={disabled}
      onClick={clearInput}
    >
      Remove this image
    </Button>
  )
}

export default ImageInputClearButton
