'use client'

import React, { useState } from 'react'
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, useReactTable, SortingState } from '@tanstack/react-table'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

type DataTableProps<T> = {
  data: T[]
  columns: ColumnDef<T, any>[]
  initialSort?: SortingState
  pageSize?: number
}

export default function DataTable<T>({ data, columns, initialSort = [], pageSize = 10 }: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>(initialSort)
  const [pageIndex, setPageIndex] = useState(0)
  const userTableT = useTranslations('HomePage.UserTable')
  const commonT = useTranslations('common.pagination')

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  // simple client-side paging
  const totalPages = Math.max(1, Math.ceil(data.length / pageSize))
  const visibleRows = React.useMemo(() => {
    const start = pageIndex * pageSize
    return table.getRowModel().rows.slice(start, start + pageSize)
  }, [table, pageIndex, pageSize])

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-muted">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} colSpan={header.colSpan} className="px-3 py-2 text-left text-sm font-medium select-none">
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            onClick: header.column.getToggleSortingHandler(),
                            className: header.column.getCanSort() ? 'inline-flex items-center gap-2 cursor-pointer select-none' : '',
                          }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: ' ▲',
                            desc: ' ▼',
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody className="divide-y divide-muted">
              {visibleRows.length === 0 ? (
                <tr>
                  <td className="p-4 text-sm text-muted-foreground" colSpan={columns.length}>
                    {userTableT('noItems')}
                  </td>
                </tr>
              ) : (
                visibleRows.map((row) => (
                  <tr key={row.id} className="odd:bg-background/50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-3 py-2 text-sm">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls (simple) */}
        <div className="flex items-center justify-between gap-3 mt-3 flex-col md:flex-row">
          <div className="text-sm text-muted-foreground">
            {commonT('showing')}
            <strong>
              {Math.min(data.length, pageIndex * pageSize + 1)}-{Math.min(data.length, pageIndex * pageSize + visibleRows.length)}
            </strong>{' '}
            {commonT('of')}
            <strong>{data.length}</strong>
          </div>

          <div className="flex items-center gap-2 ">
            <Button variant="outline" size="sm" onClick={() => setPageIndex((p) => Math.max(0, p - 1))} disabled={pageIndex === 0}>
              {commonT('prev')}
            </Button>
            <span className="text-sm px-2">
              {commonT('page')} {pageIndex + 1} / {totalPages}
            </span>
            <Button variant="outline" size="sm" onClick={() => setPageIndex((p) => Math.min(totalPages - 1, p + 1))} disabled={pageIndex >= totalPages - 1}>
              {commonT('next')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
