import { db } from '@/db'
import { Box, boxes } from '@/db/schema'
import { getCurrentUser } from '@/lib/user'
import { and, eq, inArray } from 'drizzle-orm'
import 'server-only'

// Create
export async function createBox(
  userId: string,
  name: string,
  shortId: string
): Promise<Box> {
  const [newBox] = await db
    .insert(boxes)
    .values({ name, userId, shortId })
    .returning()

  if (!newBox) throw new Error('Failed to create box')

  return newBox
}

export async function createUserBox(
  name: string,
  shortId: string
): Promise<Box> {
  const user = await getCurrentUser()
  return createBox(user.id, name, shortId)
}

// TODO : Update
// export async function updateBox(
//   userId: string,
//   boxId: string,
//   updates: BoxUpdate
// ): Promise<Box> {
//   const [updatedBox] = await db
//     .update(boxes)
//     .set(updates)
//     .where(and(eq(boxes.id, boxId), eq(boxes.userId, userId)))
//     .returning()

//   if (!updatedBox) throw new Error('Failed to update box')

//   return updatedBox
// }

// export async function updateUserBox(
//   boxId: string,
//   updates: BoxUpdate
// ): Promise<Box> {
//   const user = await getCurrentUser()
//   return updateBox(user.id, boxId, updates)
// }

// Delete
export async function deleteBoxes(
  userId: string,
  boxIds: string[]
): Promise<number> {
  const result = await db
    .delete(boxes)
    .where(and(inArray(boxes.id, boxIds), eq(boxes.userId, userId)))
    .returning({ id: boxes.id })

  return result.length
}

export async function deleteUserBoxes(boxIds: string[]): Promise<number> {
  const user = await getCurrentUser()
  return deleteBoxes(user.id, boxIds)
}
