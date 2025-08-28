const CACHE_NAME = 'quickmart-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/offline.html'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          function(response) {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      }).catch(function() {
        return caches.match('/offline.html');
      })
    );
});

self.addEventListener('push', function(event) {
  const options = {
    body: '새로운 특가 상품이 도착했습니다! 지금 확인해보세요.',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    actions: [
      {
        action: 'open',
        title: '앱 열기',
        icon: '/icons/icon-72x72.png'
      },
      {
        action: 'close',
        title: '닫기'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('퀵마트 알림', options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});