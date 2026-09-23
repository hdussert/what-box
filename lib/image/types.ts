export type StoredImage = {
  url: string
  pathname: string
}

export type ImageOwner = {
  boxId: string
  itemId?: string | null
}

/** An upload that went through `prepareImage`: decoded, checked and stripped of metadata. */
export type PreparedImage = {
  name: string
  data: Buffer
  contentType: string
}

export type UploadImageData = ImageOwner & {
  image: PreparedImage
}
