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

  const [rpData, infData, pfData] = await Promise.all([
    sf('https://argentinadatos.com/v1/finanzas/indices/riesgo-pais/ultimo'),
    sf('https://argentinadatos.com/v1/finanzas/indices/inflacion'),
    sf('https://argentinadatos.com/v1/finanzas/tasas/plazo-fijo'),
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
      .map(p => ({ banco: p.entidad || p.banco || p.nombre || '?', tna: parseFloat(p.tna || 0) }))
      .filter(p => p.tna > 0)
      .sort((a, b) => b.tna - a.tna)
      .slice(0, 6)
      .map(p => ({ ...p, tea: +((Math.pow(1 + p.tna / 100 / 12, 12) - 1) * 100).toFixed(2) }));
  }

  return new Response(JSON.stringify({
    ok: true,
    ts: new Date().toISOString(),
    riesgoPais,
    inflacion,
    plazosFixed,
    tamar: null,
  }), { status: 200, headers: h });
}
