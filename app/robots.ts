import { env } from '@/env'
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Signed-in app pages, and reset links that only work with a token
      disallow: ['/dashboard', '/boxes/', '/reset-password'],
    },
    sitemap: `${env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
  }
}
