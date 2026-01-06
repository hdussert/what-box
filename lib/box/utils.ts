import { boxes } from '@/db/schema'
import { asc, desc } from 'drizzle-orm'
import { BoxesSort } from './types'

export function toOrderBy(sort: BoxesSort | undefined) {
  switch (sort) {
    case 'createdAt_asc':
      return asc(boxes.createdAt)
    case 'name_asc':
      return asc(boxes.name)
    case 'name_desc':
      return desc(boxes.name)
    case 'createdAt_desc':
    default:
      return desc(boxes.createdAt)
  }
}

export function clampInt(
  value: unknown,
  fallback: number,
  min: number,
  max: number
) {
  const n = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(n)) return fallback
  return Math.min(max, Math.max(min, Math.trunc(n)))
}
