import ListSearch from '@/components/list/ListSearch'
import ListSort from '@/components/list/ListSort'

const ListControls = () => {
  return (
    <div className="flex gap-1">
      <ListSearch />
      <ListSort />
    </div>
  )
}

export default ListControls
