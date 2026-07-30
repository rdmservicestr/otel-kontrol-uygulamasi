// Basit bir service worker - uygulamanın "yüklenebilir" (installable)
// sayılması için gereken minimum yapı. Şimdilik önbellekleme yapmıyor.
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Şimdilik tüm istekleri normal şekilde ağa yönlendiriyoruz.
});
