# Vercel Deployment Guide

Guía completa paso a paso para desplegar en Vercel.

## Pre-Deploy Checklist

Antes de empezar, verifica:

- [ ] `/pre-deploy` ejecutado sin errores críticos ✅
- [ ] `/build-check` completado exitosamente ✅
- [ ] `/wordpress-check` pasó todas las verificaciones ✅
- [ ] `/security-check` no tiene issues críticos ✅
- [ ] Cambios commiteados en git ✅
- [ ] Branch sincronizado con remoto ✅

## Paso 1: Variables de Entorno

### Lista Completa de Variables

Copia estas variables a Vercel Dashboard:

```env
# WordPress API
NEXT_PUBLIC_WORDPRESS_API_URL=https://laigualitaria.coop/wp-json

# Site URL
NEXT_PUBLIC_SITE_URL=https://tu-app.vercel.app

# Revalidation Secret (genera uno seguro)
REVALIDATE_SECRET=tu_secret_muy_seguro_aqui

# Analytics (opcional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Cómo Configurarlas en Vercel

1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Añade cada variable:
   - **Name:** NEXT_PUBLIC_WORDPRESS_API_URL
   - **Value:** https://laigualitaria.coop/wp-json
   - **Environment:** Production (y Preview si quieres)
4. Click "Save"
5. Repite para cada variable

## Paso 2: Configuración de Build en Vercel

Verifica en Settings → General:

```
Framework Preset: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Node Version: 18.x o superior
```

- [ ] Framework detectado como Next.js
- [ ] Build command correcto
- [ ] Output directory correcto
- [ ] Node version apropiada

## Paso 3: Dominios (opcional pero recomendado)

### Dominio Personalizado

Si tienes dominio:

1. Settings → Domains
2. Add Domain
3. Sigue instrucciones DNS
4. Espera propagación (puede tardar hasta 48h)

### Actualizar URLs

Una vez tengas el dominio final:

```env
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

Actualiza esta variable en Vercel y redeploy.

## Paso 4: Deploy Methods

### Opción A: Automático (Recomendado)

```bash
# 1. Asegúrate de estar en la rama correcta
git branch

# 2. Commit y push
git add .
git commit -m "feat: ready for production deploy"
git push origin main

# 3. Vercel detectará el push y hará deploy automático
# Monitorea en: https://vercel.com/tu-usuario/tu-proyecto
```

### Opción B: Vercel CLI (Manual)

```bash
# 1. Instalar Vercel CLI (si no lo tienes)
npm i -g vercel

# 2. Login
vercel login

# 3. Link project (primera vez)
vercel link

# 4. Deploy a Preview (testing)
vercel

# Verifica el preview URL que te da
# Testa todo antes de production

# 5. Deploy a Production
vercel --prod

# Espera a que termine
# Te dará la URL de producción
```

### Opción C: Deploy desde GitHub

1. Conecta repo en Vercel Dashboard
2. Import Git Repository
3. Selecciona tu repo: laigualitaria-nextjs
4. Configure Project:
   - Framework: Next.js (auto-detectado)
   - Root Directory: ./
   - Environment Variables: (añade las del Paso 1)
5. Click "Deploy"

## Paso 5: Durante el Deploy

Monitorea en Vercel Dashboard:

### Build Logs

Verifica que:

- [ ] Dependencies install correctamente
- [ ] Build completa sin errores
- [ ] Todas las páginas se generan
- [ ] No hay warnings críticos

### Output Expected

```
✓ Creating an optimized production build
✓ Compiled successfully
✓ Collecting page data
✓ Generating static pages (X/X)
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    X KB     XXX KB
├ ○ /blog                                X KB     XXX KB
...
```

## Paso 6: Post-Deploy Inmediato

Cuando el deploy complete:

### 1. Verifica URL de Producción

```
Production: https://tu-app.vercel.app
```

### 2. Quick Smoke Test

```bash
# Homepage
curl -I https://tu-app.vercel.app

# Debería retornar 200 OK

# Blog
curl -I https://tu-app.vercel.app/blog

# Proveedor específico
curl -I https://tu-app.vercel.app/proveidors/[un-slug-real]
```

### 3. Verificar en Navegador

- [ ] Homepage carga correctamente
- [ ] Imágenes se muestran
- [ ] Navegación funciona
- [ ] Blog posts cargan
- [ ] Proveedores cargan

## Paso 7: Configuración Avanzada (opcional)

### Performance

- Settings → Performance
- [ ] Enable Edge Network ✓
- [ ] Enable Image Optimization ✓
- [ ] Enable Speed Insights (si quieres)

### Analytics

- Settings → Analytics
- [ ] Enable Web Analytics (opcional)
- [ ] Enable Speed Insights (recomendado)

### Preview Deployments

- Settings → Git
- [ ] Enable Preview Deployments ✓
- [ ] Enable Auto Preview Comments ✓

## Paso 8: Webhook de WordPress (opcional)

Para revalidación automática cuando publicas contenido:

### En WordPress

1. Instala plugin "Deploy Webhook" o similar
2. Configura webhook URL:

```
   https://api.vercel.com/v1/integrations/deploy/[tu-hook-id]/[hook-secret]
```

3. Lo encuentras en: Vercel Dashboard → Settings → Git → Deploy Hooks

### Crear Deploy Hook

1. Vercel Dashboard → Settings → Git
2. Deploy Hooks → Create Hook
3. Name: "WordPress Content Update"
4. Branch: main
5. Copy Hook URL

### En WordPress

Cuando publicas/actualizas contenido → trigger webhook → Vercel rebuilds

## Paso 9: Verificación Completa

Ejecuta el comando de post-deploy:

```bash
claude /post-deploy-test
```

Esto verificará:

- [ ] Funcionalidad básica
- [ ] Integración WordPress
- [ ] Performance
- [ ] SEO
- [ ] Mobile

## Paso 10: Monitoreo

### Vercel Dashboard

Monitorea primeras 24h:

- Deployments → Ver estado
- Analytics → Ver tráfico
- Logs → Ver errores

### WordPress

Verifica en WordPress:

- Contenido se muestra correctamente
- Imágenes accesibles desde Vercel

## Troubleshooting

### Build Failed

```bash
# Ver logs completos en Vercel
# Errores comunes:
# - TypeScript errors → ejecuta localmente: npx tsc --noEmit
# - Missing deps → npm install
# - Environment vars → verifica en Settings
```

### 404 en Producción

```bash
# Verifica:
# 1. Rutas son correctas (case-sensitive)
# 2. generateStaticParams implementado si es dinámico
# 3. WordPress content existe
```

### Imágenes No Cargan

```bash
# Verifica:
# 1. Dominio en next.config.ts images.domains
# 2. URLs de WordPress accesibles
# 3. CORS configurado en WordPress
```

### Performance Bajo

```bash
# Ejecuta Lighthouse
# Verifica:
# 1. Bundle size
# 2. Images optimizadas
# 3. Cache funcionando
```

## Comandos de Vercel CLI Útiles

```bash
# Ver logs en tiempo real
vercel logs

# Ver deployments
vercel ls

# Descargar variables de entorno
vercel env pull

# Información del proyecto
vercel inspect

# Cancelar deployment
vercel rollback
```

## Resumen Final

### ✅ Deploy Exitoso Si:

- [ ] Build completa sin errores
- [ ] URL de producción accesible
- [ ] Todas las páginas cargan
- [ ] WordPress integration funciona
- [ ] Performance >85 Lighthouse
- [ ] No hay errores en console

### 🎯 Next Steps

1. Ejecutar `/post-deploy-test` completo
2. Configurar analytics si aún no
3. Documentar URL final
4. Informar al equipo
5. Monitorear primeras 24h

### 📋 URLs Importantes

```
Production: https://tu-app.vercel.app
Dashboard: https://vercel.com/tu-usuario/tu-proyecto
Logs: https://vercel.com/tu-usuario/tu-proyecto/logs
Settings: https://vercel.com/tu-usuario/tu-proyecto/settings
```

---

**¡Deploy completado! 🚀**

Ahora ejecuta `/post-deploy-test` para verificación completa.
