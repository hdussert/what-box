import { ImageOff } from 'lucide-react'

const EmptyImageGallery = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
      <ImageOff className="size-16 mb-4" />
      <h3 className="text-lg font-semibold mb-2">No images yet</h3>
      <p className="text-sm">Upload your first image to get started</p>
    </div>
  )
}

export default EmptyImageGallery
