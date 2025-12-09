'use client'

import React, { useMemo } from 'react'
import DataTable from '@/components/data-table/DataTable'
import RenderContent from '@/components/render-content/RenderContent'

import SearchInput from '@/components/search/SearchInput'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'

import { UserDTO } from '@/dto'
import { useUserListQuery } from '@/redux/api/users.api'
import { useUserColumns } from './useUserColumns.hook'
import { useTranslations } from 'next-intl'

export default function UsersTable() {
  const homePageT = useTranslations('HomePage')
  const columns = useUserColumns()

  const { isFetching, isLoading, isError, data } = useUserListQuery()

  const [search, setSearch] = React.useState('')
  const debouncedSearch = useDebouncedValue(search, 150)

  const rawArray = React.useMemo<UserDTO[]>(() => {
    if (!data) return []
    if (Array.isArray(data)) return data as UserDTO[]

    if ((data as any).users && Array.isArray((data as any).users)) {
      return (data as any).users as UserDTO[]
    }
    if ((data as any).data && Array.isArray((data as any).data)) {
      return (data as any).data as UserDTO[]
    }

    const values = Object.values(data)
    for (const v of values) {
      if (Array.isArray(v)) return v as UserDTO[]
    }

    return []
  }, [data])

  // useEffect(() => {
  //   console.debug('[UsersTable] rawArray length:', rawArray.length, 'search:', search)
  // }, [rawArray.length, search])

  const filteredData = React.useMemo<UserDTO[]>(() => {
    if (!rawArray || rawArray.length === 0) return []

    const q = (debouncedSearch || '').trim().toLowerCase()
    if (!q) return rawArray

    return rawArray.filter((u: UserDTO) => {
      const name = (u?.name ?? '').toString().toLowerCase()
      const email = (u?.email ?? '').toString().toLowerCase()
      return name.includes(q) || email.includes(q)
    })
  }, [rawArray, debouncedSearch])

  const tableKey = useMemo(() => `users-${rawArray.length}-${filteredData.length}-${String(isLoading)}`, [rawArray.length, filteredData.length, isLoading])

  return (
    <div className="space-y-4 ">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h2 className="text-lg font-semibold">{homePageT('HomePageTitle')}</h2>

        <div className="w-full md:w-72">
          <SearchInput value={search} onChange={setSearch} placeholder={homePageT('searchPlaceholder')} />
        </div>
      </div>

      <RenderContent isLoading={isLoading} isFetching={isFetching} isError={isError}>
        {filteredData.length === 0 ? (
          <div className="py-6 text-center text-sm text-muted-foreground">{homePageT('UserTable.noItems')}</div>
        ) : (
          <DataTable<UserDTO> key={tableKey} data={filteredData} columns={columns} pageSize={5} />
        )}
      </RenderContent>
    </div>
  )
}
