# WordPress Integration Check

Verifica la integración completa entre WordPress y Next.js.

**IMPORTANTE:** Consulta `../project-context.md` para arquitectura.

## 1. Conectividad Básica

### Endpoint Principal

```bash
curl https://laigualitaria.coop/wp-json
```

- [ ] WordPress REST API accesible
- [ ] Responde con JSON válido
- [ ] Versión de WordPress detectada

### Custom Endpoints

Verifica cada endpoint usado:

```bash
curl https://laigualitaria.coop/wp-json/wp/v2/posts
curl https://laigualitaria.coop/wp-json/wp/v2/pages
curl https://laigualitaria.coop/wp-json/wp/v2/proveedores
```

- [ ] Posts endpoint funciona
- [ ] Pages endpoint funciona
- [ ] Custom post type 'proveedores' funciona

## 2. Análisis de lib/wp.ts

Revisa cada función en `lib/wp.ts`:

### getPageBySlug()

- [ ] Usa 'use cache' correctamente
- [ ] Maneja slugs inválidos
- [ ] Error handling implementado
- [ ] Retorna tipos correctos

### getLatestPost()

- [ ] Filtra posts correctamente
- [ ] Formatea datos apropiadamente
- [ ] Incluye featured images
- [ ] Cache configurado

### getPostBySlug()

- [ ] Embedded data incluido
- [ ] Maneja posts no encontrados
- [ ] Formatea HTML correctamente

### getProviders() / getProviderBySlug()

- [ ] ACF fields correctamente mapeados
- [ ] Campos opcionales manejados (?, undefined)
- [ ] Tipos TypeScript correctos

## 3. Campos ACF (Advanced Custom Fields)

Según `../project-context.md`, proveedores tienen:

```typescript
acf: {
  tipus?: string;
  ubicacio?: string;
  web?: string;
  email?: string;
  telefon?: string;
  descripcion?: string;
  excerpt?: string;
}
```

Verifica:

- [ ] Todos los campos están en types/wordpress.ts
- [ ] Manejo de campos vacíos/null
- [ ] Validación en frontend si es necesario

## 4. Error Handling

Revisa manejo de errores en cada función:

- [ ] Try/catch implementados
- [ ] Mensajes de error informativos
- [ ] Fallbacks cuando API falla
- [ ] No expone información sensible

## 5. Performance y Cache

### Cache Strategy

- [ ] 'use cache' usado en todas las funciones fetch
- [ ] Revalidate time apropiado (si configurado)
- [ ] No hay fetches redundantes

### Response Times

Mide tiempos de respuesta:

```bash
time curl https://laigualitaria.coop/wp-json/wp/v2/posts
```

- [ ] Respuestas <500ms (ideal)
- [ ] Si >500ms, sugiere optimización

## 6. CORS Configuration

- [ ] Verifica headers CORS en respuestas
- [ ] Dominio Vercel permitido en WordPress
- [ ] localhost permitido para desarrollo

Headers esperados:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
```

## 7. Datos de Prueba

Verifica que existan datos de prueba:

- [ ] Al menos 3 posts publicados
- [ ] Al menos 3 proveedores publicados
- [ ] Posts con featured images
- [ ] Proveedores con datos ACF completos

## 8. URLs e Imágenes

- [ ] URLs de imágenes accesibles
- [ ] Dominio en next.config.ts images.domains
- [ ] Imágenes tienen alt text
- [ ] URLs absolutas, no relativas

## 9. Revalidación (ISR)

Si está implementado:

- [ ] Webhook de WordPress a Vercel configurado
- [ ] API route `/api/revalidate` existe
- [ ] Secret configurado correctamente
- [ ] Prueba de revalidación funciona

## 10. Modo Desarrollo vs Producción

Verifica configuración para ambos:

**Desarrollo:**

```env
NEXT_PUBLIC_WORDPRESS_API_URL=http://laigualitaria.local/wp-json
```

**Producción:**

```env
NEXT_PUBLIC_WORDPRESS_API_URL=https://laigualitaria.coop/wp-json
```

- [ ] Variables correctas en cada entorno
- [ ] URLs sin trailing slashes
- [ ] HTTPS en producción

## Reporte de Integración

### ✅ Conectividad

```
Endpoint Principal: [OK/FAIL]
Posts: [OK/FAIL] - X posts disponibles
Pages: [OK/FAIL] - X pages disponibles
Proveedores: [OK/FAIL] - X proveedores disponibles
```

### 📊 Performance

```
Average Response Time: XXX ms
Cache Hit Rate: XX% (si medible)
Largest Response: XXX KB
```

### 🔧 Funciones lib/wp.ts

```
getPageBySlug: [✅ OK / ⚠️ Warning / ❌ Error]
getLatestPost: [status]
getPostBySlug: [status]
getProviders: [status]
getProviderBySlug: [status]
```

### ⚠️ Issues Encontrados

- Lista problemas detectados con severidad

### 🎯 Recomendaciones

1. [Recomendación específica]
2. [Recomendación específica]

### 🔐 Configuración WordPress Necesaria

**En WordPress (laigualitaria.coop):**

```php
// CORS para Vercel
add_action('rest_api_init', function() {
    header('Access-Control-Allow-Origin: https://tu-app.vercel.app');
});

// Habilitar pretty permalinks
// Activar plugins necesarios: ACF, etc.
```

**En Vercel (Variables de Entorno):**

```env
NEXT_PUBLIC_WORDPRESS_API_URL=https://laigualitaria.coop/wp-json
```
