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

const ListSort = () => {
  const { sort, setSort, sortOptions } = useList()
  return (
    <Select
      onValueChange={(value) => {
        if (value) {
          setSort(value)
        }
      }}
      defaultValue={sort}
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
