import Typography from '@/components/ui/typography'
import { ImageOff } from 'lucide-react'

const EmptyImageGallery = () => {
  return (
    <div className="text-center py-12 text-muted-foreground">
      <ImageOff className="size-16 mb-4 mx-auto" />
      <Typography.H3 className="mb-2">No images yet.</Typography.H3>
      <Typography.P className="text-sm">Upload your first image</Typography.P>
    </div>
  )
}

export default EmptyImageGallery
