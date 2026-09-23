import { env } from '@/env'
import type { MetadataRoute } from 'next'

const PUBLIC_PATHS = ['/', '/sign-in', '/sign-up', '/legal', '/privacy']

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_PATHS.map((path) => ({
    url: new URL(path, env.NEXT_PUBLIC_APP_URL).toString(),
    priority: path === '/' ? 1 : 0.5,
  }))
}
