'use client'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Search } from 'lucide-react'
import { useBoxTableContext } from '../BoxTableProvider'

const BoxTableSearchInput = () => {
  const { search, onSearchChange } = useBoxTableContext()

  return (
    <InputGroup>
      <InputGroupInput
        value={search}
        placeholder="Search a box or an item..."
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  )
}

export default BoxTableSearchInput
