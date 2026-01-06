import BoxesDataTable from '@/app/components/box/BoxesDataTable'
import BoxesTableEmpty from '@/app/components/box/BoxesTableEmpty'
import BoxesTablePagination from '@/app/components/box/BoxesTablePagination'
import BoxesTableToolbar, {
  SortOptions,
} from '@/app/components/box/BoxesTableToolbar'
import { getUserBoxesPaginated } from '@/lib/box'

type BoxesTableProps = {
  searchParams?: {
    search?: string
    sort?: SortOptions
    page?: string
  }
}

const PAGE_SIZE = 5

const BoxesTable = async ({ searchParams }: BoxesTableProps) => {
  const search = searchParams?.search
  const sort = searchParams?.sort
  const page = searchParams?.page ? Number(searchParams.page) : 1

  const result = await getUserBoxesPaginated({
    search,
    sort,
    page,
    pageSize: PAGE_SIZE,
  })

  return (
    <div>
      <BoxesTableToolbar />

      {result.total === 0 ? (
        <BoxesTableEmpty />
      ) : (
        <>
          <BoxesDataTable
            data={result.items.map((b) => ({
              id: b.id,
              name: b.name,
              shortId: b.shortId,
            }))}
            page={result.page}
            totalPages={result.totalPages}
          />
          <BoxesTablePagination
            page={result.page}
            totalPages={result.totalPages}
          />
        </>
      )}
    </div>
  )
}

export default BoxesTable
