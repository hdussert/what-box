'use client'

import ItemTableDeleteButton from '@/app/components/box/item/toolbar/ItemTableDeleteButton'
import ItemTableSearchInput from '@/app/components/box/item/toolbar/ItemTableSearchInput'

const ItemTableToolbar = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ItemTableSearchInput />
        <ItemTableDeleteButton />
      </div>
    </div>
  )
}

export default ItemTableToolbar
