import ItemsList from '@/app/components/item/ItemsList'
import ItemsToolbar from '@/app/components/item/ItemTableToolbar'
import NoItems from '@/app/components/item/NoItems'

import { ItemsPaginated } from '@/lib/item/types'

type ItemsProps = ItemsPaginated & {
  boxId: string
}

const Items = (props: ItemsProps) => {
  const { total, items, boxId } = props
  const isEmpty = total === 0

  return (
    <div>
      <ItemsToolbar boxId={boxId} />
      {isEmpty ? <NoItems /> : <ItemsList items={items} />}
    </div>
  )
}

export default Items
