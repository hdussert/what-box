import { db } from '@/db'
import { boxes } from '@/db/schema'
import { desc, eq } from 'drizzle-orm'
import 'server-only'

export async function createBox(
  userId: string,
  name: string,
  items?: string[]
) {
  try {
    const newBox = await db
      .insert(boxes)
      .values({ name, items: items || [], userId })
      .returning()

    if (newBox.length === 0) {
      throw new Error('Failed to create box')
    }

    return { id: newBox[0].id, name, items }
  } catch (error) {
    console.error('Error creating box:', error)
    return null
  }
}

export async function getBoxes(userId: string) {
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
