export const config = { runtime: 'edge' };

/**
 * api/lecaps.js — Vercel Edge Function
 * Proxy a open.bymadata.com.ar para datos de LECAPs en tiempo real
 * Caché: 15 minutos (900 segundos)
 *
 * Endpoint propio: GET /api/lecaps
 *
 * Respuesta exitosa:
 * {
 *   ok: true,
 *   source: "byma" | "fallback",
 *   ts: "<ISO timestamp>",
 *   data: [
 *     { especie, vto, tna, tem, tea, precioMercado, diasRestantes },
 *     ...
 *   ]
 * }
 */


// ─── Tasas hardcoded de fallback (Etapa 2) ───────────────────────────────────
// Se usan cuando BYMA no responde o tarda más de 4 segundos.
// Actualizar manualmente cada mes si el feed falla seguido.
const FALLBACK = [
  { especie:'S30A6', vto:'2026-04-30', tna:37.8 },
  { especie:'S29M6', vto:'2026-05-29', tna:38.2 },
  { especie:'S30J6', vto:'2026-06-30', tna:38.5 },
  { especie:'S31L6', vto:'2026-07-31', tna:38.7 },
  { especie:'S31A6', vto:'2026-08-31', tna:39.0 },
  { especie:'S30S6', vto:'2026-09-30', tna:39.2 },
  { especie:'S30O6', vto:'2026-10-30', tna:39.4 },
  { especie:'S27N6', vto:'2026-11-27', tna:39.6 },
  { especie:'S28D6', vto:'2026-12-28', tna:39.8 },
];

// ─── Helpers matemáticos ─────────────────────────────────────────────────────
function diasR(vtoStr) {
  const h = new Date(), v = new Date(vtoStr + 'T00:00:00-03:00');
  h.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round((v - h) / 86400000));
}

// BYMA publica los precios de LECAPs como precio limpio por cada $1000 de VN.
// A partir del precio de mercado, calculamos la TNA implícita:
//   precio = 1000 / (1 + TEM/100)^(dias/30)
//   TEM = ((1000/precio)^(30/dias) - 1) * 100
//   TNA = TEM * 12
function tnaDesde(precio, dias) {
  if (!precio || precio <= 0 || dias <= 0) return null;
  const tem = (Math.pow(1000 / precio, 30 / dias) - 1) * 100;
  return tem * 12;
}
function tem(tna)  { return tna / 12; }
function tea(tna)  { return (Math.pow(1 + tna / 100 / 12, 12) - 1) * 100; }

// ─── Parseo de respuesta BYMA ────────────────────────────────────────────────
// BYMA devuelve un array de objetos. Los campos relevantes varían.
// Esta función es defensiva: acepta múltiples variantes de naming.
function parseBYMA(raw) {
  // BYMA puede devolver { content: [...] } o directamente un array
  const items = Array.isArray(raw) ? raw : (raw?.content ?? raw?.data ?? []);

  const resultados = [];

  for (const item of items) {
    // Filtrar sólo LECAPs (simbolo empieza con S, tipo LECA o LECAP)
    const simbolo = (item.symbol || item.ticker || item.simbolo || '').toUpperCase().trim();
    const tipo    = (item.instrumentType || item.tipo || item.type || '').toUpperCase();
    const esLecap = simbolo.startsWith('S') && (tipo.includes('LECA') || simbolo.length <= 7);
    if (!esLecap) continue;

    // Precio: BYMA puede usar lastPrice, price, settlementPrice, closePrice
    const precio = parseFloat(
      item.lastPrice ?? item.price ?? item.settlementPrice ?? item.closePrice ?? 0
    );

    // Fecha de vencimiento: varios formatos posibles
    const vtoRaw  = item.maturityDate || item.vencimiento || item.expirationDate || '';
    // Normalizar a YYYY-MM-DD
    let vto = '';
    if (vtoRaw) {
      const d = new Date(vtoRaw);
      if (!isNaN(d)) {
        vto = d.toISOString().slice(0, 10);
      }
    }

    const dr = vto ? diasR(vto) : 0;
    if (dr <= 0 || precio <= 0) continue; // vencidos o sin precio

    const tnaCalc = tnaDesde(precio, dr);
    if (!tnaCalc || tnaCalc < 5 || tnaCalc > 200) continue; // sanity check

    resultados.push({
      especie:        simbolo,
      vto,
      diasRestantes:  dr,
      precioMercado:  Math.round(precio * 100) / 100,
      tna:            Math.round(tnaCalc * 100) / 100,
      tem:            Math.round(tem(tnaCalc) * 1000) / 1000,
      tea:            Math.round(tea(tnaCalc) * 100) / 100,
    });
  }

  // Ordenar por días restantes ascendente
  return resultados.sort((a, b) => a.diasRestantes - b.diasRestantes);
}

// ─── Enriquecer fallback con campos calculados ────────────────────────────────
function enriquecerFallback() {
  return FALLBACK
    .filter(l => diasR(l.vto) > 0)
    .map(l => ({
      ...l,
      diasRestantes: diasR(l.vto),
      precioMercado: null,
      tem: Math.round(tem(l.tna) * 1000) / 1000,
      tea: Math.round(tea(l.tna) * 100) / 100,
    }));
}

// ─── Handler principal ────────────────────────────────────────────────────────
export default async function handler(req) {
  const corsHeaders = {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type':                 'application/json; charset=utf-8',
    'Cache-Control':                'public, s-maxage=900, stale-while-revalidate=300',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // ── Intentar BYMA con timeout de 4 segundos ──
  try {
    const controller = new AbortController();
    const timeout    = setTimeout(() => controller.abort(), 4000);

    // Endpoint público de BYMA para renta fija (sin autenticación)
    // Filtra letras capitalizables del Tesoro Nacional
    const bymaUrl = 'https://open.bymadata.com.ar/assets/json/letras-tesoro.json';

    const bymaRes = await fetch(bymaUrl, {
      signal:  controller.signal,
      headers: { 'Accept': 'application/json', 'User-Agent': 'rulitos.vercel.app/1.0' },
    });
    clearTimeout(timeout);

    if (bymaRes.ok) {
      const raw     = await bymaRes.json();
      const lecaps  = parseBYMA(raw);

      if (lecaps.length >= 3) {
        // Tenemos datos reales suficientes
        return new Response(JSON.stringify({
          ok:     true,
          source: 'byma',
          ts:     new Date().toISOString(),
          data:   lecaps,
        }), { status: 200, headers: corsHeaders });
      }
    }
  } catch (err) {
    // Timeout, CORS en origen, o error de red → caer a fallback silenciosamente
    console.error('[api/lecaps] BYMA error:', err.message);
  }

  // ── Fallback: hardcoded ──
  return new Response(JSON.stringify({
    ok:     true,
    source: 'fallback',
    ts:     new Date().toISOString(),
    data:   enriquecerFallback(),
  }), { status: 200, headers: corsHeaders });
}
