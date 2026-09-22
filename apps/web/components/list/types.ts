export type SortDirection = 'asc' | 'desc'
export type SortValue = `${string}_${SortDirection}`
export type SortOption = {
  label: string
  field: string
  direction: SortDirection
  value: SortValue
}
