'use client'

import { Input } from '@/components/ui/input'
import { useItemTableContext } from '../ItemTableProvider'

const ItemTableSearchInput = () => {
  const { search, onSearchChange } = useItemTableContext()

  return (
    <Input
      value={search}
      placeholder="Search items..."
      onChange={(e) => onSearchChange(e.target.value)}
      className="flex-1 sm:max-w-sm"
    />
  )
}

export default ItemTableSearchInput
