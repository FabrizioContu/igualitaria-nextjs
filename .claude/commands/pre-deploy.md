# Pre-Deploy Production Check

Checklist completo antes de desplegar a producción en Vercel.

**IMPORTANTE:** Consulta primero:

- `../project-context.md` → Arquitectura y targets
- `../coding-guidelines.md` → Estándares

## 1. Revisión de Código

### Limpieza

- [ ] Busca y elimina todos los `console.log`
- [ ] Busca y elimina todos los `debugger`
- [ ] Elimina comentarios `// TODO` o documéntalos
- [ ] Elimina código comentado sin usar

### TypeScript

- [ ] Sin uso de `any` injustificado
- [ ] Todos los imports están tipados
- [ ] No hay errores de compilación TypeScript
- [ ] Strict mode habilitado y respetado

### Imports y Dependencies

- [ ] No hay imports completos innecesarios (ej: import \* as)
- [ ] Solo imports necesarios
- [ ] No hay dependencias sin usar

## 2. Arquitectura Next.js 16

Según `../project-context.md`:

- [ ] Server Components por defecto
- [ ] 'use client' solo donde es necesario
- [ ] Cache con 'use cache' en lib/wp.ts implementado
- [ ] ISR/SSG correctamente configurado

## 3. Optimización de Imágenes

- [ ] Todas las imágenes usan `next/image`
- [ ] Dominios configurados en next.config.ts:
  - laigualitaria.local
  - laigualitaria.coop
- [ ] Alt text en todas las imágenes
- [ ] Sizes apropiados para responsive

## 4. Variables de Entorno

Lista todas las variables necesarias:

```env
NEXT_PUBLIC_WORDPRESS_API_URL=
NEXT_PUBLIC_SITE_URL=
REVALIDATE_SECRET=
```

### Verificaciones

- [ ] No hay secrets hardcodeados en el código
- [ ] Todas las vars usan NEXT*PUBLIC* cuando necesario
- [ ] .env.local en .gitignore
- [ ] Variables documentadas en README

## 5. Integración WordPress

Verifica según `../project-context.md`:

- [ ] URL de WordPress correcta (laigualitaria.coop)
- [ ] Endpoints accesibles: /wp-json/wp/v2
- [ ] Custom post types funcionan: posts, proveedores
- [ ] Campos ACF se mapean correctamente
- [ ] Error handling para API failures
- [ ] Timeouts configurados

## 6. Performance

Targets según `../project-context.md`:

- [ ] Lighthouse Performance >90
- [ ] First Contentful Paint <1.5s
- [ ] Time to Interactive <3s
- [ ] Bundle size inicial <200KB

### Verificación

```bash
npm run build
# Analiza el output
```

- [ ] No hay warnings críticos en build
- [ ] Bundle size aceptable
- [ ] Páginas pre-renderizadas correctamente

## 7. SEO y Metadata

- [ ] Metadata en todas las páginas principales
- [ ] OpenGraph tags configurados
- [ ] Sitemap.xml funcional
- [ ] robots.txt correcto
- [ ] Idioma catalán en metadata

## 8. Contenido y Idioma

- [ ] TODO el contenido en **catalán** (no español)
- [ ] Mensajes de error en catalán
- [ ] Metadata en catalán
- [ ] Alt texts en catalán

## 9. Security

- [ ] No hay API keys en el código
- [ ] Headers de seguridad en next.config.ts
- [ ] CORS configurado correctamente
- [ ] Validación de inputs si hay formularios

## 10. Testing

Si hay tests implementados:

- [ ] Tests unitarios pasan
- [ ] Tests de integración pasan
- [ ] No hay console.errors en tests

## Reporte Final

Genera un informe con:

### ✅ READY TO DEPLOY

- Items completados correctamente

### ⚠️ WARNINGS (revisar pero no bloquean)

- Items que deberían revisarse

### ❌ BLOCKERS (deben corregirse)

- Issues críticos que impiden deploy

### 📋 Variables de Entorno para Vercel

```env
NEXT_PUBLIC_WORDPRESS_API_URL=https://laigualitaria.coop/wp-json
NEXT_PUBLIC_SITE_URL=https://tu-app.vercel.app
REVALIDATE_SECRET=tu_secret_aqui
```

### 🎯 Recomendaciones

- Sugerencias finales antes de deploy
