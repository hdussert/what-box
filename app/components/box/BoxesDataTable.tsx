'use client'

import { deleteBoxesAndAssociatedDatas } from '@/app/actions/delete-boxes'
// import { deleteBoxes } from '@/app/actions/box-actions'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  ColumnDef,
  RowSelectionState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Printer, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState, useTransition } from 'react'
import { toast } from 'sonner'

export type BoxesDataTableRow = {
  id: string
  shortId: string | null
  name: string
}

type Props = {
  data: BoxesDataTableRow[]
  page: number
  totalPages: number
}

export default function BoxesDataTable({ data }: Props) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isPending, startTransition] = useTransition()

  const columns = useMemo<ColumnDef<BoxesDataTableRow>[]>(() => {
    return [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 32,
      },
      {
        accessorKey: 'id',
        header: 'Id',

        cell: ({ row }) => (
          <Link href={`/boxes/${row.original.id}`}>{row.original.shortId}</Link>
        ),
      },
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
          <Link href={`/boxes/${row.original.id}`}>{row.original.name}</Link>
        ),
      },
    ]
  }, [])

  const table = useReactTable({
    data,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
  })

  const selectedIds = table.getSelectedRowModel().rows.map((r) => r.original.id)

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteBoxesAndAssociatedDatas(selectedIds)

      if (result.success) {
        toast.success(`${result.deleted} box(es) deleted`)
        setRowSelection({})
        setShowDeleteDialog(false)
      } else {
        toast.error(result.error || 'Failed to delete boxes')
      }
    })
  }

  return (
    <>
      <div className="space-y-3">
        {/* Bulk actions toolbar */}
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            {selectedIds.length > 0 ? `${selectedIds.length} selected` : ' '}
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outlineDestructive"
              disabled={selectedIds.length === 0}
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash2 />
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={selectedIds.length === 0}
              onClick={() => {
                // TODO: Print labels implementation
                console.log('Print labels:', selectedIds)
              }}
            >
              <Printer />
            </Button>
          </div>
        </div>

        {/* Data table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() ? 'selected' : undefined}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {selectedIds.length} box(es)?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. All images and items in these boxes
              will also be deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
