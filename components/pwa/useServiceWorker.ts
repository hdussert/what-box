'use client'

import { useEffect } from 'react'

/** Registers `public/sw.js`, which shows an offline page instead of the browser's error. */
export const useServiceWorker = () => {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      return
    }
    navigator.serviceWorker.register('/sw.js')
  }, [])
}
