'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'

const ItemTableEmpty = () => {
  return (
    <Card className="text-center shadow-none">
      <CardHeader>No items found.</CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Start adding items to this box.
        </p>
      </CardContent>
    </Card>
  )
}

export default ItemTableEmpty
