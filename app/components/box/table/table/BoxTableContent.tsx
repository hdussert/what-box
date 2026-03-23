import { BoxesDataTableRow } from '@/app/components/box/table/table/BoxTableColumns'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Table as ReactTable, flexRender } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'

type BoxTableContentProps = {
  table: ReactTable<BoxesDataTableRow>
}

export function BoxTableContent({ table }: BoxTableContentProps) {
  const router = useRouter()

  return (
    <div>
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
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() ? 'selected' : undefined}
              className="cursor-pointer"
              onClick={() => router.push(`/boxes/${row.original.id}`)} // Navigate to box details on row click
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
