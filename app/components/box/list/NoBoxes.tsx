'use client'

import NewBoxModal from '@/app/components/box/new/NewBoxModal'
import Typography from '@/components/ui/typography'

const NoBoxes = () => {
  return (
    <div className="text-center pt-12 pb-6 text-muted-foreground">
      <Typography.H3 className="mb-2">No boxes found.</Typography.H3>
      <Typography.P className="text-sm mb-4">
        Create your first box and start organizing your items
      </Typography.P>
      <NewBoxModal />
    </div>
  )
}

export default NoBoxes
