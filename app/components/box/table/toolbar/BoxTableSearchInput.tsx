'use client'

import { Input } from '@/components/ui/input'
import { useBoxTableContext } from '../BoxTableProvider'

const BoxTableSearchInput = () => {
  const { search, onSearchChange } = useBoxTableContext()

  return (
    <Input
      value={search}
      placeholder="Search boxes..."
      onChange={(e) => onSearchChange(e.target.value)}
      className="flex-1 sm:max-w-sm"
    />
  )
}

export default BoxTableSearchInput
