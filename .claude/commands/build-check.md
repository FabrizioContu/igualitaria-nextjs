# Build Verification

Verifica que el proyecto esté listo para build de producción.

## 1. Verificación de Dependencias

```bash
npm outdated
```

- [ ] Lista dependencias desactualizadas
- [ ] Identifica vulnerabilidades (npm audit)
- [ ] Recomienda actualizaciones seguras

## 2. TypeScript Compilation

```bash
npx tsc --noEmit
```

- [ ] Ejecuta verificación de tipos
- [ ] Lista TODOS los errores TypeScript
- [ ] Identifica uso de 'any'
- [ ] Verifica imports correctos

## 3. Build Local

```bash
npm run build
```

### Durante el build, analiza:

- [ ] Build completa exitosamente
- [ ] Tiempo de build (debe ser <2 min)
- [ ] Warnings del build
- [ ] Páginas generadas estáticamente

### Output Analysis

Revisa y reporta:

- **Páginas estáticas** (○) → cuáles y por qué
- **Páginas SSR** (λ) → cuáles y si es necesario
- **Páginas ISR** (●) → revalidate time correcto

### Bundle Size

Analiza:

```
Route (app)                              Size     First Load JS
┌ ○ /                                    XXX KB   XXX KB
├ ○ /blog                                XXX KB   XXX KB
└ ○ /proveidors                          XXX KB   XXX KB
```

- [ ] Initial load <200KB (target)
- [ ] Identifica rutas más pesadas
- [ ] Sugiere optimizaciones si >200KB

## 4. Bundle Analysis (opcional pero recomendado)

```bash
npm run build -- --profile
```

Si está configurado, analiza:

- Componentes más pesados
- Librerías que ocupan más espacio
- Oportunidades de code splitting

## 5. Verificación de Imports

Busca en el código:

- [ ] Imports completos: `import * as X`
- [ ] Imports de librerías pesadas
- [ ] Imports circular (pueden causar issues)

## 6. Server vs Client Components

Analiza según `../project-context.md`:

- [ ] Lista Client Components actuales
- [ ] Verifica si alguno podría ser Server Component
- [ ] Sugiere conversiones posibles

Actual según documentación:

```
Client Components necesarios:
- components/Navbar.tsx (menú móvil - useState)
- components/Footer.tsx (interactividad)
- components/MapSection.tsx (Leaflet - window)
- components/Comptador.tsx (animación - useEffect)
- app/proveidors/page.tsx (búsqueda - useState)
```

## 7. Performance Build Checks

- [ ] Tree shaking funcionando correctamente
- [ ] CSS optimizado (Tailwind purge)
- [ ] Fonts optimizados (next/font)
- [ ] Imágenes optimizadas

## 8. Errores Comunes Next.js 16

Busca y reporta:

- [ ] `window` usado en Server Components
- [ ] `document` usado en Server Components
- [ ] Hooks React en Server Components
- [ ] 'use client' faltante donde necesario
- [ ] Cache no configurado en fetches

## Reporte del Build

Genera informe completo:

### ✅ Build Status

```
Build: [SUCCESS/FAILED]
Time: [X minutos]
Warnings: [número]
Errors: [número]
```

### 📦 Bundle Analysis

```
Total Size: XXX KB
Largest Routes:
1. /proveidors → XXX KB (reason)
2. /blog → XXX KB (reason)
3. / → XXX KB (reason)
```

### ⚠️ Warnings Importantes

- Lista warnings que deberían revisarse

### ❌ Errores Críticos

- Lista errores que DEBEN corregirse

### 🎯 Optimizaciones Sugeridas

**Alto Impacto:**

1. [Optimización específica con código]
2. [Optimización específica con código]

**Medio Impacto:**

1. [Optimización específica]
2. [Optimización específica]

### 📊 Comparación con Targets

Compara con targets en `../project-context.md`:

```
Target    | Actual  | Status
----------|---------|--------
<200KB    | XXX KB  | ✅/❌
Build <2m | X min   | ✅/❌
0 Errors  | X       | ✅/❌
```

### 🚀 Ready for Deploy?

- [YES/NO] con justificación
