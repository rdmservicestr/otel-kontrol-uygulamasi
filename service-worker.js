// Service worker: uygulamanin "yuklenebilir" sayilmasi + Ajanda telefon bildirimleri (Web Push).
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Şimdilik tüm istekleri normal şekilde ağa yönlendiriyoruz.
});

self.addEventListener("push", (event) => {
  let v = {};
  try { v = event.data ? event.data.json() : {}; } catch (e) { v = { t: "Ajanda", b: event.data ? event.data.text() : "" }; }
  event.waitUntil(
    self.registration.showNotification(v.t || "Ajanda", {
      body: v.b || "",
      tag: v.tag || "ajanda",
      icon: "icon-192-v2.png",
      badge: "icon-192-v2.png",
      data: { u: v.u || "./" },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((liste) => {
      for (const c of liste) { if ("focus" in c) return c.focus(); }
      return self.clients.openWindow("./");
    })
  );
});
