'use client'

import { useList } from '@/components/list/ListProvider'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from 'lucide-react'

const ListSort = () => {
  const { sort, setSort, sortOptions } = useList()
  return (
    <Select
      onValueChange={(value: (typeof sortOptions)[number]['value']) =>
        setSort(value)
      }
      defaultValue={sort}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {sortOptions.map((sort) => (
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

export default ListSort
