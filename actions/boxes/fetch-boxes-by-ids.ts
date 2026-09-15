'use server'

import { getBoxesByIds } from '@/lib/box'

export async function fetchBoxesByIds(ids: string[]) {
  return getBoxesByIds(ids)
}
