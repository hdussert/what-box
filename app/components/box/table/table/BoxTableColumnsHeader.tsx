// filepath: /Users/hdussert/projects/what-box/app/components/box/table/TableHeaderCell.tsx
'use client'

import { Button } from '@/components/ui/button'
import { BoxesSortField } from '@/lib/box/types'
import { parseSort } from '@/lib/box/utils'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { useBoxTableContext } from '../BoxTableProvider'

type BoxTableColumnsHeaderProps = {
  field: BoxesSortField
  label: string
}

const BoxTableColumnsHeader = ({
  field,
  label,
}: BoxTableColumnsHeaderProps) => {
  const { sort, toggleSort } = useBoxTableContext()
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

export default BoxTableColumnsHeader
