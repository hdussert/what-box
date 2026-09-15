'use client'

import { SortOption, SortValue } from '@/components/list/types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export type ListParamsProps = {
  sortOptions: SortOption[]
  defaultSortOption: SortValue
}

export const useListParams = ({
  sortOptions,
  defaultSortOption,
}: ListParamsProps) => {
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
    router.replace(url, { scroll: false })
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
    router.replace(url, { scroll: false })
  }

  return {
    search,
    setSearch,
    sort,
    setSort,
    sortOptions,
  }
}
