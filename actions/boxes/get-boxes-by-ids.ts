'use server'

import { getBoxesByIds } from '@/lib/box'

export async function getBoxesByIdsAction(ids: string[]) {
  return getBoxesByIds(ids)
}
