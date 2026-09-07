import { useListParams } from '@/app/components/common/list/useListParams'
import { BoxesPaginated } from '@/lib/box'
import { BOXES_DEFAULT_SORT_OPTION, BOXES_SORT_OPTIONS } from '@/lib/box/const'

export function useBoxesPage(props: BoxesPaginated) {
  const boxesList = useListParams({
    sortOptions: BOXES_SORT_OPTIONS,
    defaultSortOption: BOXES_DEFAULT_SORT_OPTION,
  })

  return {
    ...boxesList,
    ...props,
  }
}
