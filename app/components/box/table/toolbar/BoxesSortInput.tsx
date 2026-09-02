'use client'

import { useBoxesContext } from '@/app/components/box/table/BoxesContext'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { BoxesSortValues } from '@/lib/box'
import { SORT_OPTIONS } from '@/lib/box/const'
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from 'lucide-react'

const BoxesSortInput = () => {
  const { sort, setSort } = useBoxesContext()
  return (
    <Select
      onValueChange={(value: BoxesSortValues) => setSort(value)}
      defaultValue={sort}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {SORT_OPTIONS.map((sort) => (
            <SelectItem
              key={sort.value}
              value={sort.value}
              className="flex justify-between items-stretch"
            >
              {sort.direction === 'desc' ? (
                <ArrowDownWideNarrow />
              ) : (
                <ArrowUpWideNarrow />
              )}
              {sort.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default BoxesSortInput
