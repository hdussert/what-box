import { db } from '@/db'
import { Box, boxes } from '@/db/schema'
import { UpdateBoxData } from '@/lib/box/types'
import { getCurrentUser } from '@/lib/user'
import { and, eq, inArray } from 'drizzle-orm'
import 'server-only'

export async function createBox(name: string, shortId: string): Promise<Box> {
  const user = await getCurrentUser()
  const [newBox] = await db
    .insert(boxes)
    .values({ userId: user.id, name, shortId })
    .returning()

  if (!newBox) throw new Error('Failed to create box')

  return newBox
}

export async function updateBox({ id, ...data }: UpdateBoxData): Promise<Box> {
  const user = await getCurrentUser()
  const [updatedBox] = await db
    .update(boxes)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(boxes.userId, user.id), eq(boxes.id, id)))
    .returning()

  if (!updatedBox) {
    throw new Error('Failed to update the box')
  }

  return updatedBox
}

export async function deleteBoxes(boxIds: string[]): Promise<number> {
  const user = await getCurrentUser()
  const result = await db
    .delete(boxes)
    .where(and(inArray(boxes.id, boxIds), eq(boxes.userId, user.id)))
    .returning({ id: boxes.id })

  return result.length
}
