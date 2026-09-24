import { cn } from '@/lib/utils'
import { LoaderCircle } from 'lucide-react'

type ImageSpinnerProps = {
  className?: string
}

/**
 * A spinner covering an image while it loads or uploads. Translucent by
 * default, to show the image underneath; pass a background to cover it.
 */
const ImageSpinner = ({ className }: ImageSpinnerProps) => (
  <div
    className={cn(
      'absolute inset-0 bg-secondary/80 flex items-center justify-center',
      className,
    )}
  >
    <LoaderCircle size={48} className="animate-spin" />
  </div>
)

export default ImageSpinner
