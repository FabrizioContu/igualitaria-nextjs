# 🤖 CLAUDE CODE - GUÍA DE USO RÁPIDO

## 🚀 COMANDOS INICIALES

### Primera vez (establecer contexto)

```bash
claude "Lee todos los archivos en .claude/ y familiarízate con el proyecto La Igualitària. Dame un resumen ejecutivo del estado actual."
```

### Análisis completo del proyecto

```bash
claude "Siguiendo las instrucciones en .claude/initial-prompt.md, haz un análisis completo de performance y dame las top 5 optimizaciones prioritarias con impacto estimado."
```

## 📊 COMANDOS FRECUENTES

### Análisis de Performance

```bash
# Performance audit completo
claude "Analiza el performance del proyecto completo. Dame métricas actuales, bottlenecks, y un plan de optimización priorizado."

# Analizar página específica
claude "Analiza app/proveidors/page.tsx y sugiere optimizaciones de performance manteniendo funcionalidad."

# Bundle size
claude "Analiza el bundle size del proyecto. Identifica los componentes más pesados y sugiere cómo reducirlo."
```

### Code Review

```bash
# Revisar componente
claude "Haz un code review de components/Navbar.tsx siguiendo nuestros estándares en .claude/coding-guidelines.md"

# Revisar múltiples archivos
claude "Revisa todos los componentes en components/ y dame un informe de calidad de código."

# Buscar anti-patterns
claude "Busca anti-patterns en el proyecto (any injustificados, Client Components innecesarios, imports completos)."
```

### Optimización Específica

```bash
# Optimizar componente
claude "Optimiza components/MapSection.tsx para lazy loading y mejor performance."

# Convertir a Server Component
claude "Analiza si app/proveidors/page.tsx puede ser Server Component. Si sí, muéstrame el código refactorizado."

# Optimizar imágenes
claude "Encuentra todas las imágenes que no usan Next Image y crea un plan de migración."
```

### Debugging

```bash
# Por qué es lento
claude "Por qué app/proveidors/page.tsx carga lento? Analiza y sugiere solución."

# Problemas de TypeScript
claude "Revisa todos los archivos .tsx y encuentra errores de TypeScript o usos de any."

# CORS o API issues
claude "Analiza lib/wp.ts y verifica si hay issues potenciales con la API de WordPress."
```

### Refactoring

```bash
# Refactor con coherencia
claude "Refactoriza [archivo] siguiendo los patterns establecidos en el proyecto."

# Mejorar tipos
claude "Revisa types/wordpress.ts y mejora los tipos para ser más específicos."

# DRY (Don't Repeat Yourself)
claude "Encuentra código duplicado en el proyecto y sugiere cómo consolidarlo."
```

## 🎯 PLANTILLAS DE PROMPTS EFECTIVOS

### Template: Análisis

```bash
claude "Analiza [componente/archivo] y dame:
1. Estado actual (qué hace, cómo)
2. Issues detectados (performance, types, patterns)
3. Soluciones propuestas (priorizadas)
4. Impacto estimado (performance, bundle, mantenibilidad)"
```

### Template: Optimización

```bash
claude "Optimiza [componente] siguiendo estas prioridades:
1. Performance first
2. Mantener coherencia con el proyecto
3. Type safety
4. Explicar tus decisiones
5. Código listo para implementar"
```

### Template: Implementación

```bash
claude "Implementa [feature/optimización] siguiendo:
- Guías en .claude/coding-guidelines.md
- Patterns existentes en el proyecto
- TypeScript strict
- Comentarios explicativos
- Tests básicos si aplica"
```

## 📋 WORKFLOWS COMUNES

### Workflow 1: Optimización de Performance

```bash
# Paso 1: Análisis
claude "Haz performance audit completo del proyecto"

# Paso 2: Identificar Quick Wins
claude "De las optimizaciones sugeridas, dame las 3 quick wins (alto impacto, bajo esfuerzo)"

# Paso 3: Implementar
claude "Implementa [quick win específico] con código completo y explicación"

# Paso 4: Verificar
claude "Qué métricas mejoraron con este cambio? Dame antes/después estimado"
```

### Workflow 2: Code Quality Improvement

```bash
# Paso 1: Audit
claude "Haz code quality audit: TypeScript errors, anti-patterns, inconsistencias"

# Paso 2: Priorizar
claude "Prioriza los issues encontrados por impacto en mantenibilidad"

# Paso 3: Fix
claude "Fix los top 3 issues más críticos con código completo"

# Paso 4: Documentar
claude "Documenta los cambios hechos y crea checklist de calidad para futuros PRs"
```

### Workflow 3: Feature Implementation

```bash
# Paso 1: Entender
claude "Quiero agregar [feature]. Analiza dónde encaja en la arquitectura actual"

# Paso 2: Diseñar
claude "Diseña la implementación siguiendo patterns del proyecto"

# Paso 3: Implementar
claude "Implementa [feature] con:
- Server Components donde sea posible
- TypeScript types
- Error handling
- Loading states"

# Paso 4: Revisar
claude "Revisa la implementación y sugiere mejoras"
```

## 🔥 PROMPTS AVANZADOS

### Análisis Profundo

```bash
claude "Haz un análisis profundo de:
1. Architecture decisions (por qué App Router, cache strategy)
2. Performance bottlenecks (mide y cuantifica)
3. Type safety coverage (%, dónde falta)
4. Scalability (qué pasa si 10x tráfico)
5. Mantenibilidad (complejidad, coherencia)

Dame un informe ejecutivo con roadmap de 3 meses."
```

### Migración

```bash
claude "Tengo que migrar [componente] de Client a Server Component.
Analiza:
1. Es posible? (estado, eventos, APIs)
2. Qué hay que cambiar? (código específico)
3. Cuál es el beneficio? (métricas)
4. Qué riesgos hay? (funcionalidad, UX)
5. Plan de implementación paso a paso"
```

### Comparación

```bash
claude "Compara mi implementación de [feature] contra best practices de Next.js 16.
Dame:
1. Qué estoy haciendo bien
2. Qué puedo mejorar
3. Ejemplos de código mejorado
4. Referencias a docs oficiales"
```

## 💡 TIPS PARA MEJORES RESULTADOS

### ✅ DO - Buenos Prompts

```bash
✅ "Analiza app/page.tsx y sugiere optimizaciones siguiendo .claude/coding-guidelines.md"
✅ "Por qué [componente] es lento? Dame profiling y solución con código"
✅ "Implementa lazy loading de MapSection manteniendo coherencia con el proyecto"
✅ "Revisa types/wordpress.ts y hazlos más específicos sin romper código existente"
```

### ❌ DON'T - Malos Prompts

```bash
❌ "Optimiza todo" (muy vago)
❌ "Hazlo mejor" (sin contexto específico)
❌ "Arregla esto" (sin decir qué está mal)
❌ "Usa esta librería" (sin justificación)
```

### 🎯 Prompts Efectivos Deben:

1. **Ser específicos** - Archivo/componente concreto
2. **Dar contexto** - Qué problema hay
3. **Seguir guías** - Referenciar .claude/
4. **Pedir explicaciones** - No solo código
5. **Priorizar** - Qué es más importante

## 🎓 EJEMPLOS REALES

### Ejemplo 1: Optimizar Componente Pesado

```bash
# Prompt
claude "MapSection.tsx usa Leaflet (~100KB). Analiza:
1. Impacto actual en bundle
2. Estrategia de lazy loading óptima
3. Código implementado con dynamic import
4. Mejora estimada en métricas"

# Resultado esperado
- Análisis de impacto
- Código con dynamic import
- Loading placeholder
- Métricas antes/después
```

### Ejemplo 2: Convertir a Server Component

```bash
# Prompt
claude "app/proveidors/page.tsx es Client Component por búsqueda/filtros.
Opciones:
A) Mantener Client pero optimizar
B) Separar en Server (lista) + Client (filtros)
C) Usar URL params y mantener Server

Analiza cada opción (pros/cons) y recomienda la mejor con código."

# Resultado esperado
- Análisis de 3 opciones
- Recomendación justificada
- Código de implementación
- Plan de migración
```

### Ejemplo 3: Reducir Bundle

```bash
# Prompt
claude "El bundle de app/ es muy grande. Analiza:
1. Qué componentes son más pesados
2. Qué librerías ocupan más espacio
3. Dónde aplicar code splitting
4. Implementación de lazy loading estratégico
5. Impacto estimado en KB

Dame plan de acción priorizado con código."

# Resultado esperado
- Bundle analysis
- Top offenders
- Plan de reducción
- Código específico
- Métricas estimadas
```

## 🚀 SESIÓN TÍPICA DE OPTIMIZACIÓN

```bash
# 1. Contexto inicial (una vez)
claude "Lee .claude/ y dame overview del proyecto"

# 2. Performance audit
claude "Performance audit completo con métricas y plan"

# 3. Quick wins
claude "Dame top 3 quick wins con código listo"

# 4. Implementar win #1
claude "Implementa [quick win] con:
- Código completo
- Explicación de cambios
- Tests de verificación
- Impacto esperado"

# 5. Código para win #2
...

# 6. Verificación final
claude "Resumen de optimizaciones hechas y métricas mejoradas"
```

## 📚 RECURSOS

### Documentación del Proyecto

- `.claude/project-context.md` - Arquitectura y contexto
- `.claude/coding-guidelines.md` - Estándares de código
- `.claude/initial-prompt.md` - Instrucciones para Claude

### Comandos de Verificación

```bash
# Ver logs de Claude
claude --history

# Versión
claude --version

# Help
claude --help
```

## ✅ CHECKLIST ANTES DE EMPEZAR

- [ ] Instalado Claude Code globalmente
- [ ] API Key configurada
- [ ] Dentro del directorio del proyecto
- [ ] Archivos .claude/ presentes
- [ ] Context cargado con primer comando

## 🎯 RECORDATORIO

Claude Code es tu **experto frontend senior**. Úsalo para:

- ✅ Análisis profundos
- ✅ Código de calidad
- ✅ Best practices
- ✅ Optimizaciones reales

NO para:

- ❌ Generar código sin criterio
- ❌ Cambios sin justificación
- ❌ Romper arquitectura
- ❌ Ignorar contexto

**¡Ahora ve y optimiza! 🚀**

---

**TIP FINAL:** Empieza cada sesión cargando contexto:

```bash
claude "Actúa como experto frontend. Lee .claude/initial-prompt.md"
```
