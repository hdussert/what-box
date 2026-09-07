'use client'

import { useListParamsContext } from '@/app/components/common/list/ListParamsContext'
import { Button } from '@/components/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const DEBOUNCE_MS = 200

const SearchList = () => {
  const { search, setSearch } = useListParamsContext()
  const [value, setValue] = useState(search)

  // Keep the input in sync with the URL
  useEffect(() => {
    setValue(search)
  }, [search])

  // Debounce URL updates
  useEffect(() => {
    if (value === search) return

    const timeoutId = setTimeout(() => {
      setSearch(value)
    }, DEBOUNCE_MS)

    return () => clearTimeout(timeoutId)
  }, [value, search, setSearch])

  const isSearching = value !== ''

  return (
    <InputGroup>
      <InputGroupInput
        value={value}
        placeholder="Search..."
        onChange={(e) => setValue(e.target.value)}
      />

      <InputGroupAddon>
        <Search />
      </InputGroupAddon>

      {isSearching ? (
        <InputGroupAddon align="inline-end">
          <Button variant="ghost" size="icon" onClick={() => setValue('')}>
            <X />
          </Button>
        </InputGroupAddon>
      ) : null}
    </InputGroup>
  )
}

export default SearchList
