# 🏢 La Igualitària - Economat Cooperatiu del Poble-sec

Web de La Igualitària, economat cooperatiu situado en el barrio del Poble-sec de Barcelona. Proyecto desarrollado con Next.js 16 y WordPress como CMS headless.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

## 🌐 URLs del Proyecto

- **Producción:** https://laigualitaria.coop (próximamente en Vercel)
- **WordPress Backend:** https://laigualitaria.coop/wp-admin
- **API REST:** https://laigualitaria.coop/wp-json/wp/v2
- **Desarrollo Local:** http://localhost:3000

## 📋 Sobre el Proyecto

La Igualitària es una cooperativa de consumo responsable que promueve la economía social y solidaria. Esta web permite:

- **Blog** - Noticias y artículos sobre la cooperativa
- **Proveedores** - Directorio de productores y proveedores locales
- **Información** - Páginas estáticas sobre la cooperativa, cómo hacerse socio, etc.
- **Mapa** - Ubicación del local y puntos de interés

### Migración desde React

Este proyecto es una **migración de una SPA React a Next.js 16** para mejorar:

- ✅ SEO y posicionamiento en buscadores
- ✅ Performance (Server-Side Rendering)
- ✅ Experiencia de usuario (carga inicial más rápida)
- ✅ Mantenibilidad del código

## 🚀 Stack Tecnológico

### Frontend

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) (strict mode)
- **Estilos:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Iconos:** [Lucide React](https://lucide.dev/)
- **Mapas:** [Leaflet](https://leafletjs.com/) + [React Leaflet](https://react-leaflet.js.org/)

### Backend

- **CMS:** [WordPress](https://wordpress.org/) (Headless)
- **API:** WordPress REST API
- **Custom Post Types:** Proveedores (productores locales)
- **Campos Personalizados:** Advanced Custom Fields (ACF)

### Deployment

- **Hosting Frontend:** [Vercel](https://vercel.com/)
- **Hosting WordPress:** Servidor propio
- **CI/CD:** Automático via Git Push

## 🏗️ Arquitectura

```
┌─────────────────┐
│   Vercel        │
│   (Next.js 16)  │
│   SSR + SSG     │
└────────┬────────┘
         │ API Calls
         │ (REST API)
         ▼
┌─────────────────┐
│   WordPress     │
│   (Headless)    │
│   laigualitaria │
│   .coop         │
└─────────────────┘
```

### Características Clave

- **Server Components por defecto** - Mejor performance
- **Client Components selectivos** - Solo donde se necesita interactividad
- **Cache estratégico** - Uso de `'use cache'` en llamadas API
- **ISR (Incremental Static Regeneration)** - Contenido actualizado automáticamente
- **Optimización de imágenes** - Next.js Image Optimization
- **SEO optimizado** - Metadata dinámica por página

## 📁 Estructura del Proyecto

```
laigualitaria-nextjs/
├── app/                          # App Router (Next.js 16)
│   ├── layout.tsx                # Layout principal
│   ├── page.tsx                  # Homepage
│   ├── globals.css               # Estilos globales (Tailwind 4)
│   ├── blog/                     # Blog
│   │   ├── page.tsx             # Lista de posts (SSG)
│   │   └── [slug]/              # Post individual (SSG + ISR)
│   ├── proveidors/               # Proveedores
│   │   ├── page.tsx             # Lista (Client Component)
│   │   └── [slug]/              # Proveedor individual (SSG + ISR)
│   ├── qui-som/                  # Quiénes somos (SSG)
│   ├── fer-se-soci/              # Hacerse socio (SSG)
│   ├── comunitat/                # Comunidad (SSG)
│   └── not-found.tsx             # 404 personalizado
│
├── components/                   # Componentes reutilizables
│   ├── Navbar.tsx               # Navegación (Client)
│   ├── Footer.tsx               # Footer (Client)
│   ├── MapSection.tsx           # Mapa interactivo (Client)
│   ├── Participa.tsx            # Componente de participación
│   ├── Comptador.tsx            # Contador animado (Client)
│   └── ui/                      # Componentes UI básicos
│
├── lib/                          # Utilidades y lógica
│   ├── wp.ts                    # WordPress API client (con cache)
│   └── utils.ts                 # Funciones auxiliares
│
├── types/                        # TypeScript types
│   └── wordpress.ts             # Tipos de WordPress/ACF
│
├── hooks/                        # Custom React hooks
│   └── use-mobile.tsx           # Hook para detectar mobile
│
├── public/                       # Assets estáticos
│   ├── *.webp                   # Imágenes optimizadas
│   └── *.png                    # Logos e iconos
│
├── .claude/                      # Configuración Claude Code
│   ├── CLAUDE.md                # Config principal
│   ├── project-context.md       # Contexto del proyecto
│   ├── coding-guidelines.md     # Estándares de código
│   └── commands/                # Comandos personalizados
│
├── next.config.ts               # Configuración Next.js
├── tsconfig.json                # Configuración TypeScript
├── tailwind.config.ts           # Configuración Tailwind (legacy)
├── package.json                 # Dependencies
└── README.md                    # Este archivo
```
