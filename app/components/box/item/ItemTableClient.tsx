'use client'

import ItemTableData from '@/app/components/box/item/ItemTableData'
import { ItemTableProvider } from '@/app/components/box/item/ItemTableProvider'
import ItemTableToolbar from '@/app/components/box/item/ItemTableToolbar'
import { ItemsPaginated } from '@/lib/item/types'

type ItemTableClientProps = ItemsPaginated & {
  boxId: string
}

const ItemTableClient = ({ boxId, ...props }: ItemTableClientProps) => {
  return (
    <ItemTableProvider boxId={boxId} {...props}>
      <div className="space-y-4">
        <ItemTableToolbar />
        <ItemTableData />
      </div>
    </ItemTableProvider>
  )
}

export default ItemTableClient
