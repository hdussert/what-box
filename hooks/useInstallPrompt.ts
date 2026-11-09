'use client'

import { useEffect, useState } from 'react'

// Chrome-only event, missing from the DOM types
type BeforeInstallPromptEvent = Event & { prompt: () => Promise<void> }

/** Offers to install the app when the browser allows it (Chrome, Edge). */
export const useInstallPrompt = () => {
  const [installEvent, setInstallEvent] =
    useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    const handleInstallable = (event: Event) => {
      // Replaces Chrome's own install banner with our button
      event.preventDefault()
      setInstallEvent(event as BeforeInstallPromptEvent)
    }
    const handleInstalled = () => setInstallEvent(null)

    window.addEventListener('beforeinstallprompt', handleInstallable)
    window.addEventListener('appinstalled', handleInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstallable)
      window.removeEventListener('appinstalled', handleInstalled)
    }
  }, [])

  const install = async () => {
    if (!installEvent) {
      return
    }
    // An event can prompt only once; Chrome fires a new one if declined
    setInstallEvent(null)
    await installEvent.prompt()
  }

  return { canInstall: installEvent !== null, install }
}
