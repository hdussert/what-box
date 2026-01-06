// TODO : Update
// export type BoxUpdate = Partial<Omit<Box, 'id' | 'userId' | 'createdAt'>>

export type BoxesSort =
  | 'createdAt_desc'
  | 'createdAt_asc'
  | 'name_asc'
  | 'name_desc'

export type BoxesQuery = {
  search?: string
  sort?: BoxesSort
  page?: number
  pageSize?: number
}

export type Paginated<T> = {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
