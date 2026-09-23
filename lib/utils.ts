import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Returns `path` if it's a same-site path, `fallback` otherwise. Guards
 * redirects built from user input (e.g. `?next=`) against sending users to
 * another site. Parsing with `URL` catches what a prefix check misses, like
 * `//evil.com`, `/\evil.com` or `/\t/evil.com` (browsers strip tabs).
 */
export function safeRedirectPath(path: unknown, fallback = '/dashboard') {
  if (typeof path !== 'string' || !path.startsWith('/')) {
    return fallback
  }

  const base = 'http://localhost'
  // URL throws on unparsable input like `//[`: treat it as unsafe too.
  const url = URL.canParse(path, base) ? new URL(path, base) : null
  if (url?.origin !== base) {
    return fallback
  }
  return url.pathname + url.search + url.hash
}
