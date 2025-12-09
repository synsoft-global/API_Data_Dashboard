'use client'

import { useMemo, useState } from 'react'
import DataTable from '@/components/data-table/DataTable'
import RenderContent from '@/components/render-content/RenderContent'

import SearchInput from '@/components/search/SearchInput'
import { UserDTO } from '@/dto'
import { useTranslations } from 'next-intl'
import { extractUserArray } from '@/utils'
import { useUserColumns } from './useUserColumns.hook'
import { useUserListQuery } from '@/redux/api/users.api'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'

export default function UsersTable() {
  const homePageT = useTranslations('HomePage')
  const columns = useUserColumns()

  // Fetch user data from API
  const { isFetching, isLoading, isError, data } = useUserListQuery()

  // Search input state and debounced value
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebouncedValue(search, 150)

  // Extract user array from various data structures
  const rawArray = useMemo<UserDTO[]>(() => extractUserArray(data), [data])

  // Filter users by name or email based on search query
  const filteredData = useMemo<UserDTO[]>(() => {
    if (!rawArray || rawArray.length === 0) return []

    const q = (debouncedSearch || '').trim().toLowerCase()
    if (!q) return rawArray

    return rawArray.filter((u: UserDTO) => {
      const name = (u?.name ?? '').toString().toLowerCase()
      const email = (u?.email ?? '').toString().toLowerCase()
      return name.includes(q) || email.includes(q)
    })
  }, [rawArray, debouncedSearch])

  // Generate unique key for table re-rendering
  const tableKey = useMemo(() => `users-${rawArray.length}-${filteredData.length}-${String(isLoading)}`, [rawArray.length, filteredData.length, isLoading])

  return (
    <div className="space-y-4 ">
      {/* Header with title and search input */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h2 className="text-lg font-semibold">{homePageT('HomePageTitle')}</h2>

        <div className="w-full md:w-72">
          <SearchInput value={search} onChange={setSearch} placeholder={homePageT('searchPlaceholder')} />
        </div>
      </div>

      {/* Table with loading/error states */}
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
