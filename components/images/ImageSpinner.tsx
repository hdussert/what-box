import { Spinner } from '@/components/ui/spinner'

/** A translucent spinner covering an image preview while it uploads. */
const ImageSpinner = () => (
  <div className="absolute inset-0 bg-secondary/80 flex items-center justify-center">
    <Spinner className="size-12" />
  </div>
)

export default ImageSpinner
