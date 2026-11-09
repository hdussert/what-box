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
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  if (event.request.mode !== 'navigate') {
    return
  }
  event.respondWith(fetch(event.request).catch(() => caches.match(OFFLINE_URL)))
})
