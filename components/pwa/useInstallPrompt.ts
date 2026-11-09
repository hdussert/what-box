'use client'

import {
  getInstallEvent,
  promptInstall,
  subscribeToInstallPrompt,
} from '@/components/pwa/installPrompt'
import { useSyncExternalStore } from 'react'

/** Offers to install the app when the browser allows it (Chrome, Edge). */
export const useInstallPrompt = () => {
  const installEvent = useSyncExternalStore(
    subscribeToInstallPrompt,
    getInstallEvent,
    () => null,
  )

  const install = () => {
    promptInstall().catch((error) => console.error('Install prompt', error))
  }

  return { canInstall: installEvent !== null, install }
}
