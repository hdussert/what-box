// Chrome-only event, missing from the DOM types
export type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<unknown>
}

let installEvent: BeforeInstallPromptEvent | null = null
const subscribers = new Set<() => void>()

const setInstallEvent = (event: BeforeInstallPromptEvent | null) => {
  installEvent = event
  subscribers.forEach((notify) => notify())
}

/**
 * Keeps Chrome's install prompt event for later. Call once from the root
 * layout: Chrome fires the event once per page load, often while no install
 * button is mounted.
 */
export const listenForInstallPrompt = () => {
  const handleInstallable = (event: Event) =>
    setInstallEvent(event as BeforeInstallPromptEvent)
  const handleInstalled = () => setInstallEvent(null)

  window.addEventListener('beforeinstallprompt', handleInstallable)
  window.addEventListener('appinstalled', handleInstalled)
  return () => {
    window.removeEventListener('beforeinstallprompt', handleInstallable)
    window.removeEventListener('appinstalled', handleInstalled)
  }
}

/** `useSyncExternalStore` subscription to the kept event. */
export const subscribeToInstallPrompt = (notify: () => void) => {
  subscribers.add(notify)
  return () => {
    subscribers.delete(notify)
  }
}

export const getInstallEvent = () => installEvent

/** Shows Chrome's install dialog. An event prompts only once. */
export const promptInstall = async () => {
  const event = installEvent
  if (!event) {
    return
  }
  // Chrome fires a new event later if the user declines
  setInstallEvent(null)
  await event.prompt()
}
