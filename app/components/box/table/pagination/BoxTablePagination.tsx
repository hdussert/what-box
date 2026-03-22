'use client'

import { useBoxTableContext } from '@/app/components/box/table/BoxTableProvider'
import { Button } from '@/components/ui/button'
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

export const BoxTablePagination = () => {
  const {
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    goToLastPage,
    goToPage,
    page,
    totalPages,
  } = useBoxTableContext()

  const buttonProps = {
    variant: 'ghost' as const,
    size: 'sm' as const,
  }

  return (
    <div className="w-full flex items-center justify-between">
      <div className="text-xs text-muted-foreground">
        Page {page} of {totalPages}
      </div>
      <div className="flex items-center gap-2">
        <Button {...buttonProps} disabled={page <= 1} onClick={goToFirstPage}>
          <ChevronFirst />
        </Button>
        <Button
          {...buttonProps}
          disabled={page <= 1}
          onClick={goToPreviousPage}
        >
          <ChevronLeft />
        </Button>
        {page > 1 && (
          <Button {...buttonProps} onClick={() => goToPage(page - 1)}>
            {page - 1}
          </Button>
        )}
        <Button
          {...buttonProps}
          variant="outline"
          onClick={() => goToPage(page)}
        >
          {page}
        </Button>
        {page < totalPages && (
          <Button {...buttonProps} onClick={() => goToPage(page + 1)}>
            {page + 1}
          </Button>
        )}
        <Button
          {...buttonProps}
          disabled={page >= totalPages}
          onClick={goToNextPage}
        >
          <ChevronRight />
        </Button>
        <Button
          {...buttonProps}
          disabled={page >= totalPages}
          onClick={goToLastPage}
        >
          <ChevronLast />
        </Button>
      </div>
    </div>
  )
}

export default BoxTablePagination
