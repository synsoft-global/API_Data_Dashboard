import type { Metadata } from 'next'
import { Geist, Geist_Mono, Poppins } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import './globals.css'
import { getLocale } from 'next-intl/server'
import { Toaster } from 'sonner'
import { ReduxProvider } from '@/providers/ReduxProvider'

export const getPoppins = Poppins({
  variable: '--font',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Automated matching for recruiters',
  description: 'Automated matching for recruiters',
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale()

  return (
    <html lang={locale}>
      <body className={`${getPoppins.variable} antialiased  `} suppressHydrationWarning>
        <ReduxProvider>
          <NextIntlClientProvider>
            {children}
            <Toaster position="top-right" richColors />
          </NextIntlClientProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
