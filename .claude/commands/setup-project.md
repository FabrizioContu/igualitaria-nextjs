# Setup Project Context

Carga todo el contexto del proyecto para comenzar a trabajar.

## 1. Lee Documentación Base

En este orden:

1. `../project-context.md` → Arquitectura completa, stack, estructura
2. `../coding-guidelines.md` → Estándares de código
3. `../initial-prompt.md` → Instrucciones iniciales
4. `../testing-agent.md` → Estrategia de testing

## 2. Analiza Estructura del Proyecto

Revisa y comprende:

```
app/                  → App Router (Next.js 16)
  ├── layout.tsx      → Layout principal
  ├── page.tsx        → Home
  ├── blog/           → Blog posts
  ├── proveidors/     → Proveedores
  └── [pages]/        → Páginas estáticas

components/           → Componentes reutilizables
  ├── Navbar.tsx      → Client Component
  ├── Footer.tsx      → Client Component
  └── MapSection.tsx  → Client Component (Leaflet)

lib/                  → Utilidades y API
  └── wp.ts           → WordPress API (con 'use cache')

types/                → TypeScript types
  └── wordpress.ts    → Tipos de WordPress
```

## 3. Verifica Configuraciones Críticas

- **next.config.ts** → cacheComponents: true
- **tsconfig.json** → strict mode
- **package.json** → dependencias actualizadas
- **app/globals.css** → Tailwind 4 @theme

## 4. Estado del Proyecto Actual

Analiza:

- Branch actual (git status)
- Último commit
- Archivos modificados
- Issues pendientes

## 5. Conectividad WordPress

Verifica:

- WordPress accesible: https://laigualitaria.coop
- Endpoints disponibles: /wp-json/wp/v2
- Custom post types: posts, proveedores

## 6. Genera Resumen Ejecutivo

Proporciona un informe con:

### ✅ Funcionando Bien

- Lista aspectos correctos del proyecto

### ⚠️ Necesita Atención

- Lista issues o mejoras pendientes

### 🚀 Próximas Prioridades

- Sugiere 3-5 tareas prioritarias según documentación

### 📊 Métricas Actuales

- Performance estimado
- Bundle size actual
- Coverage de tests (si existe)

**Formato:** Ejecutivo, concreto, accionable.
