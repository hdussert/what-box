'use client'

import { Input } from '@/components/ui/input'
import { useItemTableContext } from './ItemTableProvider'

const ItemTableToolbarSearch = () => {
  const { search, onSearchChange } = useItemTableContext()

  return (
    <Input
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Search items..."
      className="flex-1 sm:max-w-sm"
    />
  )
}

export default ItemTableToolbarSearch
