import BoxTableColumnsHeader from '@/app/components/box/table/table/BoxTableColumnsHeader'
import { Checkbox } from '@/components/ui/checkbox'
import { Box } from '@/db/schema'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useMemo } from 'react'

export type BoxesDataTableRow = Pick<
  Box,
  'id' | 'shortId' | 'name' | 'createdAt'
>

export function BoxTableColumns() {
  return useMemo<ColumnDef<BoxesDataTableRow>[]>(
    () => [
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
            onClick={(e) => e.stopPropagation()}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'shortId',
        header: () => <BoxTableColumnsHeader field="shortId" label="ID" />,
        cell: ({ row }) => (
          <div className="font-jb text-sm uppercase">
            {row.getValue('shortId')}
          </div>
        ),
      },
      {
        accessorKey: 'name',
        header: () => <BoxTableColumnsHeader field="name" label="Name" />,
        cell: ({ row, cell }) => {
          return (
            <div className="uppercase font-bold">{row.getValue('name')}</div>
          )
        },
      },
        cell: ({ row }) => (
          <Link href={`/boxes/${row.original.id}`}>{row.original.name}</Link>
        ),
      },
    ],
    []
  )
}
