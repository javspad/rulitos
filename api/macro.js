/**
 * api/macro.js — Vercel Edge Function
 * Agrega datos macro argentinos desde Argentina Datos y BCRA
 * Caché: 30 minutos (los datos macro cambian menos seguido)
 *
 * Endpoint propio: GET /api/macro
 *
 * Respuesta:
 * {
 *   ok: true,
 *   ts: "<ISO>",
 *   riesgoPais:  number | null,   // EMBI Argentina (puntos básicos)
 *   inflacion: {                   // último dato mensual disponible
 *     valor: number,              // % mensual
 *     fecha: "YYYY-MM-DD",
 *   } | null,
 *   plazosFixed: [                 // top bancos por TNA
 *     { banco, tna, tea },
 *     ...
 *   ],
 *   tamar: number | null,          // TAMAR (tasa activa BNA), si disponible
 * }
 */

export const config = { runtime: 'edge' };

// ─── Helpers ──────────────────────────────────────────────────────────────────
function tea_pf(tna) {
  // Plazo fijo: capitalización a 30 días → TEA aproximada
  return (Math.pow(1 + tna / 100 / 12, 12) - 1) * 100;
}

async function safeFetch(url, timeoutMs = 3500) {
  const ctrl = new AbortController();
  const t    = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const r = await fetch(url, {
      signal:  ctrl.signal,
      headers: { Accept: 'application/json', 'User-Agent': 'rulitos.vercel.app/1.0' },
    });
    clearTimeout(t);
    if (!r.ok) return null;
    return r.json();
  } catch {
    clearTimeout(t);
    return null;
  }
}

// ─── Handler ──────────────────────────────────────────────────────────────────
export default async function handler(req) {
  const headers = {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type':                 'application/json; charset=utf-8',
    'Cache-Control':                'public, s-maxage=1800, stale-while-revalidate=600',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  // ── Disparar todas las llamadas en paralelo ──
  const [riesgoData, inflData, pfData] = await Promise.all([
    // 1. Riesgo País EMBI (argentinadatos)
    safeFetch('https://argentinadatos.com/v1/finanzas/indices/riesgo-pais/ultimo'),

    // 2. Inflación mensual — último registro
    safeFetch('https://argentinadatos.com/v1/finanzas/indices/inflacion'),

    // 3. Tasas de plazo fijo por banco
    safeFetch('https://argentinadatos.com/v1/finanzas/tasas/plazo-fijo'),
  ]);

  // ── Riesgo País ──
  let riesgoPais = null;
  if (riesgoData) {
    // argentinadatos devuelve { fecha, valor } o directamente un número
    riesgoPais = riesgoData?.valor ?? riesgoData?.riesgoPais ?? riesgoData ?? null;
    if (typeof riesgoPais !== 'number') riesgoPais = null;
  }

  // ── Inflación ──
  let inflacion = null;
  if (Array.isArray(inflData) && inflData.length > 0) {
    // Ordenar por fecha descendente y tomar el último
    const sorted = [...inflData].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    const last   = sorted[0];
    if (last?.valor != null) {
      inflacion = { valor: last.valor, fecha: last.fecha };
    }
  } else if (inflData?.valor != null) {
    inflacion = { valor: inflData.valor, fecha: inflData.fecha };
  }

  // ── Plazo Fijo ──
  let plazosFixed = [];
  if (Array.isArray(pfData) && pfData.length > 0) {
    // Normalizar: puede venir como { entidad, tna } o { banco, tna }
    plazosFixed = pfData
      .map(p => ({
        banco: p.entidad || p.banco || p.nombre || 'Banco',
        tna:   parseFloat(p.tna || p.tasaNominalAnual || 0),
      }))
      .filter(p => p.tna > 0)
      .sort((a, b) => b.tna - a.tna)  // mayor TNA primero
      .slice(0, 6)
      .map(p => ({ ...p, tea: Math.round(tea_pf(p.tna) * 100) / 100 }));
  }

  // ── Respuesta ──
  return new Response(JSON.stringify({
    ok: true,
    ts: new Date().toISOString(),
    riesgoPais,
    inflacion,
    plazosFixed,
    tamar: null, // BCRA no expone TAMAR en JSON público aún
  }), { status: 200, headers });
}
