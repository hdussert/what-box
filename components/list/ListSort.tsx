'use client'

import { useList } from '@/components/list/ListProvider'
import ListSortOption from '@/components/list/ListSortOption'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { startTransition, useOptimistic } from 'react'

const ListSort = () => {
  const { sort, setSort, sortOptions } = useList()
  // The URL, and so `sort`, only updates once the server has rendered the new list
  const [optimisticSort, setOptimisticSort] = useOptimistic(sort)

  return (
    <Select
      value={optimisticSort}
      onValueChange={(value) => {
        if (!value) {
          return
        }
        startTransition(() => {
          setOptimisticSort(value)
          setSort(value)
        })
      }}
    >
      <SelectTrigger>
        <SelectValue>
          {(value) => (
            <ListSortOption
              option={sortOptions.find((option) => option.value === value)}
            />
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {sortOptions.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="flex justify-between items-stretch"
            >
              <ListSortOption option={option} />
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default ListSort
