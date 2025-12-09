'use client'

import React, { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { UserDTO } from '@/dto'
import { useLocale, useTranslations } from 'next-intl'

export function useUserColumns() {
  // Get current locale and translations
  const locale = useLocale()
  const t = useTranslations('HomePage.UserTable')

  // Define table columns configuration
  const columns = useMemo<ColumnDef<UserDTO>[]>(
    () => [
      {
        accessorKey: 'id',
        header: t('id'),
        cell: (info) => info.getValue(),
        size: 40,
      },
      {
        accessorKey: 'name',
        header: t('name'),
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'username',
        header: t('username'),
      },
      {
        // Email column with mailto link
        accessorKey: 'email',
        header: t('email'),
        cell: (info) => (
          <a href={`mailto:${info.getValue()}`} className="underline">
            {info.getValue() as string}
          </a>
        ),
      },
      {
        // Combined city and zip code column
        accessorFn: (row) => `${row.address.city}, ${row.address.zipcode}`,
        id: 'city',
        header: t('cityZip'),
      },
      {
        accessorKey: 'phone',
        header: t('phone'),
      },
      {
        // Company name from nested object
        accessorFn: (row) => row.company.name,
        id: 'company',
        header: t('company'),
      },
    ],
    [locale]
  )

  return columns
}
