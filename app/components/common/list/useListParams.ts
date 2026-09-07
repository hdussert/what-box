'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export type SortOrder = 'asc' | 'desc'
export type SortValue = `${string}_${SortOrder}`
export type SortOption = {
  label: string
  field: string
  direction: SortOrder
  value: SortValue
}

export type UseListParamsProps = {
  sortOptions: SortOption[]
  defaultSortOption: SortValue
}

export const useListParams = ({
  sortOptions,
  defaultSortOption,
}: UseListParamsProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Used as fields values
  const search = searchParams.get('search') ?? ''
  const sortParam = searchParams.get('sort')
  const sort =
    sortOptions.find((option) => option.value === sortParam)?.value ??
    defaultSortOption

  const setSearch = (value: string) => {
    const params = new URLSearchParams(searchParams)

    const search = value.trim() || null
    if (search) {
      params.set('search', search)
    } else {
      params.delete('search')
    }

    const query = params.toString()
    const url = query ? `${pathname}?${query}` : pathname
    router.replace(url)
  }

  const setSort = (value: SortValue) => {
    const params = new URLSearchParams(searchParams)
    const sort = value === defaultSortOption ? null : value

    if (sort) {
      params.set('sort', sort)
    } else {
      params.delete('sort')
    }

    const query = params.toString()
    const url = query ? `${pathname}?${query}` : pathname
    router.replace(url)
  }

  return {
    search,
    setSearch,
    sort,
    setSort,
    sortOptions,
  }
}
