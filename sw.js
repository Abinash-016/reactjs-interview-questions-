self.addEventListener("install", e => {
  self.skipWaiting();
});

self.addEventListener("fetch", e => {
  // Network first (no aggressive caching)
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
