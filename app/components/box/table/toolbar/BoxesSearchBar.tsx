'use client'

import { Button } from '@/components/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Search, X } from 'lucide-react'
import { useBoxesContext } from '../BoxesContext'

const BoxesSearchBar = () => {
  const { search, onSearchChange } = useBoxesContext()
  const isSearching = search !== ''
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
      {isSearching ? (
        <InputGroupAddon align="inline-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onSearchChange('')}
          >
            <X />
          </Button>
        </InputGroupAddon>
      ) : null}
    </InputGroup>
  )
}

export default BoxesSearchBar
