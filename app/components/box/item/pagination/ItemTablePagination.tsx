'use client'

import { useItemTableContext } from '@/app/components/box/item/ItemTableProvider'
import { Button } from '@/components/ui/button'
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

const ItemTablePagination = () => {
  const {
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    goToLastPage,
    gotToPage,
    page,
    totalPages,
  } = useItemTableContext()

  const buttonProps = {
    variant: 'ghost' as const,
    size: 'sm' as const,
  }

  return (
    <div className="w-full flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
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
          <Button {...buttonProps} onClick={() => gotToPage(page - 1)}>
            {page - 1}
          </Button>
        )}
        <Button
          {...buttonProps}
          variant="outline"
          onClick={() => gotToPage(page)}
        >
          {page}
        </Button>
        {page < totalPages && (
          <Button {...buttonProps} onClick={() => gotToPage(page + 1)}>
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

export default ItemTablePagination
