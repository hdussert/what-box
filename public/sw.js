// Serves offline.html when a page can't load offline. Everything else goes
// straight to the network: pages render on the server, so nothing else is
// worth caching.

// Bump to ship a new offline.html: the browser reinstalls the worker only
// when this file changes
const CACHE_NAME = 'offline-v1'
const OFFLINE_URL = '/offline.html'

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.add(OFFLINE_URL)),
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name)),
        ),
      )
      // Starts each page request while the worker boots, instead of after
      .then(() => self.registration.navigationPreload?.enable())
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  if (event.request.mode !== 'navigate') {
    return
  }
  event.respondWith(loadPage(event))
})

const loadPage = async (event) => {
  try {
    const preloaded = await event.preloadResponse
    return preloaded ?? (await fetch(event.request))
  } catch (error) {
    // The cache can be evicted: the browser's error page is all that's left
    const offlinePage = await caches.match(OFFLINE_URL)
    if (!offlinePage) {
      throw error
    }
    return offlinePage
  }
}
