const CACHE_NAME = 'devsubnet-cache-v4';
const PRECACHE_ASSETS = [
  '/',
  '/offline/',
  '/visual-subnet-splitter/',
  '/kubernetes-subnet-planner/',
  '/ipv6-subnet-calculator/',
  '/terraform-subnet-planner/',
  '/k8s-cidr-calculator/',
  '/vlsm-calculator/',
  '/subnet-overlap-checker/',
  '/cidr-supernet-calculator/',
  '/cidr-cheat-sheet/',
  '/what-is-a-subnet/',
  '/subnet-cheat-sheet/',
  '/aws-vpc-subnet-calculator/',
  '/azure-vnet-subnet-calculator/',
  '/gcp-vpc-subnet-calculator/',
  '/about/',
  '/contact/',
  '/privacy/',
  '/terms/',
  '/faq/',
  '/fonts/inter-latin-400.woff2',
  '/fonts/outfit-latin-700.woff2',
  '/fonts/jetbrains-mono-latin-400.woff2',
  '/favicon.svg',
  '/favicon.ico',
  '/favicon-96x96.png',
  '/apple-touch-icon.png',
  '/site.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Use map with individual catches so one failed asset doesn't abort whole install
      return Promise.allSettled(
        PRECACHE_ASSETS.map((url) =>
          fetch(url, { redirect: 'follow' }).then((res) => {
            if (res.ok) {
              return cache.put(url, res);
            }
          })
        )
      );
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
    caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch update in background (stale-while-revalidate)
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
            }
          })
          .catch(() => {});
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        })
        .catch(async () => {
          if (event.request.mode === 'navigate') {
            const offlineResponse =
              (await caches.match('/offline/')) ||
              (await caches.match('/offline')) ||
              (await caches.match('/'));
            if (offlineResponse) {
              return offlineResponse;
            }
          }
          return new Response(
            '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Offline | DevSubnet</title><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="font-family:system-ui,sans-serif;background:#0d111c;color:#fff;text-align:center;padding:4rem 1rem;"><h1>You Are Offline</h1><p>Check your internet connection to continue.</p><button onclick="location.reload()" style="padding:10px 20px;border-radius:8px;border:none;background:#2563eb;color:#fff;cursor:pointer;font-weight:bold;">Retry</button></body></html>',
            {
              headers: { 'Content-Type': 'text/html; charset=utf-8' },
              status: 503,
              statusText: 'Service Unavailable'
            }
          );
        });
    })
  );
});
