'use client'

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

export type SortOptions =
  | 'createdAt_desc'
  | 'createdAt_asc'
  | 'name_asc'
  | 'name_desc'

const SEARCH_DEBOUNCE_MS = 300

export default function BoxesTableToolbar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const urlSearch = searchParams.get('search') ?? ''
  const urlSort = (searchParams.get('sort') as SortOptions) ?? 'createdAt_desc'

  const [search, setSearch] = useState(urlSearch)

  // Keep local input in sync if user navigates back/forward or params change externally
  useEffect(() => {
    setSearch(urlSearch)
  }, [urlSearch])

  const nextUrlFor = useMemo(() => {
    return (patch: { search?: string; sort?: SortOptions }) => {
      const params = new URLSearchParams(searchParams.toString())

      if (patch.search !== undefined) {
        const trimmed = patch.search.trim()
        if (trimmed) params.set('search', trimmed)
        else params.delete('search')
        params.delete('page') // Reset to page 1 when search changes
      }

      if (patch.sort !== undefined) {
        params.set('sort', patch.sort)
        params.delete('page') // Reset to page 1 when sort changes
      }

      const query = params.toString()
      return query ? `${pathname}?${query}` : pathname
    }
  }, [pathname, searchParams])

  // Debounced URL update on typing
  useEffect(() => {
    const next = search.trim()
    if (next === urlSearch) return

    const id = window.setTimeout(() => {
      router.replace(nextUrlFor({ search }))
    }, SEARCH_DEBOUNCE_MS)

    return () => window.clearTimeout(id)
  }, [search, urlSearch, router, nextUrlFor])

  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
      <Input
        value={search}
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key !== 'Enter') return
          router.replace(nextUrlFor({ search }))
        }}
      />

      <Select
        value={urlSort}
        onValueChange={(value) =>
          router.replace(nextUrlFor({ sort: value as SortOptions }))
        }
      >
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="createdAt_desc">Newest first</SelectItem>
          <SelectItem value="createdAt_asc">Oldest first</SelectItem>
          <SelectItem value="name_asc">Name (A → Z)</SelectItem>
          <SelectItem value="name_desc">Name (Z → A)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
