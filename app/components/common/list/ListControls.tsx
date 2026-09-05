import SearchList from '@/app/components/common/list/SearchList'
import SortList from '@/app/components/common/list/SortList'

const ListControls = () => {
  return (
    <div className="flex gap-1">
      <SearchList />
      <SortList />
    </div>
  )
}

export default ListControls
