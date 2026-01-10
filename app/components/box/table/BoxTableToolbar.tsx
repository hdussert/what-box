import BoxTableToolbarActions from './BoxTableToolbarActions'
import BoxTableToolbarSearch from './BoxTableToolbarSearch'

const BoxTableToolbar = () => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <BoxTableToolbarSearch />
      <BoxTableToolbarActions />
    </div>
  )
}

export default BoxTableToolbar
