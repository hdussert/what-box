import { FileUploadActorRef } from '@/app/components/box/image/machines/_file-upload-machine'

// Child machine status utils
export function isUploading(actor: FileUploadActorRef) {
  return actor.getSnapshot().matches('uploading')
}

export function isStartable(actor: FileUploadActorRef) {
  const snapshot = actor.getSnapshot()
  return snapshot.matches('idle')
}
