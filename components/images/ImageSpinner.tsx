import { LoaderCircle } from 'lucide-react'

/** A translucent spinner covering an image preview while it uploads. */
const ImageSpinner = () => (
  <div className="absolute inset-0 bg-secondary/80 flex items-center justify-center">
    <LoaderCircle size={48} className="animate-spin" />
  </div>
)

export default ImageSpinner
