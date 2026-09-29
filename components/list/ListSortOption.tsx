import { SortOption } from '@/components/list/types'
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from 'lucide-react'

type ListSortOptionProps = {
  option?: SortOption
}

/** A sort option's direction icon and label. */
const ListSortOption = ({ option }: ListSortOptionProps) => {
  if (!option) {
    return null
  }

  return (
    <>
      {option.direction === 'desc' ? (
        <ArrowDownWideNarrow />
      ) : (
        <ArrowUpWideNarrow />
      )}
      {option.label}
    </>
  )
}

export default ListSortOption
