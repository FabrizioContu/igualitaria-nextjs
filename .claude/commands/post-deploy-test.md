# Post-Deployment Testing

Testing exhaustivo después del deploy en Vercel.

**URL de Producción:** https://tu-app.vercel.app

## 1. Funcionalidad Básica

### Homepage (/)

```bash
curl -I https://tu-app.vercel.app
```

Verifica:

- [ ] Status 200 OK
- [ ] Content-Type: text/html
- [ ] Headers de seguridad presentes
- [ ] Se carga en <3 segundos

Prueba manual:

- [ ] Últimos 3 posts del blog se muestran
- [ ] Navegación funciona
- [ ] Imágenes cargan
- [ ] Links son clickeables

### Blog (/blog)

```bash
curl -I https://tu-app.vercel.app/blog
```

- [ ] Status 200 OK
- [ ] Lista de posts se muestra
- [ ] Imágenes featured cargan
- [ ] Excerpts se muestran correctamente
- [ ] Links a posts individuales funcionan

### Post Individual (/blog/[slug])

Prueba con 2-3 posts diferentes:

```bash
curl -I https://tu-app.vercel.app/blog/[slug-real]
```

- [ ] Status 200 OK
- [ ] Contenido completo se muestra
- [ ] Imágenes en contenido cargan
- [ ] Fecha formateada correctamente
- [ ] Featured image se muestra
- [ ] Breadcrumbs/navegación funciona

### Proveedores (/proveidors)

- [ ] Status 200 OK
- [ ] Lista de proveedores se muestra
- [ ] Búsqueda funciona
- [ ] Filtros funcionan (si existen)
- [ ] Tarjetas tienen toda la info

### Proveedor Individual (/proveidors/[slug])

Prueba con 2-3 proveedores:

- [ ] Status 200 OK
- [ ] Datos ACF se muestran correctamente:
  - tipus
  - ubicacio
  - web (link funcional)
  - email (link funcional)
  - telefon
- [ ] Campos vacíos no rompen la página
- [ ] Botón de contacto funciona

### Páginas Estáticas

```bash
curl -I https://tu-app.vercel.app/qui-som
curl -I https://tu-app.vercel.app/fer-se-soci
curl -I https://tu-app.vercel.app/comunitat
```

- [ ] Todas responden 200 OK
- [ ] Contenido se muestra
- [ ] Formularios funcionan (si existen)

### 404 Page

```bash
curl -I https://tu-app.vercel.app/pagina-que-no-existe
```

- [ ] Status 404
- [ ] Página 404 personalizada se muestra
- [ ] Link para volver a home funciona

## 2. WordPress Data Integration

### Verificar Contenido Actual

- [ ] Posts recientes están visibles
- [ ] Cambios en WordPress se reflejan (según ISR timing)
- [ ] Imágenes de WordPress cargan correctamente
- [ ] URLs de imágenes son correctas (laigualitaria.coop)

### Campos Personalizados (ACF)

En proveedores:

- [ ] Campos obligatorios presentes
- [ ] Campos opcionales manejados (no undefined errors)
- [ ] HTML en descripción renderiza correctamente
- [ ] Links externos funcionan

## 3. Performance Testing

### Lighthouse CI

Ejecuta para homepage:

```bash
# Usando Lighthouse CLI o web
npx lighthouse https://tu-app.vercel.app --view
```

**Targets según project-context.md:**

```
Performance:       >90 ✓
Accessibility:     >90 ✓
Best Practices:    >90 ✓
SEO:              >90 ✓
```

- [ ] Performance score >90
- [ ] Accessibility >90
- [ ] Best Practices >90
- [ ] SEO >90

### Core Web Vitals

Mide en varias páginas:

```
Largest Contentful Paint (LCP):  <2.5s ✓
First Input Delay (FID):          <100ms ✓
Cumulative Layout Shift (CLS):    <0.1 ✓
First Contentful Paint (FCP):     <1.5s ✓
Time to Interactive (TTI):        <3s ✓
```

- [ ] LCP <2.5s
- [ ] FID <100ms
- [ ] CLS <0.1
- [ ] FCP <1.5s
- [ ] TTI <3s

### Bundle Size

Verifica en Vercel Dashboard o build logs:

```
Initial Load JS: <200KB (target)
```

- [ ] Initial bundle <200KB
- [ ] Largest route identificada
- [ ] Si >200KB, documentar por qué

### Cache Performance

Prueba hit de cache:

```bash
# Primera carga
curl -I https://tu-app.vercel.app

# Segunda carga (debería ser más rápida)
curl -I https://tu-app.vercel.app

# Verificar header: x-vercel-cache: HIT
```

- [ ] Cache headers presentes
- [ ] HIT rate apropiado
- [ ] Stale-while-revalidate funcionando

## 4. SEO Verification

### Metadata

Verifica en view-source:

Homepage:

- [ ] `<title>` presente y descriptivo
- [ ] `<meta name="description">` presente
- [ ] `lang="ca"` en HTML tag
- [ ] OpenGraph tags presentes
- [ ] Twitter Card tags presentes

Blog post:

- [ ] Title dinámico del post
- [ ] Description del excerpt
- [ ] og:image del featured image
- [ ] Canonical URL correcto

### Sitemap

```bash
curl https://tu-app.vercel.app/sitemap.xml
```

- [ ] Sitemap accesible
- [ ] Incluye todas las rutas principales
- [ ] URLs son absolutas (https://)
- [ ] lastmod dates presentes

### Robots.txt

```bash
curl https://tu-app.vercel.app/robots.txt
```

- [ ] Robots.txt accesible
- [ ] Permite crawling
- [ ] Referencia sitemap
- [ ] No bloquea páginas importantes

### Structured Data (opcional)

Si implementado:

- [ ] JSON-LD presente
- [ ] Schema.org válido
- [ ] Article schema para posts
- [ ] Organization schema

## 5. Mobile Testing

### Responsive Design

Prueba en:

- [ ] Mobile (375px)
- [ ] Tablet (768px)
- [ ] Desktop (1920px)

Verifica:

- [ ] Layout se adapta correctamente
- [ ] Imágenes responsive
- [ ] Texto legible sin zoom
- [ ] Botones táctiles (min 44px)
- [ ] Menú mobile funciona

### Touch Interactions

- [ ] Links clickeables en mobile
- [ ] Menú hamburguesa funciona
- [ ] Scroll funciona suavemente
- [ ] No hay elementos cortados

### Mobile Performance

Lighthouse mobile:

```bash
npx lighthouse https://tu-app.vercel.app --preset=mobile
```

- [ ] Performance mobile >85
- [ ] TTI mobile <5s

## 6. Cross-Browser Testing

Prueba en:

- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (Mac/iOS)

Verifica:

- [ ] Página carga correctamente
- [ ] Estilos se aplican bien
- [ ] JavaScript funciona
- [ ] Imágenes cargan

## 7. Error Handling

### WordPress Offline

Simula WordPress caído (en dev):

```env
NEXT_PUBLIC_WORDPRESS_API_URL=https://url-invalida.com
```

- [ ] Página no crashea completamente
- [ ] Mensaje de error apropiado
- [ ] Fallback content si configurado
- [ ] Logs informativos (no exposición de datos)

### Slugs Inválidos

Prueba URLs inválidas:

```bash
curl -I https://tu-app.vercel.app/blog/slug-que-no-existe
curl -I https://tu-app.vercel.app/proveidors/slug-invalido
```

- [ ] Devuelve 404 (no 500)
- [ ] Página 404 personalizada
- [ ] No hay errors en console

### Campos Vacíos

Proveedores sin datos ACF:

- [ ] Página carga sin errores
- [ ] Campos vacíos no se muestran o muestran placeholder
- [ ] No hay "undefined" visible

## 8. Security Verification

### Headers de Seguridad

```bash
curl -I https://tu-app.vercel.app
```

Verifica headers:

```
X-Frame-Options: SAMEORIGIN ✓
X-Content-Type-Options: nosniff ✓
Referrer-Policy: origin-when-cross-origin ✓
Strict-Transport-Security: max-age=... ✓
```

- [ ] Todos los security headers presentes
- [ ] HSTS configurado
- [ ] Content-Type-Options correcto

### Environment Variables

- [ ] No hay secrets en HTML source
- [ ] No hay API keys expuestas
- [ ] Console no muestra info sensible

### Console Errors

Abre DevTools:

- [ ] No hay errores JavaScript
- [ ] No hay warnings críticos
- [ ] No hay console.log en producción

## 9. Monitoring Setup

### Vercel Analytics

En Vercel Dashboard:

- [ ] Analytics habilitado
- [ ] Speed Insights habilitado
- [ ] Primeras visitas registradas

### Error Tracking

Si configurado (Sentry, etc):

- [ ] Tracking funcionando
- [ ] Source maps configurados
- [ ] Errores se reportan correctamente

## 10. Final Checklist

```
FUNCIONALIDAD:
[ ] Homepage ✓
[ ] Blog ✓
[ ] Posts individuales ✓
[ ] Proveedores ✓
[ ] Proveedores individuales ✓
[ ] Páginas estáticas ✓
[ ] 404 page ✓

WORDPRESS:
[ ] Contenido actualizado ✓
[ ] Imágenes cargan ✓
[ ] ACF fields correctos ✓
[ ] API accesible ✓

PERFORMANCE:
[ ] Lighthouse >90 ✓
[ ] Core Web Vitals ✓
[ ] Bundle <200KB ✓
[ ] Cache funciona ✓

SEO:
[ ] Metadata ✓
[ ] Sitemap ✓
[ ] Robots.txt ✓
[ ] OpenGraph ✓

MOBILE:
[ ] Responsive ✓
[ ] Touch funciona ✓
[ ] Performance mobile ✓

SECURITY:
[ ] Headers ✓
[ ] No secrets ✓
[ ] No errors ✓
```

## Reporte Final

### ✅ FUNCIONALIDAD

```
Status: [PASS/FAIL]
Issues: [número de issues]
Critical: [número]
```

### 📊 PERFORMANCE

```
Lighthouse Desktop:  XX/100
Lighthouse Mobile:   XX/100
LCP: X.Xs
FCP: X.Xs
Bundle: XXX KB
```

### 🔍 SEO

```
Metadata: [PASS/FAIL]
Sitemap: [PASS/FAIL]
Robots: [PASS/FAIL]
```

### 📱 MOBILE

```
Responsive: [PASS/FAIL]
Performance: XX/100
Touch: [PASS/FAIL]
```

### 🔐 SECURITY

```
Headers: [PASS/FAIL]
No Secrets: [PASS/FAIL]
No Errors: [PASS/FAIL]
```

### 🎯 ESTADO GENERAL

```
DEPLOYMENT STATUS: [✅ SUCCESS / ⚠️ SUCCESS WITH ISSUES / ❌ FAILED]

Resumen:
[Descripción general del estado]

Issues Críticos:
[Lista de issues que DEBEN resolverse]

Mejoras Sugeridas:
[Lista de mejoras opcionales]

Próximos Pasos:
1. [Acción]
2. [Acción]
```

---

**Testing completado. Deploy verificado. 🎉**
