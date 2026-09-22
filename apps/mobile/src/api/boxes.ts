import { apiFetch } from './client'

// The API returns the full box/item DB rows (see apps/web/app/api/boxes) -
// these types only declare the fields this app actually reads.
export type Item = {
  id: string
  name: string
  quantity: number
  imageUrl: string | null
}

export type Box = {
  id: string
  shortId: string | null
  name: string
  imageUrl: string | null
  items: Item[]
}

type BoxesResponse = {
  rows: Box[]
  total: number
}

export function fetchBoxes(search?: string) {
  const query = search ? `?search=${encodeURIComponent(search)}` : ''
  return apiFetch<BoxesResponse>(`/api/boxes${query}`)
}

export function fetchBoxById(boxId: string) {
  return apiFetch<Box>(`/api/boxes/${boxId}`)
}
