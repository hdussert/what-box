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
  /** Random file name with the real format's extension, e.g. `3f2a….jpg` */
  name: string
  data: Buffer
  contentType: string
}

export type UploadImageData = ImageOwner & {
  image: PreparedImage
}
