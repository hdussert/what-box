'use client'

import { Button } from '@/components/ui/button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

type Props = {
  page: number
  totalPages: number
}

export default function BoxesTablePagination({ page, totalPages }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const nextUrlFor = useMemo(() => {
    return (nextPage: number) => {
      const params = new URLSearchParams(searchParams.toString())
      if (nextPage <= 1) params.delete('page')
      else params.set('page', String(nextPage))

      const query = params.toString()
      return query ? `${pathname}?${query}` : pathname
    }
  }, [pathname, searchParams])

  return (
    <div className="mt-4 flex items-center justify-between gap-2">
      <div className="text-sm text-muted-foreground">
        Page {page} / {totalPages}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => router.replace(nextUrlFor(page - 1))}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => router.replace(nextUrlFor(page + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
