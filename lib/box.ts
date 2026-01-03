import { db } from '@/db'
import { Box, boxes } from '@/db/schema'
import { getCurrentUser } from '@/lib/user'
import { and, desc, eq } from 'drizzle-orm'
import 'server-only'

// Create a new box
export async function createBox(userId: string, name: string): Promise<Box> {
  const result = await db.insert(boxes).values({ name, userId }).returning()

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

// Fetch boxes
export async function getBoxes(userId: string): Promise<Box[]> {
  return db.query.boxes.findMany({
    where: eq(boxes.userId, userId),
    orderBy: desc(boxes.createdAt),
  })
}

// Fetch a single box by ID
export async function getBoxById(
  userId: string,
  boxId: string
): Promise<Box | undefined> {
  return db.query.boxes.findFirst({
    where: and(eq(boxes.id, boxId), eq(boxes.userId, userId)), // keep single query helpers consistent
  })
}

export async function getBoxByShortId(
  userId: string,
  shortId: string
): Promise<Box | undefined> {
  return db.query.boxes.findFirst({
    where: and(eq(boxes.shortId, shortId), eq(boxes.userId, userId)), // keep single query helpers consistent
  })
}
export async function createUserBox(
  name: string,
  shortId: string
): Promise<Box> {
  const user = await getCurrentUser()
  return createBox(user.id, name, shortId)
}
export async function getUserBoxes(): Promise<Box[]> {
  const user = await getCurrentUser()
  return getBoxes(user.id)
}
export async function getUserBoxById(boxId: string): Promise<Box | undefined> {
  const user = await getCurrentUser()
  return getBoxById(user.id, boxId)
}

export async function getUserBoxByShortId(
  shortId: string
): Promise<Box | undefined> {
  const user = await getCurrentUser()
  return getBoxByShortId(user.id, shortId)
}
