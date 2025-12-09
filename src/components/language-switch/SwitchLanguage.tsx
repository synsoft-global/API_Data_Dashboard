'use client'

import { useTransition } from 'react'
import { Locale } from '@/i18n/config'
import { setUserLocale } from '@/i18n/locale'
import { LanguagesIcon } from 'lucide-react'

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { SwitchLanguageProps } from './SwitchLanguage.type'

export default function LocaleSwitcherSelect({ defaultValue, items, label }: SwitchLanguageProps) {
  const [isPending, startTransition] = useTransition()

  function onChange(value: string) {
    const locale = value as Locale
    startTransition(() => {
      setUserLocale(locale)
    })
  }

  return (
    <Select defaultValue={defaultValue} onValueChange={onChange}>
      <SelectTrigger aria-label={label} className="w-[44px] justify-center rounded-sm p-2 transition-colors hover:bg-slate-200 disabled:pointer-events-none disabled:opacity-60" disabled={isPending}>
        <LanguagesIcon className="h-10 w-10 text-slate-600" />
      </SelectTrigger>
      <SelectContent align="end">
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value} className="flex items-center">
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
