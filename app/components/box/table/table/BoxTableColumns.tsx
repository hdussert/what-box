import BoxTableColumnsHeader from '@/app/components/box/table/table/BoxTableColumnsHeader'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { BoxesPaginated } from '@/lib/box'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

export type BoxesDataTableRow = Pick<
  BoxesPaginated['items'][number],
  'id' | 'shortId' | 'name' | 'items'
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
      {
        accessorKey: 'items',
        header: () => (
          <div className="text-muted-foreground uppercase font-bold tracking-widest text-xs">
            Items
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1">
            {row.original.items.map((item) => (
              <Badge key={item.id}>{item.name}</Badge>
            ))}
          </div>
        ),
      },
    ],
    []
  )
}
