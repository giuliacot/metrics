import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ReactNode } from 'react'
import { Metric } from '../../pages/handle-metrics/MetricsSetup'
import style from './Table.module.scss'

const columnHelper = createColumnHelper<Metric>()
const columns = [
  columnHelper.accessor('code', {
    cell: (c) => c.getValue(),
    header: () => <span>Marketing Campaing code</span>,
  }),
  columnHelper.accessor('amounts', {
    cell: (c) => c.getValue()?.reduce((acc, a) => a + acc, 0) ?? 0,
    header: () => <span>Total sales amounts</span>,
  }),
  columnHelper.accessor('date', {
    cell: (c) =>
      new Intl.DateTimeFormat('it-IT').format(new Date(c.getValue())),
    header: () => <span>Date</span>,
  }),
]

const Table = ({ data }: { data: Metric[] }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table className={style.table}>
      <thead className={style.thead}>
        {table.getHeaderGroups().map((group) => (
          <tr key={group.id}>
            {group.headers.map((header) => (
              <th className={style.titleHeader} key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td className={style.tData} key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const Title = ({ children }: { children: ReactNode }) => {
  return <h4>{children}</h4>
}

Table.Title = Title
export { Table }
