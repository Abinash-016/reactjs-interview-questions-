const CACHE = "react-notes-cache-v2";

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(cache =>
      cache.addAll([
        "./",
        "./index.html",
        "./styles.css"
      ])
      .catch(err => {
        console.log("Some files not cached:", err);
      })
    )
  );
});

self.addEventListener("fetch", e => {

  // Don’t try to cache external CDN files
  if(e.request.url.startsWith("http") &&
     !e.request.url.includes(location.origin)){
    return;
  }

  e.respondWith(
    caches.match(e.request).then(res =>
      res || fetch(e.request)
    )
  );
});
