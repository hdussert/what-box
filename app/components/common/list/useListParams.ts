'use client'

import { SortOption, SortValue } from '@/lib/box'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type UseListParamsProps<TSort extends string> = {
  sortOptions: SortOption<TSort>[]
  defaultSortOption: SortValue<TSort>
}

export const useListParams = <TSort extends string>({
  sortOptions,
  defaultSortOption,
}: UseListParamsProps<TSort>) => {
  const router = useRouter()
  const pathname = usePathname()

  const searchParams = useSearchParams()
  const search = searchParams.get('search') ?? ''
  const sort = searchParams.get('sort') ?? defaultSortOption

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

  const setSort = (value: SortValue<TSort>) => {
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
