import * as _ from 'lodash';
const logger = require('bows')('ServiceWorker');
const LOCAL_CACHE = 'my-site-cache-v1';
const RUNTIME_CACHE = 'RUNTIME_CACHE';
const urlsToCache = [
  '/',
  'index.html',
  'initial.css',
  'main.bundle.js',
  'polyfills.bundle.js',
  'vendor.bundle.js'
];

self.addEventListener('install', (e: ExtendableEvent) => {
    logger.log(`Installation.`);
    e.waitUntil(
        self.caches.open(LOCAL_CACHE)
            .then(cache => {
                return (<any>cache).addAll(_.toArray(urlsToCache));
            }));
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', (e: ExtendableEvent) => {
  const currentCaches = [LOCAL_CACHE, RUNTIME_CACHE];
  logger.log(`Activation.`);
  e.waitUntil(
    self.caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !_.isNil(_.find(currentCaches, cacheName)));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return self.caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the RUNTIME_CACHE cache with the response
// from the network before returning it to the pag.e.
self.addEventListener('fetch', (e: FetchEvent) => {
  logger.log(`Intercepted fetch request: ${e.request.url}`);
  // Skip cross-origin requests, like those for Google Analytics.
  if (e.request.url.startsWith(self.location.origin)) {
    e.respondWith(
      self.caches.match(e.request).then(cachedResponse => {
        if (cachedResponse) {
          logger.log(`Serving cached response: ${cachedResponse.url}`);
          return cachedResponse;
        }

        return self.caches.open(RUNTIME_CACHE).then(cache => {
          return self.fetch(e.request.clone()).then(response => {
            // Put a copy of the response in the RUNTIME_CACHE cache.
            return cache.put(e.request, response.clone()).then(() => {
              logger.log(`Caching & serving new response: ${response.url}`);
              return response;
            });
          });
        });
      })
    );
  }
});

