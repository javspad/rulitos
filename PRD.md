# PRD — Rulitos: Roadmap Completo

## Introducción
Dashboard financiero argentino en Vercel. El diagnóstico detectó APIs caídas, código JS corrupto (ya corregido), y mejoras pendientes de datos en vivo, arquitectura y UX. Este PRD ejecuta el roadmap completo en orden de prioridad.

## Estado del proyecto al iniciar
- `index.html` ya reconstruido (commit ed7a90d)
- `api/macro.js` ya corregido con api.argentinadatos.com
- `api/lecaps.js` ya tiene edge runtime
- Las APIs de caucion y lecaps usan fallback (fuentes externas caídas)

## Objetivos
1. Restaurar datos en vivo para caucion (via BYMA)
2. Reducir timeouts en LECAPs con estrategia de caché
3. Sacar API keys del código fuente
4. Agregar proxy /api/dolar para independencia de terceros
5. Actualizar fallback LECAPs con instrumentos 2027
6. Mejorar indicador visual live/fallback en UI
7. Separar JS de index.html a archivo dedicado
8. Agregar TAMAR desde BCRA API
9. Agregar gráfico histórico de riesgo país
10. PWA offline con caché de últimos datos conocidos

## No-Goals
- No rediseñar el layout ni cambiar el diseño visual
- No agregar autenticación ni usuarios
- No cambiar el stack (sigue siendo Vercel Edge + vanilla JS)
- No tocar archivos en /dist o /src (no se usan)

---

## User Stories

### US-001: Caucion live via BYMA
**Descripción:** Como usuario, quiero ver tasas de caución en tiempo real en lugar del fallback estático, obteniendo los datos de BYMA (que ya funciona para LECAPs).

**Criterios de aceptación:**
- [x] `api/caucion.js` intenta fetch a `https://open.bymadata.com.ar/assets/json/cauciones.json` con timeout de 5s
- [x] Si BYMA responde, parsear los ítems: extraer `codigoPlazo` (o `plazo`) y `Ultimatasa` (o `lastRate` o `tasa`)
- [x] Mantener el fallback de MAE como segundo intento antes del hardcoded
- [x] Response incluye `source: 'byma' | 'mae' | 'fallback'`
- [x] Verificar en producción que `/api/caucion` retorna `source: 'byma'` con datos reales

### US-002: LECAPs — estrategia de caché para evitar 504
**Descripción:** Como usuario, quiero que LECAPs cargue siempre sin 504, usando una estrategia de caché más agresiva cuando BYMA tarda.

**Criterios de aceptación:**
- [x] En `api/lecaps.js` aumentar timeout interno a 8s
- [x] Cambiar `Cache-Control` a `s-maxage=3600, stale-while-revalidate=86400` (1h fresco, 24h stale)
- [x] Si BYMA responde con 0 LECAPs válidas (no solo <3), caer a fallback en vez de reintentar
- [x] En `vercel.json` aumentar `maxDuration` de lecaps a 15s
- [x] Verificar que `/api/lecaps` no retorna 504 en 3 intentos consecutivos

### US-003: Actualizar fallback LECAPs con instrumentos 2027
**Descripción:** Como usuario, quiero que el fallback de LECAPs incluya instrumentos del año 2027 que ya están en el mercado.

**Criterios de aceptación:**
- [ ] En `api/lecaps.js` agregar al array `FALLBACK` los siguientes instrumentos 2027: S30E7 (ene-27), S27F7 (feb-27), S31M7 (mar-27), S30A7 (abr-27)
- [ ] TNAs aproximadas: 40.0%, 40.2%, 40.4%, 40.6%
- [ ] `diasRestantes` se calcula dinámicamente (ya usa `diasR()`)
- [ ] Los instrumentos vencidos se filtran automáticamente por `filter(l => diasR(l.vto) > 0)`
- [ ] Verificar que fallback retorna al menos 9 items activos

### US-004: Mover API keys de MAE a variables de entorno
**Descripción:** Como desarrollador, quiero que las API keys de MAE no estén hardcodeadas en el código fuente para no exponerlas en el repositorio público.

**Criterios de aceptación:**
- [ ] En `api/caucion.js` reemplazar las constantes `API_KEY_UAT` y `API_KEY_PROD` por `process.env.MAE_API_KEY_UAT` y `process.env.MAE_API_KEY_PROD`
- [ ] Agregar fallback: si la env var no está definida, usar string vacío (la función MAE fallará y caerá a BYMA)
- [ ] Crear archivo `.env.example` en la raíz con las variables documentadas (sin valores reales)
- [ ] Actualizar `.gitignore` para incluir `.env` si no está ya
- [ ] El comportamiento en producción no cambia si las env vars están seteadas en Vercel

### US-005: Agregar proxy /api/dolar
**Descripción:** Como desarrollador, quiero que el frontend consuma dólar a través de un proxy propio para no depender directamente de dolarapi.com.

**Criterios de aceptación:**
- [ ] Crear `api/dolar.js` como Edge Function
- [ ] Hacer fetch a `https://dolarapi.com/v1/dolares` con timeout 5s
- [ ] Mismo patrón de CORS y `Cache-Control: s-maxage=300, stale-while-revalidate=120`
- [ ] Fallback hardcoded con 7 tipos de cambio con valores aproximados actuales (no puede quedar vacío)
- [ ] `export const config = { runtime: 'edge' }`
- [ ] Agregar `api/dolar.js` a `vercel.json` functions con `maxDuration: 10`
- [ ] En `index.html`, cambiar la llamada en `fa()` de `'https://dolarapi.com/v1/dolares'` a `'/api/dolar'`

### US-006: Mejorar indicador live/fallback en UI
**Descripción:** Como usuario, quiero saber claramente qué datos son en tiempo real y cuáles son de referencia, con indicadores más visibles.

**Criterios de aceptación:**
- [ ] En `index.html`, en la función `rMac()` agregar indicador de source para `plazosFixed`: si `MAC.plazosFixed.length > 0` mostrar punto verde + "argentinadatos", sino mostrar punto gris + "sin datos"
- [ ] En la sección de cotizaciones dólar, mostrar badge "LIVE" o "DEMO" según si DOL tiene datos reales (`DOL.length > 0` con `fechaActualizacion` reciente vs vacío)
- [ ] En la barra superior (`#ldot` / `#ltxt`), mostrar texto más informativo: "En vivo — Dólar, Macro, LECAPs" o listar qué fuentes fallaron: "Parcial — Sin caucion live"
- [ ] Verificar que los indicadores se ven correctamente en tema oscuro y claro

### US-007: Agregar TAMAR / Tasa de Política Monetaria desde BCRA
**Descripción:** Como usuario, quiero ver la Tasa de Política Monetaria (TAMAR) en el panel macro para tener referencia del piso de tasas del BCRA.

**Criterios de aceptación:**
- [ ] En `api/macro.js`, agregar fetch a `https://api.bcra.gob.ar/estadisticas/v2.0/datosvariable/6/2025-01-01/2026-12-31` (variable 6 = pases pasivos / tasa referencia)
- [ ] Parsear el último valor de la serie: `data.results[data.results.length-1]` → `{ valor, fecha }`
- [ ] Reemplazar `tamar: null` en la response con `{ valor, fecha }` o `null` si falla
- [ ] En `index.html`, en la función `rMac()`, mostrar `tamar` en el panel macro: nuevo div con label "T. Política" y el valor en %
- [ ] Si `tamar` es null, mostrar `--`
- [ ] Verificar que el panel macro muestra 4 valores: Riesgo País, Inflación, T. Política, Plazo Fijo

### US-008: Separar JavaScript de index.html a app.js
**Descripción:** Como desarrollador, quiero que el código JavaScript esté en un archivo separado `app.js` para evitar el problema de ensamblado que causó la corrupción anterior.

**Criterios de aceptación:**
- [ ] Crear `/app.js` en la raíz del proyecto con todo el contenido del `<script>` principal de `index.html` (desde `'use strict';` hasta el último `refresh();`)
- [ ] En `index.html`, reemplazar el bloque `<script>...</script>` con `<script src="/app.js" defer></script>`
- [ ] El `<script>` de Chart.js CDN queda tal cual (antes de app.js)
- [ ] Verificar que `app.js` tiene exactamente el mismo JS que estaba en index.html (sin cambios funcionales)
- [ ] Verificar que la página carga y el dashboard funciona (dólar visible, calculadora responde)

### US-009: Gráfico histórico de riesgo país
**Descripción:** Como usuario, quiero ver la evolución histórica del riesgo país en un gráfico de línea en la sección macro.

**Criterios de aceptación:**
- [ ] En `api/macro.js`, agregar fetch a `https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais` (serie histórica, últimos 365 días)
- [ ] Agregar campo `riesgoPaisHist: [{ fecha, valor }, ...]` en la response con los últimos 90 puntos máximo (para no sobrecargar)
- [ ] En `index.html`, dentro del panel macro, agregar un `<canvas id="rp-chart">` de altura 120px debajo del card de riesgo país
- [ ] En `rMac()`, si `MAC.riesgoPaisHist` tiene datos, renderizar un Chart.js line chart minimal (sin eje Y, sin leyenda, solo la línea dorada)
- [ ] Si no hay datos históricos, no mostrar el canvas (display:none)
- [ ] Verificar que el gráfico se ve en tema oscuro y claro

### US-010: PWA offline — cachear últimos datos conocidos
**Descripción:** Como usuario, quiero que el dashboard muestre los últimos datos disponibles cuando no tengo conexión, en lugar de una pantalla vacía.

**Criterios de aceptación:**
- [ ] En `app.js` (o `index.html`), después de cada fetch exitoso guardar en `localStorage`: `localStorage.setItem('rulitos-cache', JSON.stringify({dol, lec, mac, cau, ts: Date.now()}))`
- [ ] Al inicio de `fa()`, si el fetch falla (o mientras carga), intentar leer de `localStorage` como datos de respaldo
- [ ] Si se usan datos de caché localStorage, el indicador superior muestra "Caché local — [hora del cache]" en color amarillo/naranja en vez de rojo error
- [ ] El caché de localStorage expira después de 24 horas (no mostrar datos de más de 24h)
- [ ] Actualizar `sw.js` para que precachee `app.js` además de los assets ya cacheados
- [ ] Verificar que desconectando la red el dashboard muestra datos (los del último fetch) y no una pantalla vacía
