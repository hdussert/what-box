import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Returns `path` if it's a same-site path, `fallback` otherwise. Guards
 * redirects built from user input (e.g. `?next=`) against sending users to
 * another site: `//evil.com` and `/\evil.com` are treated as external.
 */
export function safeRedirectPath(path: unknown, fallback = "/dashboard") {
  if (typeof path !== "string" || !/^\/(?![/\\])/.test(path)) {
    return fallback
  }
  return path
}
