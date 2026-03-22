'use client'

import ItemTableToolbarActions from '@/app/components/box/item/ItemTableToolbarActions'
import ItemTableToolbarSearch from '@/app/components/box/item/ItemTableToolbarSearch'

const ItemTableToolbar = () => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <ItemTableToolbarSearch />
      <ItemTableToolbarActions />
    </div>
  )
}

export default ItemTableToolbar
