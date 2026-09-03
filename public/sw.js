const CACHE_NAME = 'devsubnet-cache-v3';
const PRECACHE_ASSETS = [
  '/',
  '/offline',
  '/visual-subnet-splitter',
  '/kubernetes-subnet-planner',
  '/ipv6-subnet-calculator',
  '/terraform-subnet-planner',
  '/k8s-cidr-calculator',
  '/vlsm-calculator',
  '/subnet-overlap-checker',
  '/cidr-supernet-calculator',
  '/cidr-cheat-sheet',
  '/what-is-a-subnet',
  '/subnet-cheat-sheet',
  '/aws-vpc-subnet-calculator',
  '/azure-vnet-subnet-calculator',
  '/gcp-vpc-subnet-calculator',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/faq',
  '/fonts/inter-latin-400.woff2',
  '/fonts/outfit-latin-700.woff2',
  '/fonts/jetbrains-mono-latin-400.woff2',
  '/favicon.svg',
  '/favicon.ico',
  '/favicon-96x96.png',
  '/site.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }
  // Bypass cache during local development
  if (self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        fetch(event.request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('/offline').then((offlineResponse) => {
            return offlineResponse || caches.match('/');
          });
        }
      });
    })
  );
});
