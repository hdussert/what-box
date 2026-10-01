'use client'

import { useList } from '@/components/list/ListProvider'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { PackageOpen, SearchX } from 'lucide-react'

const ItemsListEmpty = () => {
  const { search } = useList()

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          {search ? <SearchX /> : <PackageOpen />}
        </EmptyMedia>
        <EmptyTitle>
          {search ? `No items match “${search}”.` : 'No items found.'}
        </EmptyTitle>
        <EmptyDescription>
          {search ? 'Try another name.' : 'Start adding items to this box.'}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

export default ItemsListEmpty
