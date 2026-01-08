# 📘 GUÍAS DE DESARROLLO - LA IGUALITÀRIA

## 🎯 PRINCIPIOS FUNDAMENTALES

### 1. Server First

**Por defecto:** Server Components

**Client Component solo si necesita:**

- ✅ `useState`, `useEffect`, `useCallback`
- ✅ Event handlers (onClick, onChange, onSubmit)
- ✅ Browser APIs (window, document, localStorage)
- ✅ Interactividad del usuario (forms, toggles, modals)
- ✅ Third-party que requiere cliente (Leaflet, Chart.js)

**Ejemplos válidos de Client Components:**

```typescript
// ✅ Navbar - Necesita menú móvil interactivo
"use client";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return <nav onClick={() => setIsOpen(!isOpen)}>...</nav>;
}

// ✅ Proveidors - Necesita búsqueda y filtros
("use client");
export default function Proveidors() {
  const [searchTerm, setSearchTerm] = useState("");
  return <input onChange={(e) => setSearchTerm(e.target.value)} />;
}
```

### 2. Performance First

- Cache agresivo con `'use cache'`
- Lazy loading para componentes pesados (>50KB)
- Dynamic imports para rutas secundarias
- Optimización de imágenes automática
- Bundle splitting por ruta

**Estrategia de cache:**

```typescript
// lib/wp.ts - TODAS las funciones usan 'use cache'
export async function getPageBySlug(slug: string) {
  "use cache";
  // Next.js cachea automáticamente
  const data = await fetchJSON(`${API_URL}/pages?slug=${slug}`);
  return data;
}
```

### 3. Type Safety

- TypeScript strict mode siempre
- No usar `any` sin justificación documentada
- Tipos explícitos en funciones exportadas
- Interfaces para estructuras complejas
- Tipos importados desde types/

**Ejemplo de tipado correcto:**

```typescript
// types/wordpress.ts
export type PostListItem = {
  id: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  featuredImage: string | null;
};

// lib/wp.ts
export async function getLatestPost(): Promise<PostListItem[]> {
  "use cache";
  // Implementación tipada
}
```

## 🏗️ ARQUITECTURA DE COMPONENTES

### Estructura Estándar de Componente

```typescript
// 1. Directiva (si es Client Component)
"use client";

// 2. Imports - Agrupados y ordenados
import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { getData } from "@/lib/api";
import { Button } from "@/components/ui/button";
import type { User } from "@/types";

// 3. Types/Interfaces (si son locales)
type ComponentProps = {
  title: string;
  data: DataType;
};

// 4. Component Function
export default function Component({ title, data }: ComponentProps) {
  // 4a. State (si Client Component)
  const [state, setState] = useState(false);

  // 4b. Effects (si Client Component)
  useEffect(() => {
    // Lógica
  }, []);

  // 4c. Handlers
  function handleClick() {
    setState(true);
  }

  // 4d. Render logic
  const processed = processData(data);

  // 4e. JSX Return
  return (
    <div className="container mx-auto px-4">
      <h1>{title}</h1>
      <button onClick={handleClick}>Click</button>
    </div>
  );
}

// 5. Helper functions (al final)
function processData(data: DataType) {
  return data.map((item) => item.value);
}
```

### Server Component Pattern (Preferido)

```typescript
// NO 'use client' directive
import { notFound } from "next/navigation";
import { getData } from "@/lib/wp";

type Props = {
  params: Promise<{ slug: string }>;
};

// Metadata dinámica para SEO
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const data = await getData(slug);

  return {
    title: `${data.title} - La Igualitària`,
    description: data.excerpt,
  };
}

// Componente
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const data = await getData(slug);

  if (!data) notFound();

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <h1>{data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </main>
  );
}
```

### Client Component Pattern (Solo si necesario)

```typescript
"use client"; // ← Primera línea obligatoria

import { useState } from "react";

type Props = {
  initialData: DataType[];
};

export default function ClientComponent({ initialData }: Props) {
  const [data, setData] = useState(initialData);

  function handleFilter(term: string) {
    const filtered = initialData.filter((item) =>
      item.title.toLowerCase().includes(term.toLowerCase())
    );
    setData(filtered);
  }

  return (
    <div>
      <input onChange={(e) => handleFilter(e.target.value)} />
      {data.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}
```

## 🎨 ESTILOS Y DISEÑO (Tailwind CSS 4)

### Guidelines de Clases

```typescript
// ✅ BIEN: Clases ordenadas y semánticas
<div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">

// ❌ MAL: Clases desordenadas
<div className="p-6 flex shadow-md rounded-lg transition-shadow bg-white flex-col items-center hover:shadow-xl gap-4">

// ✅ BIEN: Clases custom del proyecto
<h1 className="gradient-text text-4xl font-bold">Título</h1>

// ✅ BIEN: Responsive design mobile-first
<div className="text-sm sm:text-base md:text-lg lg:text-xl">

// ✅ BIEN: Estados con hover/focus
<button className="bg-primary hover:bg-primary-dark focus:ring-2 focus:ring-primary">
```

### Colores del Proyecto (Tailwind 4)

```css
/* app/globals.css */
@theme {
  --color-primary: #ec4899;           /* Rosa principal */
  --color-primary-light: #fce7f3;     /* Rosa claro */
  --color-primary-dark: #be185d;      /* Rosa oscuro */
  --color-secondary: #f97316;         /* Naranja */
}

/* Uso en componentes */
className="text-primary"           /* Rosa */
className="bg-primary-light"       /* Rosa claro */
className="border-primary-dark"    /* Rosa oscuro */
className="text-secondary"         /* Naranja */
```

### Custom Utilities

```css
/* app/globals.css */
@layer utilities {
  .gradient-text {
    background: linear-gradient(to right, #ec4899, #f97316);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
}

/* Uso */
<h1 className="gradient-text">La Igualitària</h1>
```

## 📊 DATA FETCHING PATTERNS

### Server Component (Preferido - 90% de los casos)

```typescript
// lib/wp.ts
export async function getPageData(slug: string) {
  "use cache"; // ← OBLIGATORIO para cache

  const data = await fetch(`${API_URL}/pages?slug=${slug}`);
  return data.json();
}

// app/page.tsx
export default async function Page() {
  // Fetch directo - cacheado automáticamente
  const data = await getPageData("home");

  return <div>{data.title}</div>;
}
```

### Parallel Fetching (Server Component)

```typescript
export default async function Page() {
  // Fetching en paralelo - más rápido
  const [posts, pageData] = await Promise.all([
    getLatestPost({ perPage: 3 }),
    getPageBySlug("la-igualitaria"),
  ]);

  return (
    <>
      <h1>{pageData[0]}</h1>
      {posts.map((post) => (
        <article key={post.id}>...</article>
      ))}
    </>
  );
}
```

### Client Component (Solo si necesario)

```typescript
'use client';

import { useState, useEffect } from 'react';

export default function ClientPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Carregant...</div>;

  return <div>{data.map(item => ...)}</div>;
}
```

## 🔧 OPTIMIZACIONES OBLIGATORIAS

### 1. Lazy Loading de Componentes Pesados

```typescript
// Para componentes >50KB (ej: Leaflet, Charts)
import dynamic from "next/dynamic";

// ✅ BIEN: Lazy load con SSR deshabilitado
const MapSection = dynamic(() => import("@/components/MapSection"), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-gray-200 animate-pulse rounded-lg">
      Carregant mapa...
    </div>
  ),
});

export default function Page() {
  return (
    <div>
      <h1>Proveidors</h1>
      <MapSection providers={data} />
    </div>
  );
}
```

### 2. Image Optimization

```typescript
// ❌ MAL: <img> básico
<img src="/hero.jpg" alt="Hero" />

// ✅ BIEN: Next Image (cuando sea posible)
import Image from 'next/image';
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority // Para hero images
/>

// ✅ ACEPTABLE: WordPress images (URLs externas)
<img
  src={wordpressImageUrl}
  alt={altText}
  loading="lazy"
  className="w-full h-auto object-cover"
/>
```

### 3. Bundle Size Reduction

```typescript
// ❌ MAL: Importar librería completa
import _ from "lodash";
const result = _.debounce(fn, 300);

// ✅ BIEN: Import específico
import { debounce } from "lodash";
const result = debounce(fn, 300);

// ❌ MAL: Importar íconos completos
import * as Icons from "lucide-react";

// ✅ BIEN: Import específico
import { Calendar, MapPin, Clock } from "lucide-react";
```

### 4. Code Splitting por Ruta

```typescript
// Next.js lo hace automáticamente por ruta
// Pero puedes optimizar más con dynamic imports

// app/heavy-feature/page.tsx
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("./HeavyComponent"));

export default function Page() {
  return <HeavyComponent />;
}
```

## 🌐 INTERNACIONALIZACIÓN (Catalán)

### Formato de Fechas

```typescript
// ✅ SIEMPRE usar locale 'ca-ES'
new Date().toLocaleDateString("ca-ES", {
  year: "numeric",
  month: "long",
  day: "numeric",
});
// Output: "15 de desembre de 2024"

// Para días de semana
new Date().toLocaleDateString("ca-ES", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});
// Output: "dilluns, 15 de desembre de 2024"
```

### Textos en Catalán

```typescript
// ✅ Apóstrofes catalanas correctas
"l'any", "d'una", "s'ha", "l'altre";

// ✅ Artículos
"el", "la", "els", "les";

// ✅ Palabras comunes
("Més informació"); // Más información
("Llegir més"); // Leer más
("Tornar"); // Volver
("Cerca"); // Buscar
("Carregant..."); // Cargando...
```

## 🔒 SEGURIDAD Y BEST PRACTICES

### 1. Sanitización de Contenido WordPress

```typescript
// ✅ BIEN: WordPress content es trusted
<div dangerouslySetInnerHTML={{ __html: post.content }} />

// ❌ MAL: User input directo
<div dangerouslySetInnerHTML={{ __html: userInput }} /> // ¡NUNCA!

// ✅ Para user input: escapar o usar libraries
import DOMPurify from 'isomorphic-dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />
```

### 2. Error Handling

```typescript
// ✅ BIEN: Try-catch en data fetching
export async function getData(slug: string) {
  "use cache";

  try {
    const res = await fetch(`${API_URL}/data/${slug}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error(`Error fetching data for ${slug}:`, error);
    return null; // O throw según contexto
  }
}

// En el componente
const data = await getData(slug);
if (!data) notFound(); // Next.js 404
```

### 3. Loading y Error States

```typescript
// Server Component - Usar not-found.tsx y error.tsx
import { notFound } from "next/navigation";

export default async function Page({ params }: Props) {
  const data = await getData(params.slug);
  if (!data) notFound(); // Renderiza app/not-found.tsx
  return <div>{data}</div>;
}

// Client Component - Mostrar loading manualmente
("use client");
export default function ClientPage() {
  const [loading, setLoading] = useState(true);

  if (loading) return <div className="animate-pulse">Carregant...</div>;
  return <div>Content</div>;
}
```

## 📁 ESTRUCTURA DE ARCHIVOS Y NAMING

### Convenciones de Nombres

```
✅ Componentes:     PascalCase      (Navbar.tsx, BlogPost.tsx)
✅ Funciones:       camelCase       (getPostBySlug, formatDate)
✅ Variables:       camelCase       (userData, isLoading)
✅ Rutas (folders): kebab-case      (fer-se-soci/, qui-som/)
✅ Constantes:      UPPER_SNAKE     (API_URL, MAX_ITEMS)
✅ Types:           PascalCase      (UserData, PostListItem)
✅ Interfaces:      PascalCase      (ComponentProps, APIResponse)
```

### Orden de Imports

```typescript
// 1. React y Next.js
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

// 2. External libraries
import { Calendar, MapPin } from "lucide-react";
import { debounce } from "lodash";

// 3. Internal - Absolute imports (@/)
import { getPostBySlug } from "@/lib/wp";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// 4. Relative imports
import { helper } from "./utils";
import styles from "./styles.module.css";

// 5. Types (al final)
import type { Post, User } from "@/types/wordpress";
```

## 🧪 QUALITY CHECKLIST

### Antes de Commit

- [ ] TypeScript compila sin errores (`npm run build`)
- [ ] No hay console.logs en código de producción
- [ ] Componentes tienen tipos correctos
- [ ] `'use cache'` en funciones de fetching
- [ ] Server Components usados donde sea posible
- [ ] Imágenes optimizadas (lazy loading)
- [ ] Responsive design funciona (mobile + desktop)
- [ ] Links funcionan correctamente
- [ ] SEO metadata completo
- [ ] Performance aceptable (<3s TTI)

### Code Review Checklist

- [ ] Código sigue convenciones del proyecto
- [ ] No hay código duplicado
- [ ] Funciones tienen responsabilidad única
- [ ] Nombres descriptivos y claros
- [ ] Comentarios donde sea necesario
- [ ] Error handling implementado
- [ ] Loading states apropiados
- [ ] Accesibilidad básica (alt texts, aria-labels)

## 🚫 ANTI-PATTERNS - QUÉ NO HACER

### ❌ Client Component Innecesario

```typescript
// ❌ MAL: No necesita ser Client Component
"use client";
export default function StaticPage() {
  return <div>Static content here</div>;
}

// ✅ BIEN: Server Component por defecto
export default function StaticPage() {
  return <div>Static content here</div>;
}
```

### ❌ Fetch Sin Cache

```typescript
// ❌ MAL: Sin cache - fetching cada vez
export async function getData() {
  return await fetch(url).then((r) => r.json());
}

// ✅ BIEN: Con cache
export async function getData() {
  "use cache";
  return await fetch(url).then((r) => r.json());
}
```

### ❌ Importar Todo

```typescript
// ❌ MAL: +200KB al bundle
import _ from "lodash";
import * as Icons from "lucide-react";

// ✅ BIEN: Solo lo necesario
import { debounce } from "lodash";
import { Calendar, MapPin } from "lucide-react";
```

### ❌ any Sin Justificación

```typescript
// ❌ MAL: Tipo any sin razón
function process(data: any) {
  return data.map((item) => item.value);
}

// ✅ BIEN: Tipo específico
function process(data: DataItem[]) {
  return data.map((item) => item.value);
}

// ✅ ACEPTABLE: any documentado
function process(data: any) {
  // WordPress API returns untyped data
  return data.map((item: WordPressItem) => item.value);
}
```

### ❌ No Manejar Errores

```typescript
// ❌ MAL: Sin error handling
export async function getData() {
  const data = await fetch(url);
  return data.json();
}

// ✅ BIEN: Con error handling
export async function getData() {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
```

## 📚 REFERENCIAS TÉCNICAS

### Documentación Oficial

- **Next.js 16:** https://nextjs.org/docs
- **App Router:** https://nextjs.org/docs/app
- **Cache Components:** https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents
- **TypeScript:** https://www.typescriptlang.org/docs/
- **Tailwind CSS 4:** https://tailwindcss.com/docs
- **React 19:** https://react.dev/

### APIs Externas

- **WordPress REST API:** https://developer.wordpress.org/rest-api/
- **Leaflet:** https://leafletjs.com/reference.html
- **Lucide Icons:** https://lucide.dev/

### Performance

- **Web.dev Metrics:** https://web.dev/metrics/
- **Lighthouse:** https://developer.chrome.com/docs/lighthouse/
- **Core Web Vitals:** https://web.dev/vitals/

---

**Última actualización:** Diciembre 2024
**Versión:** 1.0.0
