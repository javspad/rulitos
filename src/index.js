<!DOCTYPE html>
<html lang="es-AR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Rulitos — Cotizaciones del Dólar y Finanzas Argentina en Tiempo Real</title>
  <meta name="description" content="Cotizaciones del dólar oficial, blue, MEP, CCL, mayorista y cripto. Calculadora de caución vs LECAPs, arbitrajes y contexto macro argentino. Datos en tiempo real." />
  <meta name="keywords" content="dólar hoy, dólar blue, dólar MEP, dólar CCL, cotización dólar argentina, LECAPs, cauciones, finanzas argentina, arbitraje dólar, riesgo pais" />
  <meta name="author" content="Rulitos" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
  <link rel="canonical" href="https://rulitos.vercel.app/" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://rulitos.vercel.app/" />
  <meta property="og:title" content="Rulitos — Cotizaciones del Dólar Argentina en Tiempo Real" />
  <meta property="og:description" content="Dólar blue, MEP, CCL, oficial y cripto. Calculadora de caución vs LECAPs. Arbitrajes y contexto macro. Gratis." />
  <meta property="og:image" content="https://rulitos.vercel.app/icons/og-image.png" />
  <meta property="og:locale" content="es_AR" />
  <meta property="og:site_name" content="Rulitos" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Rulitos — Cotizaciones del Dólar Argentina" />
  <meta name="twitter:description" content="Dólar blue, MEP, CCL, oficial y cripto en tiempo real. Calculadora de caución vs LECAPs." />
  <meta name="twitter:image" content="https://rulitos.vercel.app/icons/og-image.png" />
  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#0f0f0d" />
  <meta name="mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="Rulitos" />
  <link rel="apple-touch-icon" href="/icons/icon-192.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@300;400;500;600&display=swap" rel="stylesheet" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js" defer></script>
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"WebApplication","name":"Rulitos","url":"https://rulitos.vercel.app","description":"Plataforma de cotizaciones financieras argentinas en tiempo real.","applicationCategory":"FinanceApplication","operatingSystem":"All","offers":{"@type":"Offer","price":"0","priceCurrency":"ARS"},"author":{"@type":"Organization","name":"Rulitos","email":"rulitosproject@gmail.com"},"inLanguage":"es-AR"}</script>
  <!-- GA4: reemplazá G-XXXXXXXXXX con tu Measurement ID -->
  <!-- <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XXXXXXXXXX',{anonymize_ip:true});</script> -->
  <style>
:root{--bg:#0f0f0d;--surface:#1a1a16;--surface2:#222220;--surface3:#2a2a26;--border:#2c2c28;--border-s:#1e1e1a;--gold:#c9a84c;--gold-l:#e8c97a;--gold-d:#7a6330;--gold-g:rgba(201,168,76,.10);--text:#f0ede6;--text2:#b8b4ac;--text3:#787570;--text4:#484542;--green:#5a9e7c;--red:#c0614e;--blue:#5a8fa8;--fd:'Cormorant Garamond',Georgia,serif;--fu:'DM Sans',system-ui,sans-serif;--fm:'JetBrains Mono',monospace;--r:6px;--rl:10px}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}html{font-size:16px;scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:var(--fu);min-height:100vh;-webkit-font-smoothing:antialiased;overflow-x:hidden}
body::before{content:'';position:fixed;inset:0;z-index:0;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");mix-blend-mode:overlay}
body::after{content:'';position:fixed;top:-100px;left:50%;transform:translateX(-50%);width:800px;height:280px;pointer-events:none;z-index:0;background:radial-gradient(ellipse,rgba(201,168,76,.05) 0%,transparent 65%)}
#offline-banner{position:fixed;bottom:0;left:0;right:0;z-index:999;background:rgba(30,30,26,.97);backdrop-filter:blur(12px);border-top:1px solid var(--gold-d);padding:12px 24px;display:none;align-items:center;justify-content:space-between;gap:16px}
#offline-banner.show{display:flex}
.ob-text{font-family:var(--fu);font-size:12px;font-weight:300;color:var(--text3)}.ob-text strong{color:var(--gold);font-weight:400}
.ob-close{background:none;border:1px solid var(--border);border-radius:var(--r);color:var(--text3);font-family:var(--fu);font-size:11px;padding:5px 12px;cursor:pointer;transition:all .2s}.ob-close:hover{border-color:var(--gold-d);color:var(--gold)}
.hdr{position:sticky;top:0;z-index:100;background:rgba(15,15,13,.94);backdrop-filter:blur(18px);border-bottom:1px solid var(--border)}
.hdr-in{max-width:1280px;margin:0 auto;padding:0 32px;height:62px;display:flex;align-items:center;justify-content:space-between;gap:20px}
.logo{display:flex;align-items:baseline;gap:2px;text-decoration:none}
.logo-w{font-family:var(--fd);font-size:26px;font-weight:600;color:var(--text);letter-spacing:.04em;line-height:1}
.logo-d{font-family:var(--fd);font-size:26px;color:var(--gold);line-height:1}
.logo-t{margin-left:10px;font-family:var(--fu);font-size:10px;font-weight:300;letter-spacing:.16em;text-transform:uppercase;color:var(--text3);padding:3px 9px;border:1px solid var(--border);border-radius:2px}
.hdr-r{display:flex;align-items:center;gap:18px}
.live{display:flex;align-items:center;gap:7px;font-family:var(--fm);font-size:11px;color:var(--text3)}
.dot{width:6px;height:6px;border-radius:50%;background:var(--gold);flex-shrink:0}
.dot.pulse{animation:dp 2.4s ease-in-out infinite}.dot.load{background:var(--text3);animation:none}.dot.err{background:var(--red);animation:none}
@keyframes dp{0%{box-shadow:0 0 0 0 rgba(201,168,76,.5)}60%{box-shadow:0 0 0 5px rgba(201,168,76,0)}100%{box-shadow:0 0 0 0 rgba(201,168,76,0)}}
#uptime{font-family:var(--fm);font-size:11px;color:var(--text4)}
.rbtn{width:28px;height:28px;background:none;border:1px solid var(--border);border-radius:var(--r);color:var(--text3);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s}
.rbtn:hover{border-color:var(--gold-d);color:var(--gold)}.rbtn.spin svg{animation:rot .8s linear infinite}
@keyframes rot{to{transform:rotate(360deg)}}
.wrap{position:relative;z-index:1;max-width:1280px;margin:0 auto;padding:48px 32px 64px}
.sh{display:flex;align-items:center;gap:16px;margin-bottom:22px}
.sh-t{font-family:var(--fd);font-size:13px;font-weight:400;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);white-space:nowrap}
.sh-r{flex:1;height:1px;background:linear-gradient(to right,var(--border),transparent)}
.sh-s{font-family:var(--fu);font-size:11px;font-weight:300;color:var(--text4);letter-spacing:.04em;white-space:nowrap}
.cz-sec{margin-bottom:60px}
.cz-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:1px;background:var(--border);border:1px solid var(--border);border-radius:var(--rl);overflow:hidden}
.dc{background:var(--surface);padding:20px 16px 16px;position:relative;transition:background .2s;animation:fiu .4s ease both}
.dc:hover{background:var(--surface2)}
.dc::after{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:var(--gold);transform:scaleX(0);transform-origin:left;transition:transform .3s ease}
.dc:hover::after{transform:scaleX(1)}
@keyframes fiu{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.dc-type{font-family:var(--fu);font-size:10px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--text3);margin-bottom:14px}
.dc-cur{font-family:var(--fd);font-size:14px;color:var(--text3);vertical-align:super;margin-right:1px}
.dc-v{font-family:var(--fm);font-size:28px;font-weight:500;color:var(--text);letter-spacing:-.02em;line-height:1}
.dc-vl{font-family:var(--fu);font-size:9px;font-weight:300;letter-spacing:.1em;text-transform:uppercase;color:var(--text4);margin-bottom:10px}
.dc-bot{display:flex;align-items:center;justify-content:space-between;gap:6px;padding-top:10px;border-top:1px solid var(--border-s)}
.dc-cl{font-family:var(--fu);font-size:9px;font-weight:300;letter-spacing:.08em;color:var(--text4)}
.dc-c{font-family:var(--fm);font-size:12px;font-weight:300;color:var(--text3)}
.bp{display:inline-flex;align-items:center;font-family:var(--fm);font-size:10px;font-weight:500;padding:2px 6px;border-radius:2px}
.bp.up{background:rgba(201,168,76,.08);color:var(--gold);border:1px solid rgba(201,168,76,.14)}
.bp.hi{background:rgba(192,97,78,.08);color:var(--red);border:1px solid rgba(192,97,78,.14)}
.sk{background:linear-gradient(90deg,var(--surface) 25%,var(--surface2) 50%,var(--surface) 75%);background-size:400% 100%;animation:shim 1.6s ease-in-out infinite;border-radius:3px}
@keyframes shim{0%{background-position:100% 50%}100%{background-position:0% 50%}}
.macro-sec{margin-bottom:60px}
.macro-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);border:1px solid var(--border);border-radius:var(--rl);overflow:hidden}
.mc{background:var(--surface);padding:20px 18px}
.mc-title{font-family:var(--fu);font-size:10px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--text3);margin-bottom:14px}
.mc-val{font-family:var(--fm);font-size:26px;font-weight:500;letter-spacing:-.02em;color:var(--text);line-height:1;margin-bottom:4px}
.mc-val.rojo{color:var(--red)}.mc-val.dorado{color:var(--gold-l)}
.mc-sub{font-family:var(--fu);font-size:11px;font-weight:300;color:var(--text3)}
.mc-src{display:inline-flex;align-items:center;gap:5px;margin-top:10px;font-family:var(--fm);font-size:10px;color:var(--text4)}
.mc-dot{width:4px;height:4px;border-radius:50%}.mc-dot.live{background:var(--green)}.mc-dot.fb{background:var(--text4)}
.pf-list{display:flex;flex-direction:column;gap:7px}
.pf-row{display:flex;align-items:center;justify-content:space-between;gap:8px}
.pf-banco{font-family:var(--fu);font-size:11px;color:var(--text2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:120px}
.pf-tna{font-family:var(--fm);font-size:12px;font-weight:500;color:var(--gold)}
.pf-bar-w{flex:1;height:3px;background:var(--surface3);border-radius:2px;overflow:hidden}
.pf-bar{height:100%;background:var(--gold-d);border-radius:2px;transition:width .5s ease}
.arb-sec{margin-bottom:60px}
.tscroll{overflow-x:auto;border:1px solid var(--border);border-radius:var(--rl)}
.arbt{width:100%;border-collapse:collapse;font-family:var(--fm);font-size:12px;min-width:540px}
.arbt th{background:var(--surface2);padding:10px 14px;font-family:var(--fu);font-size:9px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--text3);text-align:center;border-bottom:1px solid var(--border);white-space:nowrap}
.arbt th:first-child{text-align:left;padding-left:18px;background:var(--surface);border-right:1px solid var(--border);font-size:8px;color:var(--text4)}
.arbt td{padding:8px 14px;text-align:center;border-bottom:1px solid var(--border-s);transition:background .12s;white-space:nowrap}
.arbt td:first-child{text-align:left;padding-left:18px;font-family:var(--fu);font-size:10px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--text2);background:var(--surface);border-right:1px solid var(--border)}
.arbt tr:last-child td{border-bottom:none}.arbt tr:hover td:not(:first-child){background:rgba(255,255,255,.018)}
.cp{color:var(--green);font-weight:500}.cn{color:var(--red)}.cz{color:var(--text4)}
.cd{background:var(--surface2)!important;color:var(--text4);font-size:14px}
.arb-note{font-family:var(--fu);font-size:12px;font-weight:300;color:var(--text4);margin-top:10px}
.arb-note strong{color:var(--text3);font-weight:400}
.chart-sec{margin-bottom:60px}
.chart-shell{border:1px solid var(--border);border-radius:var(--rl);background:var(--surface);padding:28px;position:relative;overflow:hidden}
.chart-shell::before{content:'';position:absolute;top:0;right:0;width:80px;height:80px;background:radial-gradient(circle at top right,rgba(201,168,76,.06),transparent 70%);pointer-events:none}
.chart-meta{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;margin-bottom:22px;flex-wrap:wrap}
.chart-title{font-family:var(--fd);font-size:20px;font-weight:400;color:var(--text)}
.chart-subtitle{font-family:var(--fu);font-size:12px;font-weight:300;color:var(--text3);margin-top:3px}
.chart-legend{display:flex;gap:18px;align-items:center;flex-wrap:wrap}
.leg-item{display:flex;align-items:center;gap:7px}
.leg-dot{width:8px;height:8px;border-radius:50%}
.leg-lbl{font-family:var(--fu);font-size:11px;font-weight:300;color:var(--text3)}
#chart-src{font-family:var(--fm);font-size:10px;color:var(--text4);margin-top:6px}
.chart-wrap{position:relative;height:260px}
.calc-sec{margin-bottom:60px}
.cshell{border:1px solid var(--border);border-radius:var(--rl);overflow:hidden;background:var(--surface)}
.cnav{display:flex;border-bottom:1px solid var(--border);background:var(--surface2)}
.cnav-b{flex:1;padding:13px 20px;background:none;border:none;border-bottom:2px solid transparent;margin-bottom:-1px;font-family:var(--fu);font-size:10px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--text3);cursor:pointer;transition:all .2s}
.cnav-b:hover{color:var(--text2)}.cnav-b.on{color:var(--gold);border-bottom-color:var(--gold);background:var(--surface)}
.cpanel{display:none;padding:28px 28px 32px}.cpanel.on{display:block}
.irow{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:18px}
.fld{display:flex;flex-direction:column;gap:7px}
.flbl{font-family:var(--fu);font-size:10px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--text3)}
.finp{background:var(--surface2);border:1px solid var(--border);border-radius:var(--r);padding:11px 13px;font-family:var(--fm);font-size:15px;color:var(--text);outline:none;transition:border-color .2s,box-shadow .2s;width:100%}
.finp::placeholder{color:var(--text4)}.finp:focus{border-color:var(--gold-d);box-shadow:0 0 0 3px rgba(201,168,76,.06)}
select.finp{cursor:pointer;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23787570'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 13px center;padding-right:34px}
select.finp option{background:#222220}
.plbl{font-family:var(--fu);font-size:10px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--text3);margin-bottom:9px}
.pgrid{display:grid;grid-template-columns:repeat(8,1fr);gap:5px;margin-bottom:26px}
.pb{padding:9px 4px;background:var(--surface2);border:1px solid var(--border);border-radius:var(--r);font-family:var(--fm);font-size:11px;color:var(--text3);cursor:pointer;text-align:center;transition:all .15s}
.pb:hover{border-color:var(--gold-d);color:var(--text2)}.pb.on{background:rgba(201,168,76,.09);border-color:var(--gold-d);color:var(--gold-l)}
.cdiv{height:1px;background:linear-gradient(to right,transparent,var(--border),transparent);margin:26px 0}
.rgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:26px}
.rc{background:var(--surface2);border:1px solid var(--border);border-radius:var(--r);padding:16px 14px;position:relative}
.rc.win{border-color:var(--gold-d);background:linear-gradient(135deg,var(--surface2) 0%,rgba(201,168,76,.04) 100%)}
.rc.win::before{content:'★ mejor';position:absolute;top:-1px;right:-1px;background:var(--gold);color:var(--bg);font-family:var(--fu);font-size:9px;font-weight:500;letter-spacing:.04em;padding:3px 8px;border-radius:0 var(--r) 0 var(--r)}
.rclbl{font-family:var(--fu);font-size:10px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--text3);margin-bottom:11px}
.rcv{font-family:var(--fm);font-size:22px;font-weight:500;color:var(--text);letter-spacing:-.02em;line-height:1;margin-bottom:3px}
.rcs{font-family:var(--fm);font-size:11px;font-weight:300;color:var(--text3);margin-bottom:9px}
.rcg{font-family:var(--fm);font-size:13px;font-weight:500;margin-bottom:5px}
.rcg.p{color:var(--green)}.rcg.n{color:var(--red)}.rcg.z{color:var(--text3)}
.rcu{font-family:var(--fm);font-size:10px;font-weight:300;color:var(--text4);padding-top:7px;border-top:1px solid var(--border-s)}
.rcu b{color:var(--text3);font-weight:400}
.fbox{background:var(--surface2);border:1px solid var(--border);border-radius:var(--r);padding:16px 18px;margin-bottom:26px;display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px}
.fi-label{font-family:var(--fu);font-size:9px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--text4);margin-bottom:5px}
.fi-val{font-family:var(--fm);font-size:13px;color:var(--text2)}
.fi-val .hi{color:var(--gold-l);font-weight:500}.fi-val .lo{color:var(--text3)}
.esc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;margin-bottom:26px}
.esc-c{background:var(--surface2);border:1px solid var(--border);border-radius:var(--r);padding:14px}
.esc-d{font-family:var(--fm);font-size:10px;color:var(--text4);letter-spacing:.04em;margin-bottom:8px;text-transform:uppercase}
.esc-bw{height:4px;background:var(--surface3);border-radius:2px;margin-bottom:10px;overflow:hidden}
.esc-b{height:100%;border-radius:2px;transition:width .6s ease}
.esc-b.c{background:var(--blue)}.esc-b.l{background:var(--gold)}
.esc-leg{display:flex;justify-content:space-between}
.esc-it{display:flex;flex-direction:column;gap:2px}
.esc-il{font-family:var(--fu);font-size:9px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--text4)}
.esc-iv{font-family:var(--fm);font-size:13px;font-weight:500;color:var(--text2)}
.esc-iv.win{color:var(--gold-l)}
.ltwrap{border:1px solid var(--border);border-radius:var(--r);overflow:hidden}
.lt{width:100%;border-collapse:collapse;font-family:var(--fm);font-size:12px}
.lt th{background:var(--surface3);padding:8px 13px;font-family:var(--fu);font-size:9px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--text3);text-align:center;border-bottom:1px solid var(--border)}
.lt th:first-child{text-align:left}
.lt td{padding:8px 13px;text-align:center;border-bottom:1px solid var(--border-s);color:var(--text2)}
.lt td:first-child{text-align:left;color:var(--text)}
.lt tr:last-child td{border-bottom:none}.lt tr:hover td{background:rgba(255,255,255,.02)}
.lt tr.nearest td{background:rgba(201,168,76,.05)}.lt tr.nearest td:first-child{border-left:2px solid var(--gold-d)}
.tnac{color:var(--gold);font-weight:500}.prec{color:var(--blue)}
.wlbl{display:inline-block;font-family:var(--fu);font-size:8px;font-weight:500;letter-spacing:.06em;color:var(--gold);background:rgba(201,168,76,.1);border:1px solid rgba(201,168,76,.2);padding:1px 5px;border-radius:2px;margin-left:6px;vertical-align:middle}
.sbadge{display:inline-flex;align-items:center;gap:5px;font-family:var(--fm);font-size:10px;color:var(--text4);padding:3px 8px;border:1px solid var(--border);border-radius:2px}
.sbadge .sd{width:5px;height:5px;border-radius:50%}
.sd.live{background:var(--green)}.sd.fb{background:var(--text4)}
.nota{margin-top:12px;padding:10px 14px;background:rgba(201,168,76,.04);border-left:2px solid var(--gold-d);border-radius:0 var(--r) var(--r) 0;font-family:var(--fu);font-size:11px;font-weight:300;color:var(--text3);line-height:1.6}
.nota strong{color:var(--gold);font-weight:400}
.cngrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(148px,1fr));gap:9px;margin-top:22px}
.cnc{background:var(--surface2);border:1px solid var(--border);border-radius:var(--r);padding:14px 13px;transition:border-color .2s}
.cnc:hover{border-color:var(--gold-d)}
.cnc-l{font-family:var(--fu);font-size:10px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--text3);margin-bottom:7px}
.cnc-v{font-family:var(--fm);font-size:17px;font-weight:500;color:var(--text);letter-spacing:-.01em;margin-bottom:3px}
.cnc-r{font-family:var(--fm);font-size:10px;font-weight:300;color:var(--text4)}
.ftr{position:relative;z-index:1;background:var(--surface);border-top:1px solid var(--border)}
.contact-band{border-bottom:1px solid var(--border);background:linear-gradient(to right,transparent,rgba(201,168,76,.03),transparent)}
.contact-band-in{max-width:1280px;margin:0 auto;padding:20px 32px;display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap}
.cb-title{font-family:var(--fd);font-size:18px;font-weight:400;color:var(--text);letter-spacing:.02em;margin-bottom:4px}
.cb-title span{font-style:italic;color:var(--gold)}
.cb-sub{font-family:var(--fu);font-size:12px;font-weight:300;color:var(--text3)}
.cb-right{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.cb-email{display:inline-flex;align-items:center;gap:8px;font-family:var(--fm);font-size:12px;color:var(--text2);background:var(--surface2);border:1px solid var(--border);border-radius:var(--r);padding:9px 16px;text-decoration:none;transition:all .2s;letter-spacing:.02em}
.cb-email:hover{border-color:var(--gold-d);color:var(--gold-l)}
.cb-copy{font-family:var(--fu);font-size:11px;font-weight:300;color:var(--text4);letter-spacing:.04em}
.ftr-base{max-width:1280px;margin:0 auto;padding:20px 32px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
.ftr-b{font-family:var(--fd);font-size:18px;font-weight:400;color:var(--text3);letter-spacing:.04em}
.ftr-b span{color:var(--gold)}
.ftr-c{font-family:var(--fu);font-size:11px;font-weight:300;color:var(--text4)}
.ftr-a{font-family:var(--fm);font-size:10px;color:var(--text4)}
.ftr-a a{color:var(--text3);text-decoration:none}.ftr-a a:hover{color:var(--gold)}
.ftr-disc{max-width:1280px;margin:0 auto;padding:0 32px 20px;font-family:var(--fu);font-size:10px;font-weight:300;color:var(--text4);line-height:1.7}
@media(max-width:1100px){.cz-grid{grid-template-columns:repeat(4,1fr)}.macro-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:768px){.hdr-in{padding:0 18px}.wrap{padding:28px 18px 60px}.logo-t{display:none}.cz-grid{grid-template-columns:repeat(2,1fr)}.macro-grid{grid-template-columns:1fr 1fr}.irow{grid-template-columns:1fr}.rgrid{grid-template-columns:1fr}.pgrid{grid-template-columns:repeat(4,1fr)}.cpanel{padding:18px}#uptime{display:none}.ftr-base,.contact-band-in,.ftr-disc{padding-left:18px;padding-right:18px}.contact-band-in{flex-direction:column;align-items:flex-start}.chart-wrap{height:200px}}
@media(max-width:480px){.cz-grid{grid-template-columns:repeat(2,1fr)}.macro-grid{grid-template-columns:1fr}}
  </style>
</head>
<body>
<div id="offline-banner">
  <div class="ob-text"><strong>Sin conexión</strong> — mostrando última cotización cacheada.</div>
  <button class="ob-close" onclick="document.getElementById('offline-banner').classList.remove('show')">✕</button>
</div>
<header class="hdr">
  <div class="hdr-in">
    <a class="logo" href="/" aria-label="Rulitos inicio">
      <span class="logo-w">rulitos</span><span class="logo-d">.</span>
      <span class="logo-t">Finanzas AR</span>
    </a>
    <div class="hdr-r">
      <div class="live" aria-live="polite"><div class="dot load" id="ldot"></div><span id="ltxt">Cargando</span></div>
      <span id="uptime"></span>
      <button class="rbtn" id="rbtn" title="Actualizar" onclick="refresh()">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>
      </button>
    </div>
  </div>
</header>
<main class="wrap" id="main">
  <section class="cz-sec" id="cotizaciones">
    <div class="sh"><span class="sh-t">Cotizaciones</span><div class="sh-r"></div><span class="sh-s" id="cz-sub">Todas las bandas · Tiempo real</span></div>
    <div class="cz-grid" id="czgrid">
      <div class="dc" style="animation-delay:.00s"><div class="sk" style="width:50px;height:10px;margin-bottom:16px">&nbsp;</div><div class="sk" style="width:82px;height:27px;margin-bottom:8px">&nbsp;</div><div class="sk" style="width:42px;height:8px;margin-bottom:12px">&nbsp;</div><div class="sk" style="width:68px;height:10px">&nbsp;</div></div>
      <div class="dc" style="animation-delay:.04s"><div class="sk" style="width:38px;height:10px;margin-bottom:16px">&nbsp;</div><div class="sk" style="width:82px;height:27px;margin-bottom:8px">&nbsp;</div><div class="sk" style="width:42px;height:8px;margin-bottom:12px">&nbsp;</div><div class="sk" style="width:68px;height:10px">&nbsp;</div></div>
      <div class="dc" style="animation-delay:.08s"><div class="sk" style="width:32px;height:10px;margin-bottom:16px">&nbsp;</div><div class="sk" style="width:82px;height:27px;margin-bottom:8px">&nbsp;</div><div class="sk" style="width:42px;height:8px;margin-bottom:12px">&nbsp;</div><div class="sk" style="width:68px;height:10px">&nbsp;</div></div>
      <div class="dc" style="animation-delay:.12s"><div class="sk" style="width:32px;height:10px;margin-bottom:16px">&nbsp;</div><div class="sk" style="width:82px;height:27px;margin-bottom:8px">&nbsp;</div><div class="sk" style="width:42px;height:8px;margin-bottom:12px">&nbsp;</div><div class="sk" style="width:68px;height:10px">&nbsp;</div></div>
      <div class="dc" style="animation-delay:.16s"><div class="sk" style="width:56px;height:10px;margin-bottom:16px">&nbsp;</div><div class="sk" style="width:82px;height:27px;margin-bottom:8px">&nbsp;</div><div class="sk" style="width:42px;height:8px;margin-bottom:12px">&nbsp;</div><div class="sk" style="width:68px;height:10px">&nbsp;</div></div>
      <div class="dc" style="animation-delay:.20s"><div class="sk" style="width:44px;height:10px;margin-bottom:16px">&nbsp;</div><div class="sk" style="width:82px;height:27px;margin-bottom:8px">&nbsp;</div><div class="sk" style="width:42px;height:8px;margin-bottom:12px">&nbsp;</div><div class="sk" style="width:68px;height:10px">&nbsp;</div></div>
      <div class="dc" style="animation-delay:.24s"><div class="sk" style="width:40px;height:10px;margin-bottom:16px">&nbsp;</div><div class="sk" style="width:82px;height:27px;margin-bottom:8px">&nbsp;</div><div class="sk" style="width:42px;height:8px;margin-bottom:12px">&nbsp;</div><div class="sk" style="width:68px;height:10px">&nbsp;</div></div>
    </div>
  </section>
  <section class="macro-sec">
    <div class="sh"><span class="sh-t">Contexto Macro</span><div class="sh-r"></div><span class="sh-s" id="macro-sub">Cargando…</span></div>
    <div class="macro-grid">
      <div class="mc"><div class="mc-title">Riesgo País</div><div class="mc-val rojo" id="m-rp">—</div><div class="mc-sub">puntos básicos (EMBI)</div><div class="mc-src" id="m-rp-src"><div class="mc-dot fb"></div>cargando</div></div>
      <div class="mc"><div class="mc-title">Inflación mensual</div><div class="mc-val dorado" id="m-inf">—</div><div class="mc-sub" id="m-inf-f">último dato disponible</div><div class="mc-src" id="m-inf-src"><div class="mc-dot fb"></div>cargando</div></div>
      <div class="mc"><div class="mc-title">Plazo Fijo — Top TNA</div><div class="pf-list" id="m-pf"><div class="sk" style="height:12px;margin-bottom:8px">&nbsp;</div><div class="sk" style="height:12px;margin-bottom:8px">&nbsp;</div><div class="sk" style="height:12px">&nbsp;</div></div></div>
      <div class="mc"><div class="mc-title">LECAPs</div><div class="mc-val" id="m-lec" style="font-size:20px">—</div><div class="mc-sub" id="m-lec-s">TNA promedio curva</div><div class="mc-src" id="m-lec-src"><div class="mc-dot fb"></div>cargando</div></div>
    </div>
  </section>
  <section class="arb-sec">
    <div class="sh"><span class="sh-t">Arbitrajes</span><div class="sh-r"></div><span class="sh-s">% ganancia comprando fila → vendiendo columna</span></div>
    <div class="tscroll"><table class="arbt" id="arbt"><tbody><tr><td colspan="8" style="text-align:center;padding:24px;color:var(--text4);font-family:var(--fu);font-size:12px">Cargando…</td></tr></tbody></table></div>
    <p class="arb-note"><strong>Verde</strong> = ganancia · <strong>Rojo</strong> = pérdida · Diagonal = misma banda</p>
  </section>
  <section class="chart-sec">
    <div class="sh"><span class="sh-t">Curva de Rendimientos</span><div class="sh-r"></div><span class="sh-s">LECAPs · Estructura temporal de tasas</span></div>
    <div class="chart-shell">
      <div class="chart-meta">
        <div><div class="chart-title">Estructura Temporal de Tasas</div><div class="chart-subtitle">TNA implícita por plazo al vencimiento</div><div id="chart-src">—</div></div>
        <div class="chart-legend"><div class="leg-item"><div class="leg-dot" style="background:var(--gold)"></div><span class="leg-lbl">LECAPs (TNA %)</span></div><div class="leg-item"><div class="leg-dot" style="background:var(--blue)"></div><span class="leg-lbl">Caución ingresada</span></div></div>
      </div>
      <div class="chart-wrap"><canvas id="ychart"></canvas></div>
    </div>
  </section>
  <section class="calc-sec" id="calculadora">
    <div class="sh"><span class="sh-t">Calculadora</span><div class="sh-r"></div><span class="sh-s">Caución · LECAPs · Proyección · Conversión</span></div>
    <div class="cshell">
      <nav class="cnav">
        <button class="cnav-b on" data-p="caucion">Caución vs. LECAPs</button>
        <button class="cnav-b" data-p="proyeccion">Proyección de Plazos</button>
        <button class="cnav-b" data-p="conv">Conversión ARS / USD</button>
      </nav>
      <div class="cpanel on" id="panel-caucion">
        <div class="irow">
          <div class="fld"><label class="flbl" for="inp-m">Monto en pesos</label><input id="inp-m" class="finp" type="text" placeholder="$ 1.000.000" value="1000000" autocomplete="off"/></div>
          <div class="fld"><label class="flbl" for="inp-t">TNA caución (%)</label><input id="inp-t" class="finp" type="number" placeholder="35" value="35" step="0.1" min="0" max="999"/></div>
        </div>
        <div class="plbl">Plazo</div>
        <div class="pgrid" id="pgrid">
          <button class="pb" data-d="1">1d</button><button class="pb" data-d="7">7d</button>
          <button class="pb on" data-d="30">30d</button><button class="pb" data-d="60">60d</button>
          <button class="pb" data-d="90">90d</button><button class="pb" data-d="120">120d</button>
          <button class="pb" data-d="180">180d</button><button class="pb" data-d="365">365d</button>
        </div>
        <div class="fbox" id="fbox"></div>
        <div class="rgrid" id="rg"></div>
        <div class="cdiv"></div>
        <div class="sh" style="margin-bottom:14px"><span class="sh-t" style="font-size:11px">Tasas LECAPs</span><div class="sh-r"></div><span id="lt-src" class="sbadge"><div class="sd fb"></div>cargando</span></div>
        <div class="ltwrap"><table class="lt"><thead><tr><th>Especie</th><th>Vencimiento</th><th>Días</th><th>Precio</th><th>TNA</th><th>TEM</th><th>TEA</th><th>Cap. $1M · 1 año</th></tr></thead><tbody id="ltbody"></tbody></table></div>
        <div class="nota"><strong>Importante:</strong> Las tasas de LECAPs son de referencia. Verificá en tu broker antes de operar. No constituye asesoramiento financiero.</div>
      </div>
      <div class="cpanel" id="panel-proyeccion">
        <div class="irow">
          <div class="fld"><label class="flbl" for="py-m">Monto en pesos</label><input id="py-m" class="finp" type="text" placeholder="$ 1.000.000" value="1000000" autocomplete="off"/></div>
          <div class="fld"><label class="flbl" for="py-t">TNA caución (%)</label><input id="py-t" class="finp" type="number" placeholder="35" value="35" step="0.1"/></div>
        </div>
        <div class="sh" style="margin-bottom:14px;margin-top:6px"><span class="sh-t" style="font-size:11px">Comparativa todos los plazos</span><div class="sh-r"></div><span class="sh-s">Caución vs. LECAP más cercana</span></div>
        <div class="esc-grid" id="esc-grid"></div>
        <div class="nota">Barra azul = caución, dorada = LECAP más cercana al plazo. Longitud proporcional a la ganancia.</div>
      </div>
      <div class="cpanel" id="panel-conv">
        <div class="irow">
          <div class="fld"><label class="flbl" for="cn-m">Monto</label><input id="cn-m" class="finp" type="text" placeholder="100.000" value="100000" autocomplete="off"/></div>
          <div class="fld"><label class="flbl" for="cn-d">Dirección</label><select id="cn-d" class="finp"><option value="au">Pesos → Dólares</option><option value="ua">Dólares → Pesos</option></select></div>
        </div>
        <div class="cngrid" id="cngrid"></div>
      </div>
    </div>
  </section>
</main>
<footer class="ftr">
  <div class="contact-band">
    <div class="contact-band-in">
      <div>
        <div class="cb-title">¿Querés anunciar en <span>Rulitos</span>?</div>
        <div class="cb-sub">Publicidad, sponsorships, consultas o sugerencias — escribinos directo.</div>
      </div>
      <div class="cb-right">
        <a class="cb-email" href="mailto:rulitosproject@gmail.com">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          rulitosproject@gmail.com
        </a>
        <span class="cb-copy">Respondemos en 24–48 h</span>
      </div>
    </div>
  </div>
  <div class="ftr-base">
    <span class="ftr-b">rulitos<span>.</span></span>
    <span class="ftr-c">Datos de mercado en tiempo real · Buenos Aires · Argentina</span>
    <span class="ftr-a"><a href="https://dolarapi.com" target="_blank" rel="noopener">dolarapi.com</a> · <a href="https://argentinadatos.com" target="_blank" rel="noopener">argentinadatos.com</a> · <a href="https://open.bymadata.com.ar" target="_blank" rel="noopener">bymadata.com.ar</a></span>
  </div>
  <div class="ftr-disc">La información publicada es de carácter informativo y no constituye asesoramiento financiero, de inversión, legal ni impositivo. Verificá siempre con fuentes oficiales y tu broker antes de operar. Rulitos no se responsabiliza por decisiones tomadas en base a la información aquí publicada. Contacto: <a href="mailto:rulitosproject@gmail.com" style="color:var(--text3)">rulitosproject@gmail.com</a></div>
</footer>
<script>
'use strict';
const ORDEN=['oficial','blue','bolsa','contadoconliqui','mayorista','tarjeta','cripto'];
const LBLS={oficial:'Oficial',blue:'Blue',bolsa:'MEP',contadoconliqui:'CCL',mayorista:'Mayorista',tarjeta:'Tarjeta',cripto:'Cripto'};
const LECAPS_FB=[
  {especie:'S30A6',vto:'2026-04-30',tna:37.8,tem:3.150,tea:45.35,precioMercado:null,diasRestantes:0},
  {especie:'S29M6',vto:'2026-05-29',tna:38.2,tem:3.183,tea:46.11,precioMercado:null,diasRestantes:0},
  {especie:'S30J6',vto:'2026-06-30',tna:38.5,tem:3.208,tea:46.72,precioMercado:null,diasRestantes:0},
  {especie:'S31L6',vto:'2026-07-31',tna:38.7,tem:3.225,tea:47.10,precioMercado:null,diasRestantes:0},
  {especie:'S31A6',vto:'2026-08-31',tna:39.0,tem:3.250,tea:47.70,precioMercado:null,diasRestantes:0},
  {especie:'S30S6',vto:'2026-09-30',tna:39.2,tem:3.267,tea:48.08,precioMercado:null,diasRestantes:0},
  {especie:'S30O6',vto:'2026-10-30',tna:39.4,tem:3.283,tea:48.47,precioMercado:null,diasRestantes:0},
  {especie:'S27N6',vto:'2026-11-27',tna:39.6,tem:3.300,tea:48.86,precioMercado:null,diasRestantes:0},
  {especie:'S28D6',vto:'2026-12-28',tna:39.8,tem:3.317,tea:49.25,precioMercado:null,diasRestantes:0},
];
let DOLARES=[],LECAPS=[],LECAPS_SRC='fallback',MACRO=null,PLAZO=30,yChart=null,timer,IS_OFFLINE=false;
function diasR(v){if(!v)return 0;const h=new Date();h.setHours(0,0,0,0);const d=new Date(v.includes('T')?v:v+'T00:00:00');return Math.max(0,Math.round((d-h)/86400000));}
function fmtV(s){return new Date(s.includes('T')?s:s+'T00:00:00').toLocaleDateString('es-AR',{day:'2-digit',month:'short',year:'numeric'});}
function tem(t){return t/12;}
function tea_c(t){return(Math.pow(1+t/100/365,365)-1)*100;}
function tea_l(t){return(Math.pow(1+t/100/12,12)-1)*100;}
function caucion(c,t,d){const i=c*(t/100)*(d/365);return{interes:i,total:c+i};}
function lecapR(c,t,d){const m=t/100/12;const i=c*(Math.pow(1+m,d/30)-1);return{interes:i,total:c+i};}
function lecapClose(dias){const v=LECAPS.filter(l=>(l.diasRestantes||0)>0);if(!v.length)return null;return v.reduce((a,b)=>Math.abs((b.diasRestantes||0)-dias)<Math.abs((a.diasRestantes||0)-dias)?b:a);}
const nm=v=>v==null||isNaN(v)?'—':Number(v).toLocaleString('es-AR',{minimumFractionDigits:0,maximumFractionDigits:0});
const n2=v=>v==null||isNaN(v)?'—':Number(v).toLocaleString('es-AR',{minimumFractionDigits:2,maximumFractionDigits:2});
const n3=v=>v==null||isNaN(v)?'—':Number(v).toLocaleString('es-AR',{minimumFractionDigits:3,maximumFractionDigits:3});
const pct=v=>(v>0?'+':'')+n2(v)+'%';
function setSt(s,t){document.getElementById('ldot').className='dot '+(s==='ok'?'pulse':s);document.getElementById('ltxt').textContent=t;}
function setTime(){document.getElementById('uptime').textContent=new Date().toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit',second:'2-digit'});}
function track(e,p={}){if(typeof gtag==='function')gtag('event',e,p);}
async function sf(url,ms=4500){const c=new AbortController(),t=setTimeout(()=>c.abort(),ms);try{const r=await fetch(url,{signal:c.signal});clearTimeout(t);if(r.headers?.get?.('X-Rulitos-Offline')==='true')IS_OFFLINE=true;if(!r.ok)return null;return r.json();}catch{clearTimeout(t);return null;}}
async function fetchAll(){const[dR,lR,mR]=await Promise.all([sf('https://dolarapi.com/v1/dolares'),sf('/api/lecaps'),sf('/api/macro')]);if(dR)DOLARES=dR;if(lR?.ok&&lR.data?.length>=3){LECAPS=lR.data.map(l=>({...l,diasRestantes:diasR(l.vto)}));LECAPS_SRC=lR.source;}else{LECAPS=LECAPS_FB.map(l=>({...l,diasRestantes:diasR(l.vto)}));LECAPS_SRC='fallback';}if(mR?.ok)MACRO=mR;}
function renderCZ(){const g=document.getElementById('czgrid');const vOf=(DOLARES.find(d=>d.casa==='oficial')||{venta:1}).venta;const lista=ORDEN.map(c=>DOLARES.find(d=>d.casa===c)).filter(Boolean);g.innerHTML=lista.map((d,i)=>{const lbl=LBLS[d.casa]||d.nombre;const br=d.casa==='oficial'?null:((d.venta-vOf)/vOf*100);const bp=br!==null?`<div class="bp ${br>100?'hi':'up'}">${pct(br)}</div>`:'';return `<div class="dc" style="animation-delay:${i*.04}s"><div class="dc-type">${lbl}</div><div><span class="dc-cur">$</span><span class="dc-v">${nm(d.venta)}</span></div><div class="dc-vl">Venta</div><div class="dc-bot"><div><div class="dc-cl">Compra</div><div class="dc-c">$${nm(d.compra||0)}</div></div>${bp}</div></div>`;}).join('');const f=lista[0];if(f?.fechaActualizacion){const fa=new Date(f.fechaActualizacion);document.getElementById('cz-sub').textContent=`Todas las bandas · Act. ${fa.toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit'})}`;}}
function renderMacro(){if(!MACRO)return;const src=ts=>`<div class="mc-dot ${ts}"></div>`;const rp=MACRO.riesgoPais;document.getElementById('m-rp').textContent=rp!=null?nm(rp):'—';document.getElementById('m-rp-src').innerHTML=src(rp!=null?'live':'fb')+(rp!=null?'argentinadatos':'sin datos');document.getElementById('macro-sub').textContent=`Act. ${new Date(MACRO.ts).toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit'})}`;const inf=MACRO.inflacion;document.getElementById('m-inf').textContent=inf?`${n2(inf.valor)}%`:'—';if(inf?.fecha)document.getElementById('m-inf-f').textContent=new Date(inf.fecha+'T00:00:00').toLocaleDateString('es-AR',{month:'long',year:'numeric'});document.getElementById('m-inf-src').innerHTML=src(inf?'live':'fb')+(inf?'argentinadatos':'sin datos');const pf=MACRO.plazosFixed||[];if(pf.length>0){const mx=Math.max(...pf.map(p=>p.tna));document.getElementById('m-pf').innerHTML=pf.slice(0,5).map(p=>`<div class="pf-row"><span class="pf-banco">${p.banco}</span><div class="pf-bar-w"><div class="pf-bar" style="width:${(p.tna/mx*100).toFixed(1)}%"></div></div><span class="pf-tna">${n2(p.tna)}%</span></div>`).join('');}else{document.getElementById('m-pf').innerHTML='<div style="color:var(--text4);font-family:var(--fu);font-size:11px">Sin datos</div>';}const vig=LECAPS.filter(l=>(l.diasRestantes||0)>0);if(vig.length>0){const avg=vig.reduce((s,l)=>s+l.tna,0)/vig.length;document.getElementById('m-lec').textContent=`${n2(avg)}%`;document.getElementById('m-lec-s').textContent=`TNA promedio · ${vig.length} especies`;document.getElementById('m-lec-src').innerHTML=src(LECAPS_SRC==='byma'?'live':'fb')+(LECAPS_SRC==='byma'?'BYMA en vivo':'referencia manual');}}
function renderARB(){const lista=ORDEN.map(c=>DOLARES.find(d=>d.casa===c)).filter(Boolean);let h=`<thead><tr><th style="font-size:8px">Compra ↓ / Vende →</th>`+lista.map(d=>`<th>${LBLS[d.casa]||d.casa}</th>`).join('')+`</tr></thead><tbody>`;lista.forEach(cd=>{h+=`<tr><td>${LBLS[cd.casa]||cd.casa}</td>`;lista.forEach(ve=>{if(cd.casa===ve.casa){h+=`<td class="cd">—</td>`;return;}const v=((ve.compra-cd.venta)/cd.venta)*100;h+=`<td class="${v>0.05?'cp':v<-0.05?'cn':'cz'}">${v>0?'+':''}${n2(v)}%</td>`;});h+=`</tr>`;});document.getElementById('arbt').innerHTML=h+'</tbody>';}
function renderCurva(tnaCau){const canvas=document.getElementById('ychart');const vig=LECAPS.filter(l=>(l.diasRestantes||0)>0).sort((a,b)=>a.diasRestantes-b.diasRestantes);if(!vig.length||!canvas)return;if(yChart){yChart.destroy();yChart=null;}const gold='#c9a84c',blue='#5a8fa8';yChart=new Chart(canvas,{type:'line',data:{labels:vig.map(l=>`${l.diasRestantes}d`),datasets:[{label:'LECAPs TNA %',data:vig.map(l=>+l.tna.toFixed(2)),borderColor:gold,backgroundColor:'rgba(201,168,76,.12)',borderWidth:2,pointBackgroundColor:gold,pointBorderColor:'#0f0f0d',pointBorderWidth:2,pointRadius:5,pointHoverRadius:7,tension:0.3,fill:true},{label:`Caución ${n2(tnaCau)}%`,data:vig.map(()=>+tnaCau.toFixed(2)),borderColor:blue,backgroundColor:'rgba(90,143,168,.08)',borderWidth:1.5,borderDash:[5,4],pointRadius:0,fill:false}]},options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},plugins:{legend:{display:false},tooltip:{backgroundColor:'#222220',borderColor:'#2c2c28',borderWidth:1,titleColor:'#b8b4ac',bodyColor:'#f0ede6',titleFont:{family:"'DM Sans',sans-serif",size:11},bodyFont:{family:"'JetBrains Mono',monospace",size:12},padding:10,callbacks:{title:c=>`Plazo: ${c[0].label}`,label:c=>` ${c.dataset.label.split(' ')[0]}: ${n2(c.parsed.y)}%`}}},scales:{x:{grid:{color:'rgba(44,44,40,.6)'},ticks:{color:'#787570',font:{family:"'JetBrains Mono',monospace",size:10},maxRotation:0},border:{color:'#2c2c28'}},y:{grid:{color:'rgba(44,44,40,.6)'},ticks:{color:'#787570',font:{family:"'JetBrains Mono',monospace",size:10},callback:v=>`${v}%`},border:{color:'#2c2c28'},suggestedMin:Math.min(tnaCau,...vig.map(l=>l.tna))-2,suggestedMax:Math.max(tnaCau,...vig.map(l=>l.tna))+1}}}});const el=document.getElementById('chart-src');el.textContent=LECAPS_SRC==='byma'?'● BYMA en vivo':'○ Referencia manual';el.style.color=LECAPS_SRC==='byma'?'var(--green)':'var(--text4)';}
function renderLT(nearEsp){const vig=LECAPS.filter(l=>(l.diasRestantes||0)>0).sort((a,b)=>a.diasRestantes-b.diasRestantes);const live=LECAPS_SRC==='byma';document.getElementById('lt-src').innerHTML=`<div class="sd ${live?'live':'fb'}"></div>${live?'BYMA en vivo':'Referencia manual'}`;document.getElementById('ltbody').innerHTML=vig.map(l=>{const isN=l.especie===nearEsp;const ryr=lecapR(1000000,l.tna,365);const prc=l.precioMercado!=null?`<span class="prec">$${n2(l.precioMercado)}</span>`:'<span style="color:var(--text4)">—</span>';return`<tr class="${isN?'nearest':''}"><td>${l.especie}${isN?'<span class="wlbl">sel.</span>':''}</td><td style="color:var(--text3)">${fmtV(l.vto)}</td><td style="color:var(--text4)">${l.diasRestantes||0}</td><td>${prc}</td><td class="tnac">${n2(l.tna)}%</td><td style="color:var(--text2)">${n3(l.tem||tem(l.tna))}%</td><td style="color:var(--text3)">${n2(l.tea||tea_l(l.tna))}%</td><td style="color:var(--text2)">$${nm(ryr.total)}</td></tr>`;}).join('');}
function renderCalc(){const raw=document.getElementById('inp-m').value.replace(/[.$\s]/g,'').replace(',','.');const monto=parseFloat(raw)||1000000;const tna=parseFloat(document.getElementById('inp-t').value)||35;const dias=PLAZO;const rC=caucion(monto,tna,dias);const m=lecapClose(dias);const rL=m?lecapR(monto,m.tna,dias):{interes:0,total:monto};const vMep=(DOLARES.find(d=>d.casa==='bolsa')||{}).venta||0;const vCcl=(DOLARES.find(d=>d.casa==='contadoconliqui')||{}).venta||0;const tC=tem(tna),eC=tea_c(tna),tL=m?tem(m.tna):0,eL=m?tea_l(m.tna):0;document.getElementById('fbox').innerHTML=`<div><div class="fi-label">Tasa diaria caución</div><div class="fi-val"><span class="hi">${n3(tna/365)}%</span> <span class="lo">= TNA/365</span></div></div><div><div class="fi-label">TEM caución</div><div class="fi-val"><span class="hi">${n3(tC)}%</span> <span class="lo">= TNA/12</span></div></div><div><div class="fi-label">TEA caución</div><div class="fi-val"><span class="hi">${n2(eC)}%</span> <span class="lo">compuesto diario</span></div></div>${m?`<div><div class="fi-label">TEM ${m.especie}</div><div class="fi-val"><span class="hi">${n3(tL)}%</span> <span class="lo">= TNA/12</span></div></div><div><div class="fi-label">TEA ${m.especie}</div><div class="fi-val"><span class="hi">${n2(eL)}%</span> <span class="lo">compuesto mensual</span></div></div><div><div class="fi-label">Ventaja TEM</div><div class="fi-val"><span class="${tL>tC?'hi':'lo'}">${n3(tL-tC)}pp</span> <span class="lo">→ ${tL>tC?'LECAP':'Caución'}</span></div></div>`:''}`;const cg=rC.interes>=rL.interes;const diff=Math.abs(rL.interes-rC.interes);document.getElementById('rg').innerHTML=`<div class="rc ${cg?'win':''}"><div class="rclbl">Caución · TNA ${n2(tna)}%</div><div class="rcv">$${nm(rC.total)}</div><div class="rcs">TEM ${n3(tC)}% · TEA ${n2(eC)}%</div><div class="rcg p">+$${nm(rC.interes)}</div><div class="rcu">${vMep?`≈ <b>USD ${nm(rC.total/vMep)}</b> MEP`:'&nbsp;'}</div></div><div class="rc ${!cg?'win':''}"><div class="rclbl">${m?`LECAP ${m.especie} · TNA ${n2(m.tna)}%`:'Sin LECAPs vigentes'}</div><div class="rcv">$${nm(rL.total)}</div><div class="rcs">TEM ${n3(tL)}% · TEA ${n2(eL)}%</div><div class="rcg p">+$${nm(rL.interes)}</div><div class="rcu">${vMep?`≈ <b>USD ${nm(rL.total/vMep)}</b> MEP`:'&nbsp;'}</div></div><div class="rc"><div class="rclbl">Diferencia</div><div class="rcv" style="color:${diff>0?'var(--gold-l)':'var(--text3)'}">$${nm(diff)}</div><div class="rcs">a favor de ${cg?'Caución':'LECAP'}</div><div class="rcg z">en ${dias} día${dias!==1?'s':''}</div><div class="rcu">${vCcl?`Inversión: <b>USD ${nm(monto/vCcl)}</b> CCL`:'&nbsp;'}</div></div>`;track('calculadora_usada',{monto_ars:Math.round(monto),tna_caucion:tna,plazo_dias:dias,instrumento_ganador:cg?'caucion':'lecap'});renderLT(m?.especie);renderCurva(tna);}
function renderProy(){const raw=document.getElementById('py-m').value.replace(/[.$\s]/g,'').replace(',','.');const monto=parseFloat(raw)||1000000;const tna=parseFloat(document.getElementById('py-t').value)||35;const PL=[1,7,30,60,90,120,180,365];const rows=PL.map(d=>{const rC=caucion(monto,tna,d);const mb=lecapClose(d);const rL=mb?lecapR(monto,mb.tna,d):null;return{d,rC,rL,mb};});const mx=Math.max(...rows.map(r=>Math.max(r.rC.interes,r.rL?.interes||0)));document.getElementById('esc-grid').innerHTML=rows.map(({d,rC,rL,mb})=>{const cg=!rL||rC.interes>=rL.interes;const bC=mx>0?(rC.interes/mx*100):0;const bL=(mx>0&&rL)?(rL.interes/mx*100):0;return`<div class="esc-c"><div class="esc-d">${d} día${d!==1?'s':''}</div><div class="esc-bw"><div class="esc-b c" style="width:${bC.toFixed(1)}%"></div></div><div class="esc-bw"><div class="esc-b l" style="width:${bL.toFixed(1)}%"></div></div><div class="esc-leg"><div class="esc-it"><span class="esc-il">Caución</span><span class="esc-iv ${cg?'win':''}">+$${nm(rC.interes)}</span></div><div class="esc-it" style="text-align:right"><span class="esc-il">${mb?mb.especie:'—'}</span><span class="esc-iv ${!cg&&rL?'win':''}">${rL?`+$${nm(rL.interes)}`:'—'}</span></div></div></div>`;}).join('');}
function renderCN(){const raw=document.getElementById('cn-m').value.replace(/[.$\s]/g,'').replace(',','.');const monto=parseFloat(raw)||100000;const dir=document.getElementById('cn-d').value;const lista=ORDEN.map(c=>DOLARES.find(d=>d.casa===c)).filter(Boolean);document.getElementById('cngrid').innerHTML=lista.map(d=>{const lbl=LBLS[d.casa]||d.nombre;const val=dir==='au'?`USD ${n2(monto/d.venta)}`:`$${nm(monto*d.compra)}`;const rate=dir==='au'?`@ $${nm(d.venta)} venta`:`@ $${nm(d.compra)} compra`;return`<div class="cnc"><div class="cnc-l">${lbl}</div><div class="cnc-v">${val}</div><div class="cnc-r">${rate}</div></div>`;}).join('');}
async function loadData(){IS_OFFLINE=false;setSt('load','Actualizando…');document.getElementById('rbtn').classList.add('spin');try{await fetchAll();renderCZ();renderMacro();renderARB();renderCalc();renderProy();renderCN();setSt(IS_OFFLINE?'err':'ok',IS_OFFLINE?'Sin conexión':'En vivo');setTime();document.getElementById('offline-banner').classList.toggle('show',IS_OFFLINE);}catch(e){setSt('err','Error');console.error('[Rulitos]',e);}finally{document.getElementById('rbtn').classList.remove('spin');}}
function refresh(){clearInterval(timer);loadData();timer=setInterval(loadData,5*60*1000);}
document.querySelectorAll('.cnav-b').forEach(b=>{b.addEventListener('click',()=>{document.querySelectorAll('.cnav-b').forEach(x=>x.classList.remove('on'));document.querySelectorAll('.cpanel').forEach(x=>x.classList.remove('on'));b.classList.add('on');document.getElementById('panel-'+b.dataset.p).classList.add('on');if(b.dataset.p==='proyeccion')renderProy();});});
document.getElementById('pgrid').addEventListener('click',e=>{const b=e.target.closest('.pb');if(!b)return;document.querySelectorAll('.pb').forEach(x=>x.classList.remove('on'));b.classList.add('on');PLAZO=parseInt(b.dataset.d);renderCalc();});
let dC,dP,dV;
['inp-m','inp-t'].forEach(id=>document.getElementById(id).addEventListener('input',()=>{clearTimeout(dC);dC=setTimeout(renderCalc,130);}));
['py-m','py-t'].forEach(id=>document.getElementById(id).addEventListener('input',()=>{clearTimeout(dP);dP=setTimeout(renderProy,130);}));
['cn-m','cn-d'].forEach(id=>document.getElementById(id).addEventListener('input',()=>{clearTimeout(dV);dV=setTimeout(renderCN,130);}));
['inp-m','py-m','cn-m'].forEach(id=>{document.getElementById(id).addEventListener('blur',function(){const v=parseFloat(this.value.replace(/[.$\s]/g,'').replace(',','.'));if(!isNaN(v))this.value=nm(v);});});
document.getElementById('inp-t').addEventListener('input',function(){document.getElementById('py-t').value=this.value;clearTimeout(dP);dP=setTimeout(renderProy,130);});
document.getElementById('py-t').addEventListener('input',function(){document.getElementById('inp-t').value=this.value;clearTimeout(dC);dC=setTimeout(renderCalc,130);});
if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js').then(r=>console.log('[Rulitos] SW:',r.scope)).catch(e=>console.warn('[Rulitos] SW err:',e));});}
refresh();
</script>
</body>
</html>
