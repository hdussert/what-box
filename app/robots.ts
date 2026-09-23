import { env } from '@/env'
import type { MetadataRoute } from 'next'

// Nothing is disallowed on purpose: a blocked page is never crawled, so its
// `noindex` is never seen and the bare URL can still be indexed (e.g. a
// /reset-password?token=… link). Private pages use `noindex` instead, and
// signed-out crawlers are redirected away from the app pages anyway.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
  }
}
