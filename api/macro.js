export const config = { runtime: 'edge' };

async function sf(url, ms = 4000) {
  const c = new AbortController(), t = setTimeout(() => c.abort(), ms);
  try {
    const r = await fetch(url, { signal: c.signal, headers: { 'Accept': 'application/json', 'User-Agent': 'rulitos/1.0' } });
    clearTimeout(t);
    if (!r.ok) return null;
    return r.json();
  } catch { clearTimeout(t); return null; }
}

export default async function handler(req) {
  const h = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=600',
  };
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: h });

  const today = new Date().toISOString().slice(0, 10);
  const desde = new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10);
  const [rpData, infData, pfData, tamarData, rpHistData] = await Promise.all([
    sf('https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais/ultimo'),
    sf('https://api.argentinadatos.com/v1/finanzas/indices/inflacion'),
    sf('https://api.argentinadatos.com/v1/finanzas/tasas/plazoFijo'),
    sf(`https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias/6?desde=${desde}&hasta=${today}`),
    sf('https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais'),
  ]);

  // Riesgo pais
  let riesgoPais = null;
  if (rpData) {
    if (typeof rpData === 'number') riesgoPais = rpData;
    else if (rpData?.valor != null) riesgoPais = rpData.valor;
    else if (rpData?.riesgoPais != null) riesgoPais = rpData.riesgoPais;
    else if (Array.isArray(rpData) && rpData.length) riesgoPais = rpData[rpData.length - 1]?.valor;
  }

  // Inflacion
  let inflacion = null;
  if (Array.isArray(infData) && infData.length) {
    const s = [...infData].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    if (s[0]?.valor != null) inflacion = { valor: s[0].valor, fecha: s[0].fecha };
  } else if (infData?.valor != null) {
    inflacion = { valor: infData.valor, fecha: infData.fecha };
  }

  // Plazo fijo
  let plazosFixed = [];
  if (Array.isArray(pfData) && pfData.length) {
    plazosFixed = pfData
      .map(p => {
        const rawTna = parseFloat(p.tnaClientes ?? p.tna ?? 0);
        // argentinadatos devuelve tnaClientes como decimal (0.22 = 22%)
        const tna = rawTna > 0 && rawTna < 2 ? rawTna * 100 : rawTna;
        return { banco: p.entidad || p.banco || p.nombre || '?', tna };
      })
      .filter(p => p.tna > 0)
      .sort((a, b) => b.tna - a.tna)
      .slice(0, 6)
      .map(p => ({ ...p, tea: +((Math.pow(1 + p.tna / 100 / 12, 12) - 1) * 100).toFixed(2) }));
  }

  // TAMAR (variable 6 = tasa de política monetaria BCRA)
  let tamar = null;
  if (Array.isArray(tamarData?.results) && tamarData.results.length) {
    const sorted = [...tamarData.results].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    if (sorted[0]?.valor != null) tamar = { valor: parseFloat(sorted[0].valor), fecha: sorted[0].fecha };
  }

  // Riesgo país histórico (últimos 90 puntos)
  let riesgoPaisHist = [];
  if (Array.isArray(rpHistData) && rpHistData.length) {
    const sorted = [...rpHistData].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    riesgoPaisHist = sorted.slice(-90).map(p => ({ fecha: p.fecha, valor: p.valor }));
  }

  const source = (riesgoPais != null || inflacion != null || plazosFixed.length > 0) ? 'live' : 'error';
  return new Response(JSON.stringify({
    ok: true,
    source,
    ts: new Date().toISOString(),
    riesgoPais,
    riesgoPaisHist,
    inflacion,
    plazosFixed,
    tamar,
  }), { status: 200, headers: h });
}
