const CACHE_NAME = 'pwa-demo-v1';
const OFFLINE_URL = 'offline.html';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.png',
  OFFLINE_URL
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request).then((resp) => resp || caches.match(OFFLINE_URL))
    )
  );
});