'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  const router = useRouter()
  const t = useTranslations('Error')
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="max-w-lg text-center">
        {/* Big 404 text with subtle animation */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-[10rem] font-bold animate-pulse text-foreground drop-shadow-lg">404</h1>
          <p className="text-xl md:text-lg font-semibold mt-4 mb-6">{t('NotFoundTitle')}</p>
          <p className="text-md md:text-lg text-foreground/80 mb-8">{t('NotFoundMessage')}</p>
        </motion.div>

        {/* Hero UI styled button */}

        <Button onClick={() => router.back()} color="primary" size="lg" className="rounded-full font-semibold">
          {t('GoBack')}
        </Button>
      </div>
    </div>
  )
}
