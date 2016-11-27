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
// Install Event
// Here we cache our static assets from the above array
self.addEventListener('install', (e: ExtendableEvent) => {
    logger.log(`Installation.`);
    e.waitUntil(
        self.caches.open(LOCAL_CACHE)
            .then(cache => {
                return (<any>cache).addAll(_.toArray(urlsToCache));
            }));
});

// Activat Event
// Here we cleanup the caches
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

// Fetch Events
// Here we take care of fetch-events and serve cached data for responses we know about.
// If a response _from the network_ isn't in our cache we'll cache it immediately 
// in the RUNTIME_CACHE and then return the response.
// The difference between LOCAL_CACHE and RUNTIME_CACHE is that our local cache 
// only contains our static assets while RUNTIME_CACHE contains network responses.
self.addEventListener('fetch', (e: FetchEvent) => {
  logger.log(`Intercepted fetch request: ${e.request.url}`);
  // Ignore any cross-origin requests
  if (e.request.url.startsWith(self.location.origin)) {
    e.respondWith(
      self.caches.match(e.request).then(cachedResponse => {
        if (cachedResponse) {
          logger.log(`Serving cached response: ${cachedResponse.url}`);
          return cachedResponse;
        }

        return self.caches.open(RUNTIME_CACHE).then(cache => {
          return self.fetch(e.request.clone()).then(response => {
            // Put a copy of the response in the RUNTIME_CACHE.
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

