'use server'

import { getBoxesByIds } from '@/lib/box'

export async function getBoxesForLabels(ids: string[]) {
  return getBoxesByIds(ids)
}
