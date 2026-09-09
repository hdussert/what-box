'use client'

import ItemsList from '@/app/components/item/ItemsList'
import ItemsToolbar from '@/app/components/item/ItemTableToolbar'
import NewItemForm from '@/app/components/item/NewItemForm'
import NoItems from '@/app/components/item/NoItems'

import { useIsMobile } from '@/hooks/use-mobile'
import { ItemsPaginated } from '@/lib/item/types'

type ItemsProps = ItemsPaginated & {
  boxId: string
}

const Items = (props: ItemsProps) => {
  const { total, items, boxId } = props
  const isMobile = useIsMobile()

  const isEmpty = total === 0

  return (
    <div className="space-y-2">
      <NewItemForm boxId={boxId} />
      <ItemsToolbar />
      {isEmpty ? <NoItems /> : <ItemsList items={items} />}
    </div>
  )
}

export default Items
