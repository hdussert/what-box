'use client'

import { useListParamsContext } from '@/app/components/common/list/ListParamsContext'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from 'lucide-react'

const SortList = () => {
  const { sort, setSort, sortOptions } = useListParamsContext()
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

export default SortList
