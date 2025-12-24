import { db } from '@/db'
import { Box, boxes } from '@/db/schema'
import { desc, eq } from 'drizzle-orm'
import 'server-only'

export async function createBox(userId: string, name: string) {
  try {
    const newBox = await db.insert(boxes).values({ name, userId }).returning()

    if (newBox.length === 0) {
      throw new Error('Failed to create box')
    }

    return { id: newBox[0].id, name }
  } catch (error) {
    console.error('Error creating box:', error)
    return null
  }
}

export async function getBoxes(userId: string): Promise<Array<Box>> {
  try {
    const userBoxes = await db.query.boxes.findMany({
      where: eq(boxes.userId, userId),
      orderBy: desc(boxes.createdAt),
    })
    return userBoxes
  } catch (error) {
    console.error('Error fetching boxes:', error)
    return []
  }
}
