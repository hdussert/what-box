'use client'

import {
  ItemTableProvider,
  useItemTableContext,
} from '@/app/components/box/item/ItemTableProvider'
import ItemTablePagination from '@/app/components/box/item/pagination/ItemTablePagination'
import { ItemTableColumns } from '@/app/components/box/item/table/ItemTableColumns'
import { ItemTableContent } from '@/app/components/box/item/table/ItemTableContent'
import ItemTableEmpty from '@/app/components/box/item/table/ItemTableEmpty'
import ItemCreateForm from '@/app/components/box/item/toolbar/ItemCreateForm'

import ItemTableToolbar from '@/app/components/box/item/toolbar/ItemTableToolbar'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ItemsPaginated } from '@/lib/item/types'
import {
  getCoreRowModel,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useMemo, useState } from 'react'

type ItemTableProps = ItemsPaginated & {
  boxId: string
}

const ItemTableInner = () => {
  const { setSelectedIds, clearingSelection, items, total } =
    useItemTableContext()
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const columns = ItemTableColumns()

  const table = useReactTable({
    data: items,
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

  useEffect(() => {
    setSelectedIds(computedSelectedIds)
  }, [computedSelectedIds, setSelectedIds])

  useEffect(() => {
    setRowSelection({})
  }, [clearingSelection])

  const isEmpty = total === 0

  return (
    <div className="space-y-2">
      <ItemCreateForm />
      <Card>
        <CardHeader>
          <ItemTableToolbar />
        </CardHeader>
        <CardContent>
          {isEmpty ? <ItemTableEmpty /> : <ItemTableContent table={table} />}
        </CardContent>
        <CardFooter>
          <ItemTablePagination />
        </CardFooter>
      </Card>
    </div>
  )
}

const ItemTable = (props: ItemTableProps) => {
  return (
    <ItemTableProvider {...props}>
      <ItemTableInner />
    </ItemTableProvider>
  )
}

export default ItemTable
