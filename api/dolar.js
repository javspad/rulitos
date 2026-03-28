export const config = { runtime: 'edge' };

const FALLBACK = [
  { casa: 'oficial', nombre: 'Oficial', compra: 1050, venta: 1090, fechaActualizacion: new Date().toISOString() },
  { casa: 'blue', nombre: 'Blue', compra: 1265, venta: 1285, fechaActualizacion: new Date().toISOString() },
  { casa: 'bolsa', nombre: 'MEP', compra: 1240, venta: 1250, fechaActualizacion: new Date().toISOString() },
  { casa: 'contadoconliqui', nombre: 'CCL', compra: 1255, venta: 1265, fechaActualizacion: new Date().toISOString() },
  { casa: 'mayorista', nombre: 'Mayorista', compra: 1045, venta: 1050, fechaActualizacion: new Date().toISOString() },
  { casa: 'cripto', nombre: 'Cripto', compra: 1270, venta: 1280, fechaActualizacion: new Date().toISOString() },
  { casa: 'tarjeta', nombre: 'Tarjeta', compra: 1744, venta: 1744, fechaActualizacion: new Date().toISOString() },
];

export default async function handler(req) {
  const h = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=120',
  };
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: h });

  const c = new AbortController();
  setTimeout(() => c.abort(), 5000);
  try {
    const r = await fetch('https://dolarapi.com/v1/dolares', {
      signal: c.signal,
      headers: { 'Accept': 'application/json', 'User-Agent': 'rulitos/1.0' },
    });
    if (r.ok) {
      const data = await r.json();
      if (Array.isArray(data) && data.length > 0) {
        return new Response(JSON.stringify(data), { status: 200, headers: h });
      }
    }
  } catch {}

  return new Response(JSON.stringify(FALLBACK), { status: 200, headers: h });
}
