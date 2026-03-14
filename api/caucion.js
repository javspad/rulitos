export const config = { runtime: 'edge' };

const API_KEY_UAT  = '1ypnPqtlG64lJIjrRN0DNut0hlIcQ502MiAbyo2g';
const API_KEY_PROD = 'nuDX73vj2483KSUgvenkj9t50oA0vgvA4WcuRAER';
const BASE_URL = 'https://servicios.mae.com.ar/api/v1';

// Fallback hardcoded por si MAE no responde
const FALLBACK = [
  { plazo: '001', codigoPlazo: '001', Ultimatasa: 35.0 },
  { plazo: '007', codigoPlazo: '007', Ultimatasa: 35.2 },
  { plazo: '030', codigoPlazo: '030', Ultimatasa: 35.5 },
  { plazo: '060', codigoPlazo: '060', Ultimatasa: 35.8 },
  { plazo: '090', codigoPlazo: '090', Ultimatasa: 36.0 },
];

export default async function handler(req) {
  const h = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=120',
  };
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: h });

  // Intentar con UAT primero, luego PROD
  for (const key of [API_KEY_UAT, API_KEY_PROD]) {
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
        }
      });
      if (!r.ok) continue;
      const data = await r.json();
      const items = Array.isArray(data) ? data : (data?.data || data?.result || []);
      if (items.length > 0) {
        // Agrupar por plazo, tomar ultima tasa
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
          return new Response(JSON.stringify({ ok: true, source: 'mae', ts: new Date().toISOString(), data: tasas }), { status: 200, headers: h });
        }
      }
    } catch {}
  }

  // Fallback
  return new Response(JSON.stringify({ ok: true, source: 'fallback', ts: new Date().toISOString(), data: FALLBACK }), { status: 200, headers: h });
}
