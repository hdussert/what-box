'use client'

import { useItemTableContext } from '@/app/components/box/item/ItemTableProvider'
import { Button } from '@/components/ui/button'
import { ItemsSortField } from '@/lib/item/types'
import { parseSort } from '@/lib/item/utils'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'

type ItemTableColumnsHeaderProps = {
  field: ItemsSortField
  label: string
}

const ItemTableColumnsHeader = ({
  field,
  label,
}: ItemTableColumnsHeaderProps) => {
  const { sort, toggleSort } = useItemTableContext()
  const { field: currentField, direction } = parseSort(sort)

  const isActive = currentField === field
  const isAsc = direction === 'asc'

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-muted-foreground uppercase font-bold tracking-widest text-xs -ml-3"
      onClick={() => toggleSort(field)}
    >
      {label}
      {isActive ? (
        isAsc ? (
          <ArrowUp />
        ) : (
          <ArrowDown />
        )
      ) : (
        <ArrowUpDown className="opacity-50" />
      )}
    </Button>
  )
}

export default ItemTableColumnsHeader
