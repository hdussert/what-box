'use client'

import { useList } from '@/components/list/ListProvider'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { Package, SearchX } from 'lucide-react'

const BoxesListEmpty = () => {
  const { search } = useList()

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          {search ? <SearchX /> : <Package />}
        </EmptyMedia>
        <EmptyTitle>
          {search ? `No boxes match “${search}”.` : 'No boxes found.'}
        </EmptyTitle>
        <EmptyDescription>
          {search
            ? 'Try a box name, its ID or an item inside it.'
            : 'Create your first box and start organizing your items'}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

export default BoxesListEmpty
