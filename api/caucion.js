export const config = { runtime: 'edge' };

const API_KEY_UAT  = (typeof process !== 'undefined' && process.env?.MAE_API_KEY_UAT)  || '';
const API_KEY_PROD = (typeof process !== 'undefined' && process.env?.MAE_API_KEY_PROD) || '';
const BASE_URL = 'https://servicios.mae.com.ar/api/v1';

// Fallback hardcoded — actualizado mar-2026 (tasa pol. BCRA ~29%)
const FALLBACK = [
  { plazo: '001', codigoPlazo: '001', Ultimatasa: 29.0 },
  { plazo: '007', codigoPlazo: '007', Ultimatasa: 29.5 },
  { plazo: '030', codigoPlazo: '030', Ultimatasa: 30.0 },
  { plazo: '060', codigoPlazo: '060', Ultimatasa: 30.5 },
  { plazo: '090', codigoPlazo: '090', Ultimatasa: 31.0 },
];

// BCRA v4.0 — variable 150: pases entre terceros 1d (proxy caución overnight)
async function fetchBCRA() {
  const today = new Date().toISOString().slice(0, 10);
  const desde = new Date(Date.now() - 14 * 86400000).toISOString().slice(0, 10);
  const c = new AbortController();
  setTimeout(() => c.abort(), 5000);
  try {
    const r = await fetch(
      `https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias/150?desde=${desde}&hasta=${today}`,
      { signal: c.signal, headers: { 'Accept': 'application/json', 'User-Agent': 'rulitos/1.0' } }
    );
    if (!r.ok) return null;
    const data = await r.json();
    const results = Array.isArray(data?.results) ? data.results : [];
    if (!results.length) return null;
    const sorted = [...results].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    const overnight = parseFloat(sorted[0]?.valor);
    if (!overnight || overnight <= 0) return null;
    return [
      { plazo: '001', codigoPlazo: '001', Ultimatasa: +overnight.toFixed(2) },
      { plazo: '007', codigoPlazo: '007', Ultimatasa: +(overnight + 0.5).toFixed(2) },
      { plazo: '030', codigoPlazo: '030', Ultimatasa: +(overnight + 1.0).toFixed(2) },
      { plazo: '060', codigoPlazo: '060', Ultimatasa: +(overnight + 1.5).toFixed(2) },
      { plazo: '090', codigoPlazo: '090', Ultimatasa: +(overnight + 2.0).toFixed(2) },
    ];
  } catch { return null; }
}

export default async function handler(req) {
  const h = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=600',
  };
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: h });

  // 1. BCRA v4.0 (pases entre terceros — proxy caución)
  const bcraData = await fetchBCRA();
  if (bcraData) {
    return new Response(
      JSON.stringify({ ok: true, source: 'bcra', ts: new Date().toISOString(), data: bcraData }),
      { status: 200, headers: h }
    );
  }

  // 2. MAE API (UAT primero, luego PROD)
  for (const key of [API_KEY_UAT, API_KEY_PROD].filter(Boolean)) {
    try {
      const c = new AbortController();
      setTimeout(() => c.abort(), 4000);
      const r = await fetch(`${BASE_URL}/mercado/cotizaciones/cauciones`, {
        signal: c.signal,
        headers: {
          'Authorization': `Bearer ${key}`,
          'x-api-key': key,
          'Accept': 'application/json',
          'User-Agent': 'rulitos/1.0',
        },
      });
      if (!r.ok) continue;
      const data = await r.json();
      const items = Array.isArray(data) ? data : (data?.data || data?.result || []);
      if (items.length > 0) {
        const byPlazo = {};
        for (const item of items) {
          const p = item.codigoPlazo || item.plazo || '001';
          if (!byPlazo[p] || new Date(item.Fecha) > new Date(byPlazo[p].Fecha)) {
            byPlazo[p] = item;
          }
        }
        const tasas = Object.values(byPlazo)
          .filter(i => i.Ultimatasa > 0)
          .sort((a, b) => parseInt(a.codigoPlazo) - parseInt(b.codigoPlazo));
        if (tasas.length >= 2) {
          return new Response(
            JSON.stringify({ ok: true, source: 'mae', ts: new Date().toISOString(), data: tasas }),
            { status: 200, headers: h }
          );
        }
      }
    } catch {}
  }

  // 3. Fallback hardcoded
  return new Response(
    JSON.stringify({ ok: true, source: 'fallback', ts: new Date().toISOString(), data: FALLBACK }),
    { status: 200, headers: h }
  );
}
