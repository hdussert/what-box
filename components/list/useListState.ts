'use client'

import { SortOption, SortValue } from '@/components/list/types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

export type ListStateOptions = {
  sortOptions: SortOption[]
  defaultSort: SortValue
}

export const useListState = ({
  sortOptions,
  defaultSort,
}: ListStateOptions) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  // Pending from the URL change until the server has rendered the new list
  const [isPending, startTransition] = useTransition()

  // Used as fields values
  const search = (searchParams.get('search') ?? '').trim()
  const sortParam = searchParams.get('sort')
  const sort =
    sortOptions.find((option) => option.value === sortParam)?.value ??
    defaultSort

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
    startTransition(() => {
      router.replace(url, { scroll: false })
    })
  }

  const setSort = (value: SortValue) => {
    const params = new URLSearchParams(searchParams)
    const sort = value === defaultSort ? null : value

    if (sort) {
      params.set('sort', sort)
    } else {
      params.delete('sort')
    }

    const query = params.toString()
    const url = query ? `${pathname}?${query}` : pathname
    startTransition(() => {
      router.replace(url, { scroll: false })
    })
  }

  return {
    search,
    setSearch,
    sort,
    setSort,
    sortOptions,
    isPending,
  }
}
