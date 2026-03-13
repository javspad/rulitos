/**
 * sw.js — Rulitos Service Worker
 * Estrategia: Cache-first para assets estáticos, Network-first para APIs
 * Offline: muestra última cotización cacheada con banner de aviso
 */

const CACHE_NAME   = 'rulitos-v3';
const STATIC_CACHE = 'rulitos-static-v3';
const DATA_CACHE   = 'rulitos-data-v3';

// Assets estáticos a pre-cachear en install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js',
];

// Hosts de APIs de datos (network-first, fallback a cache)
const API_HOSTS = [
  'dolarapi.com',
  'argentinadatos.com',
  'open.bymadata.com.ar',
];

/* ─── INSTALL: pre-cache de estáticos ─── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

/* ─── ACTIVATE: limpiar caches viejas ─── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== STATIC_CACHE && k !== DATA_CACHE)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

/* ─── FETCH: estrategia por tipo de request ─── */
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Google Fonts: cache-first (cambian muy poco)
  if (url.hostname.includes('fonts.')) {
    event.respondWith(cacheFirst(event.request, STATIC_CACHE));
    return;
  }

  // APIs de datos: network-first, fallback a cache
  if (API_HOSTS.some(h => url.hostname.includes(h)) || url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirstData(event.request));
    return;
  }

  // Assets estáticos: cache-first
  if (event.request.method === 'GET') {
    event.respondWith(cacheFirst(event.request, STATIC_CACHE));
  }
});

/* ─── Estrategias ─── */
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Offline — recurso no disponible', { status: 503 });
  }
}

async function networkFirstData(request) {
  const cache = await caches.open(DATA_CACHE);
  try {
    const response = await fetch(request, { signal: AbortSignal.timeout(5000) });
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    // Red no disponible → devolver cache con header offline
    const cached = await cache.match(request);
    if (cached) {
      // Clonar y agregar header para que el cliente sepa que es cache
      const headers = new Headers(cached.headers);
      headers.set('X-Rulitos-Offline', 'true');
      const body = await cached.text();
      return new Response(body, { status: 200, headers });
    }
    return new Response(JSON.stringify({ ok: false, offline: true }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
