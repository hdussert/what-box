'use client'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Search } from 'lucide-react'
import { useItemTableContext } from '../ItemTableProvider'

const ItemTableSearchInput = () => {
  const { search, onSearchChange } = useItemTableContext()

  return (
    <InputGroup>
      <InputGroupInput
        value={search}
        placeholder="Search an item..."
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  )
}

export default ItemTableSearchInput
