'use client'

import Typography from '@/components/ui/typography'

const ItemTableEmpty = () => {
  return (
    <div className="text-center text-muted-foreground pt-12 pb-6">
      <Typography.H3 className="mb-2">No items found.</Typography.H3>
      <Typography.P className="text-sm">
        Start adding items to this box.
      </Typography.P>
    </div>
  )
}

export default ItemTableEmpty
