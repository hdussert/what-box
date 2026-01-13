'use client'

import ImageGallery from '@/app/components/box/image/ImageGallery'
import { ImageUploadButton } from '@/app/components/box/image/ImageUploadButton'
import ImageUploadProvider from '@/app/components/box/image/ImageUploadProvider'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Typography from '@/components/ui/typography'
import { Image } from '@/db/schema'

type BoxImagesClientProps = {
  boxId: string
  images: Image[]
}

const BoxImagesClient = ({ boxId, images }: BoxImagesClientProps) => {
  return (
    <ImageUploadProvider boxId={boxId}>
      <Card>
        <CardHeader>
          <div className="flex flex-row items-center justify-between">
            <Typography.H2>Photos</Typography.H2>
            <ImageUploadButton multiple />
          </div>
        </CardHeader>
        <CardContent className="flex items-center">
          <ImageGallery images={images} />
        </CardContent>
      </Card>
    </ImageUploadProvider>
  )
}

export default BoxImagesClient
