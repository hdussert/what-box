'use client'

import ItemTableDeleteButton from '@/app/components/box/item/toolbar/ItemTableDeleteButton'
import ItemTableSearchInput from '@/app/components/box/item/toolbar/ItemTableSearchInput'

const ItemTableToolbar = () => {
  return (
    <div className="mb-2">
      <div className="flex gap-3 flex-row sm:items-center sm:justify-between">
        <ItemTableSearchInput />
        <ItemTableDeleteButton />
      </div>
    </div>
  )
}

export default ItemTableToolbar
