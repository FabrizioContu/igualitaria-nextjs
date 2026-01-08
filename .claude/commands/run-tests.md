# Run Testing Suite

Ejecuta la suite completa de tests del proyecto.

**IMPORTANTE:** Lee `../testing-agent.md` para contexto completo.

## Pre-requisitos

Verifica que tengas:

- [ ] Vitest instalado
- [ ] Playwright instalado
- [ ] Tests configurados según testing-agent.md

## 1. Unit Tests

```bash
npm test -- tests/unit/
```

### Tests de lib/wp.ts

Según `../testing-agent.md`, verifica:

- [ ] `getPageBySlug()` tests pasan
- [ ] `getLatestPost()` tests pasan
- [ ] `getPostBySlug()` tests pasan
- [ ] `getProviders()` tests pasan
- [ ] `getProviderBySlug()` tests pasan
- [ ] Error handling testeado

### Cobertura

```bash
npm run test:coverage
```

Target: >80% según testing-agent.md

## 2. Component Tests

```bash
npm test -- tests/components/
```

### Client Components Críticos

- [ ] Navbar.tsx
- [ ] Footer.tsx
- [ ] MapSection.tsx (si tiene tests)
- [ ] Comptador.tsx

### Verificar

- [ ] Componentes renderizan
- [ ] Props funcionan correctamente
- [ ] Estado se maneja bien
- [ ] Eventos funcionan

## 3. Integration Tests

```bash
npm test -- tests/integration/
```

Si existen, verificar:

- [ ] WordPress API integration
- [ ] Data fetching
- [ ] Cache behavior

## 4. E2E Tests

```bash
npm run test:e2e
```

### Según testing-agent.md:

**Flujos Críticos:**

- [ ] Navegación entre páginas
- [ ] Blog posts cargan
- [ ] Búsqueda de proveedores funciona
- [ ] Links externos funcionan
- [ ] Responsive design funciona

### E2E con UI (para debugging)

```bash
npm run test:e2e:ui
```

## 5. Performance Tests

Si configurados:

```bash
npm run test:performance
```

Verifica según `../project-context.md`:

- [ ] Lighthouse >90
- [ ] FCP <1.5s
- [ ] TTI <3s
- [ ] Bundle <200KB

## 6. Accessibility Tests

Si configurados:

```bash
npm run test:a11y
```

- [ ] Landmarks presentes
- [ ] Alt texts en imágenes
- [ ] Keyboard navigation
- [ ] ARIA labels correctos

## Análisis de Resultados

### Tests Passed

```
✓ Unit Tests:        XX/XX passed
✓ Component Tests:   XX/XX passed
✓ Integration Tests: XX/XX passed
✓ E2E Tests:         XX/XX passed
```

### Coverage Report

```
Statements: XX%
Branches:   XX%
Functions:  XX%
Lines:      XX%
```

Target: >80% global

### Failed Tests

Si hay tests fallando:

```
❌ [Test Name]
File: tests/unit/wp.test.ts:45
Error: [Error message]
```

Para cada fallo:

1. Identificar causa
2. Proponer fix
3. Verificar que no rompe otros tests

## Reporte Completo

### ✅ Test Summary

```
Total Tests:     XXX
Passed:          XXX
Failed:          XX
Skipped:         XX
Duration:        X.XXs
```

### 📊 Coverage

```
Overall:         XX%
lib/wp.ts:       XX%
components/:     XX%
Status:          [PASS/FAIL] (>80% target)
```

### ⚠️ Issues Encontrados

Lista issues específicos con archivos y líneas.

### 🎯 Recomendaciones

1. [Recomendación específica]
2. [Recomendación específica]

### 🚀 Ready for Deploy?

```
TEST STATUS: [✅ ALL PASS / ⚠️ WARNINGS / ❌ FAILS]

Justificación:
[Explicación del estado de tests]
```

## Comandos Útiles

```bash
# Watch mode (desarrollo)
npm test -- --watch

# Test específico
npm test -- tests/unit/wp.test.ts

# Con coverage
npm run test:coverage

# E2E con UI
npm run test:e2e:ui

# Solo tests de un archivo
npm test -- --grep="WordPress API"
```

## Troubleshooting

### Tests Lentos

```bash
# Identifica tests lentos
npm test -- --reporter=verbose
```

- Optimizar setup/teardown
- Usar mocks apropiados
- Paralelizar tests si posible

### Tests Flaky

- Identificar y documentar
- Añadir retries si necesario
- Investigar race conditions

### Mocks No Funcionan

- Verificar setup en tests/setup.ts
- Confirmar paths correctos
- Revisar tipos TypeScript
