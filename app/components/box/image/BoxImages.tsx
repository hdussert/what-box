'use client'

import FilesUploadProvider from '@/app/components/box/image/FilesUploadContext'
import ImageGallery from '@/app/components/box/image/ImageGallery'
import { UploadImageInput } from '@/app/components/box/image/UploadImageInput'
import { Card, CardContent } from '@/components/ui/card'
import Typography from '@/components/ui/typography'
import { Image } from '@/db/schema'

type BoxImagesProps = {
  boxId: string
  images: Image[]
}

const BoxImages = ({ boxId, images }: BoxImagesProps) => {
  return (
    <FilesUploadProvider boxId={boxId}>
      <div className="flex flex-row items-center justify-between mb-4 mx-2">
        <Typography.H2>Images</Typography.H2>
        <UploadImageInput multiple />
      </div>
      <Card>
        <CardContent className="flex items-center">
          <ImageGallery images={images} />
        </CardContent>
      </Card>
    </FilesUploadProvider>
  )
}

export default BoxImages
