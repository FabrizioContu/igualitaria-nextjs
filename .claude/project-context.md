# 🏢 CONTEXTO DEL PROYECTO: LA IGUALITÀRIA

## 📋 Información General

- **Proyecto:** La Igualitària - Economat Cooperatiu del Poble-sec
- **Tipo:** E-commerce cooperativa / Blog
- **Stack:** Next.js 16 + TypeScript + Tailwind CSS 4
- **Backend:** WordPress Headless (REST API)
- **Idioma:** Catalán (ca-ES)
- **URLs:**
  - Desarrollo: http://laigualitaria.local (WordPress Local)
  - Producción: https://laigualitaria.coop

## 🎯 Objetivos del Proyecto

1. SEO óptimo (migración desde React SPA)
2. Performance excelente (Lighthouse >90)
3. Experiencia de usuario fluida
4. Gestión de contenido desde WordPress
5. Mantenibilidad y escalabilidad

## 🏗️ Arquitectura Actual

### Stack Tecnológico

- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript (strict mode)
- **Estilos:** Tailwind CSS 4
- **Backend:** WordPress REST API
- **Mapas:** Leaflet + React Leaflet
- **Iconos:** Lucide React
- **Cache:** Next.js Cache Components (`use cache`)

### Estructura del Proyecto

```
igualitaria-nextjs/
├── app/                    # App Router (Next.js 16)
│   ├── layout.tsx         # Layout principal con Navbar/Footer
│   ├── page.tsx           # Home (Server Component)
│   ├── blog/              # Blog (SSG + ISR)
│   │   ├── page.tsx       # Lista de posts
│   │   └── [slug]/        # Post individual
│   ├── proveidors/        # Proveedores
│   │   ├── page.tsx       # Lista con filtros (Client Component)
│   │   └── [slug]/        # Proveedor individual (SSG + ISR)
│   ├── qui-som/           # Página estática
│   ├── fer-se-soci/       # Página estática
│   ├── comunitat/         # Página estática
│   └── not-found.tsx      # 404 personalizado
├── components/            # Componentes reutilizables
│   ├── Navbar.tsx         # Client Component (menú interactivo)
│   ├── Footer.tsx         # Client Component
│   ├── MapSection.tsx     # Client Component (Leaflet)
│   ├── Participa.tsx      # Componente reutilizable
│   ├── Comptador.tsx      # Client Component (animación)
│   └── ui/                # Componentes UI básicos
├── lib/                   # Utilidades y API
│   ├── wp.ts              # WordPress API (con 'use cache')
│   └── utils.ts           # Utilidades (cn function)
├── hooks/                 # Custom hooks
│   └── use-mobile.tsx     # Hook para detectar mobile
├── types/                 # TypeScript types
│   └── wordpress.ts       # Tipos de WordPress
├── public/                # Assets estáticos
│   ├── *.webp             # Imágenes del proyecto
│   └── *.png              # Iconos y logos
├── .claude/               # Configuración Claude Code
├── next.config.ts         # Config Next.js (cacheComponents: true)
├── tailwind.config.ts     # Config Tailwind 4 (NO EXISTE, se usa @theme)
└── app/globals.css        # Estilos globales Tailwind 4
```

## 🔧 Configuraciones Críticas

### Next.js Config (next.config.ts)

```typescript
{
  cacheComponents: true,  // Cache de componentes habilitado
  images: {
    remotePatterns: [
      { hostname: 'laigualitaria.local' },
      { hostname: 'laigualitaria.coop' }
    ]
  }
}
```

### WordPress API (lib/wp.ts)

- Endpoint: `${DOMAIN}/wp-json/wp/v2`
- Custom Post Types: `proveedores` (proveedores/productores)
- Cache Strategy: `'use cache'` en todas las funciones
- Revalidación: Manejada por Next.js automáticamente
- Autenticación: No requerida (lectura pública)

### Tailwind CSS 4 (app/globals.css)

```css
@import "tailwindcss";

@theme {
  --color-primary: #ec4899;
  --color-primary-light: #fce7f3;
  --color-primary-dark: #be185d;
  --color-secondary: #f97316;
}
```

**NO existe tailwind.config.ts** - Tailwind 4 usa configuración en CSS.

## 📊 Páginas y Rutas

| Ruta                 | Tipo             | Descripción                     | Data Source                 |
| -------------------- | ---------------- | ------------------------------- | --------------------------- |
| `/`                  | Server Component | Home con últimos 3 posts        | WordPress API               |
| `/blog`              | Server Component | Lista de todos los posts        | WordPress API               |
| `/blog/[slug]`       | SSG + ISR        | Post individual                 | WordPress API               |
| `/proveidors`        | Client Component | Lista con búsqueda y filtros    | WordPress API (client-side) |
| `/proveidors/[slug]` | SSG + ISR        | Proveedor individual            | WordPress API               |
| `/qui-som`           | Server Component | Página estática "Quiénes somos" | WordPress Page              |
| `/fer-se-soci`       | Server Component | Formulario información socios   | Estático                    |
| `/comunitat`         | Server Component | Página comunidad                | Estático                    |

## 🎨 Componentes Principales

### Client Components (necesitan interactividad)

- **Navbar.tsx** - Navegación con menú móvil (useState para toggle)
- **Footer.tsx** - Footer con enlaces
- **MapSection.tsx** - Mapa interactivo con Leaflet (requiere window)
- **Comptador.tsx** - Contador animado (requiere useEffect)
- **app/proveidors/page.tsx** - Búsqueda y filtros (useState para búsqueda)

### Server Components (preferir por defecto)

- **app/page.tsx** - Home
- **app/blog/page.tsx** - Lista blog
- **app/blog/[slug]/page.tsx** - Post individual
- **app/proveidors/[slug]/page.tsx** - Proveedor individual
- Todas las páginas estáticas (qui-som, fer-se-soci, comunitat)

## 🚀 Performance Targets

### Métricas Objetivo

- **Lighthouse Performance:** >90
- **First Contentful Paint:** <1.5s
- **Time to Interactive:** <3s
- **Largest Contentful Paint:** <2.5s
- **Bundle Size (initial):** <200KB
- **Cache Hit Rate:** >80%

### Estado Actual (a optimizar)

- ⚠️ `app/proveidors/page.tsx` es Client Component (podría optimizarse)
- ⚠️ MapSection carga Leaflet (~100KB) en todas las páginas que lo usan
- ⚠️ Algunas imágenes usan `<img>` en lugar de Next `<Image>`
- ✅ `use cache` implementado correctamente en lib/wp.ts
- ✅ Mayoría de páginas son Server Components

## 🔒 Restricciones y Limitaciones

### NUNCA modificar:

- WordPress backend (solo lectura API)
- Arquitectura de App Router
- Sistema de cache (`use cache`)
- Idioma (siempre catalán)

### LIMITACIONES técnicas:

- WordPress está en servidor externo (latencia ~50-300ms)
- Leaflet es pesado (~100KB) pero necesario para mapas
- Imágenes vienen de WordPress (URLs externas)
- Algunos campos ACF pueden estar vacíos

### PRIORIDADES:

1. Mantener compatibilidad con WordPress Local (.local) y Producción (.coop)
2. Respetar idioma catalán en todo el contenido
3. Priorizar Server Components sobre Client Components
4. Mantener coherencia con código existente
5. No romper funcionalidad actual

## 📝 Convenciones de Código Establecidas

### TypeScript

- Strict mode habilitado
- Functional components (no class components)
- Async/await (no callbacks .then())
- Named exports para funciones de lib/
- Default exports para componentes de páginas
- Interfaces para types complejos

### Naming

- **PascalCase:** Componentes (Navbar.tsx, BlogPost.tsx)
- **camelCase:** Funciones, variables (getPostBySlug, userData)
- **kebab-case:** Carpetas de rutas (fer-se-soci, qui-som)
- **UPPER_CASE:** Constantes (API_URL, MAX_POSTS)

### Comentarios

- En español para lógica compleja
- En inglés para exports y types públicos
- JSDoc para funciones importantes

## 🌐 Datos de WordPress

### Estructura de Posts

```typescript
{
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  _embedded: {
    'wp:featuredmedia': [{
      source_url: string;
      alt_text: string;
    }]
  }
}
```

### Estructura de Proveedores (CPT)

```typescript
{
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  acf: {
    tipus?: string;        // Tipo de proveedor
    ubicacio?: string;     // Ubicación
    web?: string;          // URL
    email?: string;        // Email
    telefon?: string;      // Teléfono
    descripcion?: string;  // Descripción extra
    excerpt?: string;      // extracto descripción
  }
}
```

## 🎯 Próximas Optimizaciones Planificadas

### Alto Impacto (hacer primero):

1. Lazy load de MapSection con dynamic import
2. Convertir app/proveidors/page.tsx a Server Component (si posible)
3. Optimizar imágenes usando Next Image donde sea posible
4. Reducir bundle size de Leaflet (solo cargar cuando sea necesario)

### Medio Impacto:

1. Implementar Suspense boundaries
2. Optimizar fonts loading
3. Añadir metadata dinámica completa (OpenGraph, Twitter Cards)
4. Implementar sitemap.xml dinámico

### Bajo Impacto (nice to have):

1. PWA support
2. Analytics integration
3. Error boundary personalizado
4. Loading states más sofisticados

## 📚 Stack Completo

### Dependencies Principales

```json
{
  "next": "^16.0.10",
  "react": "^19.2.3",
  "react-dom": "^19.2.3",
  "typescript": "^5.8.3",
  "tailwindcss": "^4.1.7",
  "leaflet": "^1.9.4",
  "react-leaflet": "^5.0.0",
  "lucide-react": "^0.511.0",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.3.0"
}
```

## 🔑 Variables de Entorno

### .env.local (desarrollo)

```env
NEXT_PUBLIC_WP_DOMAIN=http://laigualitaria.local
WORDPRESS_API_URL=http://laigualitaria.local/wp-json/wp/v2
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### .env.production (producción)

```env
NEXT_PUBLIC_WP_DOMAIN=https://laigualitaria.coop
WORDPRESS_API_URL=https://laigualitaria.coop/wp-json/wp/v2
NEXT_PUBLIC_SITE_URL=https://laigualitaria.coop
```

## 📖 Migración desde React

### Cambios Principales Realizados:

- ✅ React Router → Next.js App Router
- ✅ Client-side fetching → Server Components + `use cache`
- ✅ `<Link to>` → `<Link href>`
- ✅ useEffect hooks → async/await directo
- ✅ Loading states → Suspense (donde aplica)
- ✅ Layout component → app/layout.tsx

### Componentes Migrados:

- ✅ Navbar (mantiene interactividad con 'use client')
- ✅ Footer (mantiene interactividad)
- ✅ Todas las páginas principales
- ✅ Sistema de rutas dinámicas ([slug])
- ✅ 404 personalizado

## 🎓 Referencias Críticas

- **Next.js 16 Docs:** https://nextjs.org/docs
- **App Router:** https://nextjs.org/docs/app
- **Cache Components:** https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents
- **Tailwind CSS 4:** https://tailwindcss.com/docs
- **WordPress REST API:** https://developer.wordpress.org/rest-api/
- **TypeScript:** https://www.typescriptlang.org/docs/

---

**Última actualización:** Diciembre 2024
**Versión del proyecto:** 1.0.0 (Migración completada)
**Estado:** Desarrollo activo
