'use client'

import {
  BoxTableContextProvider,
  useBoxTableContext,
} from '@/app/components/box/table/BoxTableProvider'
import BoxTablePagination from '@/app/components/box/table/pagination/BoxTablePagination'
import { BoxTableColumns } from '@/app/components/box/table/table/BoxTableColumns'
import { BoxTableContent } from '@/app/components/box/table/table/BoxTableContent'
import BoxTableEmpty from '@/app/components/box/table/table/BoxTableEmpty'
import BoxTableToolbar from '@/app/components/box/table/toolbar/BoxTableToolbar'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { BoxesPaginated } from '@/lib/box/types'
import {
  getCoreRowModel,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useMemo, useState } from 'react'

type BoxTableProps = BoxesPaginated

const BoxTableInner = () => {
  const { setSelectedIds, selectedIds, clearingSelection } =
    useBoxTableContext()
  const { boxes, total } = useBoxTableContext()
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const columns = BoxTableColumns()

  const table = useReactTable({
    data: boxes,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
  })

  const computedSelectedIds = useMemo(
    () => table.getSelectedRowModel().rows.map((r) => r.original.id),
    [table.getSelectedRowModel().rows]
  )

  // Whenever the selected rows change, update the context's selectedIds
  useEffect(() => {
    setSelectedIds(computedSelectedIds)
  }, [computedSelectedIds, setSelectedIds])

  // When the selectedIds in the context are cleared, clear the table's row selection state
  useEffect(() => {
    setRowSelection({})
  }, [clearingSelection])

  const isEmpty = total === 0

  return (
    <div>
      <Card>
        <CardHeader>
          <BoxTableToolbar />
        </CardHeader>
        <CardContent>
          {isEmpty ? <BoxTableEmpty /> : <BoxTableContent table={table} />}
        </CardContent>
        <CardFooter>
          <BoxTablePagination />
        </CardFooter>
      </Card>
    </div>
  )
}

const BoxTable = (props: BoxTableProps) => {
  return (
    <BoxTableContextProvider {...props}>
      <BoxTableInner />
    </BoxTableContextProvider>
  )
}

export default BoxTable
