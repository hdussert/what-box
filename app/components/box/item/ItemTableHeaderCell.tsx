'use client'

import { useItemTableContext } from '@/app/components/box/item/ItemTableProvider'
import { Button } from '@/components/ui/button'
import { ItemsSortField } from '@/lib/item/types'
import { parseSort } from '@/lib/item/utils'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'

type ItemTableHeaderCellProps = {
  field: ItemsSortField
  label: string
}

const ItemTableHeaderCell = ({ field, label }: ItemTableHeaderCellProps) => {
  const { sort, toggleSort } = useItemTableContext()

  const { field: currentField, direction } = parseSort(sort)
  const isActive = currentField === field

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => toggleSort(field)}
      className="-ml-3 h-8"
    >
      {label}
      {isActive ? (
        direction === 'asc' ? (
          <ArrowUp className="ml-2 h-4 w-4" />
        ) : (
          <ArrowDown className="ml-2 h-4 w-4" />
        )
      ) : (
        <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
      )}
    </Button>
  )
}

export default ItemTableHeaderCell
