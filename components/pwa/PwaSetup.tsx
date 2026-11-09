'use client'

import { listenForInstallPrompt } from '@/components/pwa/installPrompt'
import { useServiceWorker } from '@/components/pwa/useServiceWorker'
import { useEffect } from 'react'

/** Registers the service worker and keeps the install prompt; renders nothing. */
const PwaSetup = () => {
  useServiceWorker()
  useEffect(listenForInstallPrompt, [])
  return null
}

export default PwaSetup
