/** Where all of a user's image files are stored. */
export function userImagePrefix(userId: string) {
  return `${userId}/`
}

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
  return `${userImagePrefix(userId)}${boxId}${itemId ? `/${itemId}` : ''}/${imageName}`
}
