'use client'

import { useList } from '@/components/list/ListProvider'
import Typography from '@/components/ui/typography'

const ItemsListEmpty = () => {
  const { search } = useList()

  return (
    <div className="text-center text-muted-foreground pt-12 pb-6">
      <Typography.H3 className="mb-2">
        {search ? `No items match “${search}”.` : 'No items found.'}
      </Typography.H3>
      <Typography.P className="text-sm">
        {search ? 'Try another name.' : 'Start adding items to this box.'}
      </Typography.P>
    </div>
  )
}

export default ItemsListEmpty
