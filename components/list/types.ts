export type SortOrder = 'asc' | 'desc'
export type SortValue = `${string}_${SortOrder}`
export type SortOption = {
  label: string
  field: string
  direction: SortOrder
  value: SortValue
}
