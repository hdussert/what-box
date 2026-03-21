'use client'

import { useBoxTableContext } from '@/app/components/box/table/BoxTableProvider'
import { Button } from '@/components/ui/button'

export const BoxTablePagination = () => {
  const {
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    goToLastPage,
    page,
    totalPages,
  } = useBoxTableContext()

  const buttonProps = {
    variant: 'ghost' as const,
    size: 'sm' as const,
  }

  return (
    <div className="w-full flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Page {page} / {totalPages}
      </div>
      <div className="flex items-center gap-2">
        <Button {...buttonProps} disabled={page <= 1} onClick={goToFirstPage}>
          First
        </Button>
        <Button
          {...buttonProps}
          disabled={page <= 1}
          onClick={goToPreviousPage}
        >
          Previous
        </Button>
        <Button
          {...buttonProps}
          disabled={page >= totalPages}
          onClick={goToNextPage}
        >
          Next
        </Button>
        <Button
          {...buttonProps}
          disabled={page >= totalPages}
          onClick={goToLastPage}
        >
          Last
        </Button>
      </div>
    </div>
  )
}

export default BoxTablePagination
