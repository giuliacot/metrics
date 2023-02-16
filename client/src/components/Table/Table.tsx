import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  Table as TableType,
  getFilteredRowModel,
  ColumnDef,
} from '@tanstack/react-table'
import { createContext, ReactNode, useContext, useState } from 'react'
import style from './Table.module.scss'
import { ChevronLeft, ChevronRight, Search } from 'react-feather'
import { Input } from '../Input/Input'

type TableContextData = {
  pageSizes: number[]
}

const TableContext = createContext<TableContextData>({
  pageSizes: [],
})

function Table<T>({
  data,
  columns,
  pagination = true,
  title,
}: {
  data: T[]
  columns: ColumnDef<T, any>[]
  pagination?: boolean
  title?: string
}) {
  const [globalFilter, setGlobalFilter] = useState('')
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const value: string | number | null = row.getValue(columnId)
      if (typeof value === 'string') {
        return value?.toLowerCase().includes(filterValue.toLowerCase())
      }
      return String(value).includes(filterValue.toLowerCase())
    },
  })

  const handleSearch = (value: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(value.target.value)
  }

  return (
    <>
      <div className={style.topTable}>
        {title && <span className={style.title}>{title}</span>}
        {pagination && <Pagination table={table} />}
      </div>
      <div className={style.tableWrapper}>
        <div className={style.actionsBar}>
          <Input.Root type="normal" iconDir="right" className={style.search}>
            <Input.Icon>
              <Search size={16} />
            </Input.Icon>
            <Input
              value={globalFilter ?? ''}
              placeholder="Search..."
              onChange={(value) => handleSearch(value)}
            />
          </Input.Root>
        </div>
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
      </div>
    </>
  )
}

function Pagination<T>({ table }: { table: TableType<T> }) {
  const { pageSizes } = useContext(TableContext)
  return (
    <div className={style.pagination}>
      <span className={style.pageRecord}>Page records:</span>
      <select
        className={style.selectPageSize}
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value))
        }}
      >
        {pageSizes.map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </select>
      <div className={style.paginationActions}>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className={style.previous}
        >
          <ChevronLeft size={24} />
        </button>
        <span>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className={style.next}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  )
}

function Root({
  children,
  pageSizes = [5, 10, 15, 20],
}: {
  children: ReactNode
  pageSizes?: number[]
}) {
  return (
    <TableContext.Provider value={{ pageSizes }}>
      {children}
    </TableContext.Provider>
  )
}

Table.Root = Root

export { Table }
