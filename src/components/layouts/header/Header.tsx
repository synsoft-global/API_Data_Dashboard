'use client'

import LocaleSwitcherSelect from '@/components/language-switch/SwitchLanguage'
import { languagesOptions } from '@/utils'
import { useLocale } from 'next-intl'
import { useTranslations } from 'use-intl'

export default function Header() {
  const locale = useLocale()
  const headerT = useTranslations('Header')

  return (
    <div className="p-4 mb-4 flex justify-between">
      <h1 className="font-bold text-2xl">JARIK</h1>
      <LocaleSwitcherSelect defaultValue={locale} items={languagesOptions} label={headerT('languageLabel')} />
    </div>
  )
}
