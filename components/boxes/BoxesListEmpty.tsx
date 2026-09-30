'use client'

import { useList } from '@/components/list/ListProvider'
import Typography from '@/components/ui/typography'

const BoxesListEmpty = () => {
  const { search } = useList()

  return (
    <div className="text-center pt-12 pb-6 text-muted-foreground">
      <Typography.H3 className="mb-2">
        {search ? `No boxes match “${search}”.` : 'No boxes found.'}
      </Typography.H3>
      <Typography.P className="text-sm mb-4">
        {search
          ? 'Try a box name, its ID or an item inside it.'
          : 'Create your first box and start organizing your items'}
      </Typography.P>
    </div>
  )
}

export default BoxesListEmpty
