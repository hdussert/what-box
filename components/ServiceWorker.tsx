'use client'

import { useServiceWorker } from '@/hooks/useServiceWorker'

/** Registers the service worker; renders nothing. */
const ServiceWorker = () => {
  useServiceWorker()
  return null
}

export default ServiceWorker
