import ItemTableColumnsHeader from '@/app/components/box/item/table/ItemTableColumnsHeader'
import { Checkbox } from '@/components/ui/checkbox'
import { Item } from '@/db/schema'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

export type ItemsDataTableRow = Pick<
  Item,
  'id' | 'name' | 'quantity' | 'condition' | 'description'
>

export function ItemTableColumns() {
  return useMemo<ColumnDef<ItemsDataTableRow>[]>(
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
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 32,
      },
      {
        accessorKey: 'name',
        header: () => <ItemTableColumnsHeader field="name" label="Name" />,
      },
      {
        accessorKey: 'quantity',
        header: () => (
          <ItemTableColumnsHeader field="quantity" label="Quantity" />
        ),
      },
      {
        accessorKey: 'condition',
        header: () => (
          <ItemTableColumnsHeader field="condition" label="Condition" />
        ),
        cell: ({ row }) => row.original.condition || '—',
      },
      {
        accessorKey: 'description',
        header: () => (
          <ItemTableColumnsHeader field="description" label="Description" />
        ),
        cell: ({ row }) => row.original.description || '—',
      },
    ],
    []
  )
}
