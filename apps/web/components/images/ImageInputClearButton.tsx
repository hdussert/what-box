import { Button } from '@/components/ui/button'

type ImageInputClearButtonProps = {
  disabled?: boolean
  onClear: () => void
  className?: string
}

const ImageInputClearButton = ({
  disabled,
  onClear,
  className,
}: ImageInputClearButtonProps) => {
  return (
    <Button
      type="button"
      variant="secondary"
      className={className}
      disabled={disabled}
      onClick={onClear}
    >
      Remove this image
    </Button>
  )
}

export default ImageInputClearButton
