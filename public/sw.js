// Service Worker yukNgaji Siswa — PWA + push notif.
const CACHE = 'yukngaji-siswa-v1';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

// Pass-through (tanpa caching agresif biar konten selalu fresh; cukup utk installable PWA).
self.addEventListener('fetch', () => {});

// ===== Push notif (dipakai saat backend mengirim web-push) =====
self.addEventListener('push', (e) => {
  let data = {};
  try { data = e.data ? e.data.json() : {}; } catch { data = { title: 'yukNgaji', body: e.data ? e.data.text() : '' }; }
  const title = data.title || 'yukNgaji';
  e.waitUntil(self.registration.showNotification(title, {
    body: data.body || '',
    icon: '/icon.svg',
    badge: '/icon.svg',
    // tandai datang dari push → app bisa bedakan dgn auto-poll biasa
    data: { url: data.url || '/chats?from=push' },
    vibrate: [80, 40, 80],
  }));
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || '/chats?from=push';
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) { if ('focus' in c) { c.navigate(url); return c.focus(); } }
      return self.clients.openWindow(url);
    })
  );
});
