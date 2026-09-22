export type StoredImage = {
  url: string
  pathname: string
}

export type ImageOwner = {
  boxId: string
  itemId?: string | null
}

export type UploadImageData = ImageOwner & {
  image: File
}
