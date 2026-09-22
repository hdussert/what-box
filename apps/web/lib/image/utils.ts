export function buildImagePath({
  userId,
  boxId,
  itemId,
  imageName,
}: {
  userId: string
  boxId: string
  itemId: string | null
  imageName: string
}) {
  return `${userId}/${boxId}${itemId ? `/${itemId}` : ''}/${imageName}`
}
