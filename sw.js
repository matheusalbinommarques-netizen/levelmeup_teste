// sw.js
// SW v1.0.15 — precache do shell + stale-while-revalidate para assets (mesmo-origin)

const CACHE_PREFIX = 'lmu-cache';
const VERSION = 'v1.0.15';
const PRECACHE = `${CACHE_PREFIX}-precache-${VERSION}`;
const RUNTIME  = `${CACHE_PREFIX}-runtime-${VERSION}`;

const APP_SHELL = [
  './',
  './index.html',
  './progresso.html',
  './perfil.html',
  './manifest.json',
  './sw.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PRECACHE)
      // força ir à rede na instalação (evita servir HTML velho do HTTP cache)
      .then((cache) => cache.addAll(APP_SHELL.map(u => new Request(u, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.map((k) => (k === PRECACHE || k === RUNTIME) ? undefined : caches.delete(k))
    );
    await self.clients.claim();
  })());
});

// utilzinho para normalizar path local (remove query/hash)
function localPathname(url) {
  const path = url.pathname.endsWith('/') ? '/index.html' : url.pathname;
  return `.${path.substring(path.lastIndexOf('/'))}`;
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // só gerenciamos same-origin (mais seguro e respeita CSP)
  if (url.origin !== self.location.origin) return;

  const accept = req.headers.get('accept') || '';
  const isPartial = (req.headers.get('x-lmu-partial') || req.headers.get('X-LMU-Partial')) === '1';
  const isHTMLAccept = accept.includes('text/html');
  const isNav = req.mode === 'navigate' || req.destination === 'document' || isHTMLAccept || isPartial;

  // Navegação / HTML → network-first (e NÃO cacheia respostas parciais do mini-router)
  if (isNav) {
    event.respondWith((async () => {
      try {
        const net = await fetch(req, { cache: 'no-store' });
        if (!isPartial) {
          const cache = await caches.open(RUNTIME);
          cache.put(req, net.clone());
        }
        return net;
      } catch {
        // 1) tenta no runtime (ignorando query p/ busts tipo ?v=123)
        const runtime = await caches.open(RUNTIME);
        const cachedNav = await runtime.match(req, { ignoreSearch: true });
        if (cachedNav) return cachedNav;

        // 2) fallback do precache para a página alvo (index/progresso)
        const prec = await caches.open(PRECACHE);
        const wanted = localPathname(url); // ./index.html ou ./progresso.html
        const precHit = await prec.match(wanted);
        if (precHit) return precHit;

        // 3) fallback final: index.html
        return (await prec.match('./index.html')) || Response.error();
      }
    })());
    return;
  }

  // Demais assets → stale-while-revalidate (same-origin)
  event.respondWith((async () => {
    const cache = await caches.open(RUNTIME);
    const cached = await cache.match(req, { ignoreSearch: true });
    const fetchPromise = fetch(req)
      .then((net) => {
        // só guarda no cache se resposta OK
        if (net && net.status === 200) cache.put(req, net.clone());
        return net;
      })
      .catch(() => cached);
    return cached || fetchPromise;
  })());
});

// opcional: permite pular o estado "waiting" via postMessage
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
