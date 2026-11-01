// ふたりの旅帖 PWA: アプリ本体を端末に置き、オフラインでも開けるようにする。
// 記録そのものは IndexedDB（端末の中）にあり、ここでは扱わない。
const VERSION = '20261101170754';
const CORE = 'tabicho-core-' + VERSION;
const RUNTIME = 'tabicho-runtime';
const FILES = ['./', './index.html', './leaflet.min.js', './fonts.css', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CORE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('tabicho-core-') && k !== CORE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // 本体: ネットにつながれば最新を取り、だめなら端末の控えを使う
  if (url.origin === location.origin) {
    e.respondWith(fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CORE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('./index.html'))));
    return;
  }
  // 「くわしい地図」の地図画像: 一度見たものは控えておく
  if (/cyberjapandata\.gsi\.go\.jp$|tile\.openstreetmap\.org$/.test(url.hostname)) {
    e.respondWith(caches.open(RUNTIME).then(c => c.match(req).then(hit => {
      const net = fetch(req).then(res => { if (res.ok || res.type === 'opaque') c.put(req, res.clone()); return res; });
      return hit || net;
    })));
  }
});
