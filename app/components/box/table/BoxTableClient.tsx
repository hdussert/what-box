'use client'

import BoxTableData from '@/app/components/box/table/BoxTableData'
import BoxTableEmpty from '@/app/components/box/table/BoxTableEmpty'
import BoxTablePagination from '@/app/components/box/table/BoxTablePagination'
import { BoxTableContextProvider } from '@/app/components/box/table/BoxTableProvider'
import BoxTableToolbar from '@/app/components/box/table/BoxTableToolbar'
import { BoxesPaginated } from '@/lib/box/types'

type BoxTableClientProps = BoxesPaginated

const BoxTableClient = (props: BoxTableClientProps) => {
  const isEmpty = props.items.length === 0

  return (
    <BoxTableContextProvider {...props}>
      <BoxTableToolbar />
      {isEmpty ? <BoxTableEmpty /> : <BoxTableData />}
      <BoxTablePagination />
    </BoxTableContextProvider>
  )
}

export default BoxTableClient
