import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const config: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['resources.dct.gov.ae', 'images.pexels.com'], // add your external image host here
  },
}

export default withNextIntl(config)
