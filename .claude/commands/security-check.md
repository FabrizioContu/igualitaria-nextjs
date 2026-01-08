# Security Review

Revisión de seguridad antes de desplegar a producción.

## 1. Secrets y Credenciales

### Búsqueda en Código

Busca patterns peligrosos:

```bash
# Buscar posibles API keys
grep -r "API_KEY\|api_key\|apiKey" --exclude-dir=node_modules
grep -r "SECRET\|secret" --exclude-dir=node_modules
grep -r "password\|PASSWORD" --exclude-dir=node_modules
grep -r "token\|TOKEN" --exclude-dir=node_modules
```

- [ ] No hay API keys hardcodeadas
- [ ] No hay passwords en el código
- [ ] No hay tokens hardcodeados
- [ ] Credentials solo en variables de entorno

### Variables de Entorno

- [ ] Todas las vars sensibles en .env.local
- [ ] .env.local en .gitignore
- [ ] .env.example documentado (sin valores reales)
- [ ] No hay commits con secrets en git history

## 2. Headers de Seguridad

Verifica `next.config.ts`:

```typescript
headers: [
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN", // ✅ Presente
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff", // ✅ Presente
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin", // ✅ Presente
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains", // ✅ Presente
  },
];
```

- [ ] X-Frame-Options configurado
- [ ] X-Content-Type-Options configurado
- [ ] Referrer-Policy configurado
- [ ] Strict-Transport-Security configurado (HSTS)

## 3. Validación de Datos

### WordPress API

Revisa en `lib/wp.ts`:

- [ ] Validación de parámetros de entrada
- [ ] Sanitización de slugs
- [ ] Validación de respuestas de API
- [ ] No se confía ciegamente en datos externos

### Formularios (si existen)

- [ ] Validación client-side
- [ ] Validación server-side
- [ ] Sanitización de inputs
- [ ] CSRF protection si aplica

## 4. Dependencies Security

```bash
npm audit
```

- [ ] Lista vulnerabilidades encontradas
- [ ] Clasifica por severidad (critical, high, moderate, low)
- [ ] Recomienda fixes: `npm audit fix`
- [ ] Identifica packages deprecados

### Packages Comunes con Issues

Verifica especialmente:

- [ ] No hay versiones muy antiguas de React
- [ ] No hay versiones muy antiguas de Next.js
- [ ] Leaflet actualizado (si posible)

## 5. Exposición de Información

### Error Messages

- [ ] Errors no exponen stack traces en producción
- [ ] Errors no exponen rutas del sistema
- [ ] Errors no exponen versiones de software
- [ ] Mensajes genéricos al usuario, detalles en logs

### Logs y Debugging

```bash
# Buscar console.log que exponen datos
grep -r "console.log" --exclude-dir=node_modules
```

- [ ] No hay console.log con datos sensibles
- [ ] No hay console.error con información interna
- [ ] Logs de desarrollo removidos

### Comentarios

- [ ] No hay comentarios con passwords
- [ ] No hay comentarios con TODOs de seguridad
- [ ] No hay comentarios con URLs internas

## 6. WordPress API Security

### Authentication

- [ ] No se expone WordPress admin
- [ ] API es solo lectura (no hay POST/PUT/DELETE)
- [ ] Rate limiting en WordPress (si crítico)

### CORS

- [ ] CORS configurado solo para dominios necesarios
- [ ] No hay CORS: \* en producción
- [ ] Origin verificado en WordPress

## 7. Next.js Specific

### Server Components

- [ ] No hay datos sensibles en props de Client Components
- [ ] Secrets solo en Server Components
- [ ] Environment vars con NEXT*PUBLIC* solo si necesario

### API Routes (si existen)

- [ ] Validación de requests
- [ ] Rate limiting si necesario
- [ ] Authentication si necesario
- [ ] CORS configurado apropiadamente

## 8. Third-Party Services

Si usas servicios externos:

- [ ] APIs externas llamadas desde servidor, no cliente
- [ ] API keys en variables de entorno
- [ ] Timeouts configurados
- [ ] Error handling para servicios caídos

## 9. Build Security

- [ ] Source maps deshabilitados en producción
- [ ] Variables de entorno no incluidas en bundle
- [ ] No hay archivos .env en repo
- [ ] .gitignore correctamente configurado

## 10. Vercel Security

Configuración en Vercel:

- [ ] Environment variables correctas
- [ ] No hay secrets en variables NEXT*PUBLIC*
- [ ] Branch protection habilitado
- [ ] Deploy previews solo para miembros del equipo

## Reporte de Seguridad

### 🔴 CRÍTICO (debe arreglarse AHORA)

- Lista issues críticos con solución

**Ejemplo:**

```
❌ API key hardcodeada en lib/api.ts línea 15
Solución: Mover a variable de entorno
```

### 🟡 ADVERTENCIA (debería revisarse)

- Lista warnings con recomendaciones

**Ejemplo:**

```
⚠️ CORS permite todos los orígenes (*)
Recomendación: Restringir a dominio Vercel específico
```

### 🟢 OK (sin problemas)

- Lista aspectos correctos de seguridad

### 📋 Checklist Final

```
Seguridad de Código:
[ ] Sin secrets hardcodeados
[ ] Sin console.log con datos sensibles
[ ] Sin comentarios peligrosos

Headers de Seguridad:
[ ] X-Frame-Options ✓
[ ] X-Content-Type-Options ✓
[ ] Referrer-Policy ✓
[ ] HSTS ✓

Dependencies:
[ ] Sin vulnerabilidades críticas
[ ] Packages actualizados
[ ] npm audit clean

WordPress API:
[ ] Solo lectura
[ ] CORS configurado
[ ] Rate limiting considerado

Environment:
[ ] .env.local en .gitignore
[ ] Variables documentadas
[ ] Sin commits con secrets
```

### 🎯 Plan de Acción

Si hay issues críticos:

1. [Acción específica con código]
2. [Acción específica con código]

### ✅ Aprobación para Deploy

```
SECURITY STATUS: [✅ APPROVED / ⚠️ APPROVED WITH WARNINGS / ❌ BLOCKED]

Justificación:
[Explicación del estado]
```
