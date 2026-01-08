# Quick Pre-Deploy Check

Verificación rápida (1-2 minutos) antes de deploy.

## ⚡ Checklist Rápido

### 1. Código Limpio (30 seg)

```bash
# Buscar console.log
grep -r "console.log" app/ components/ lib/ --exclude-dir=node_modules | wc -l
```

- [ ] ❌ 0 console.log encontrados
- [ ] ❌ 0 debugger encontrados
- [ ] ❌ 0 // TODO críticos

### 2. Build Local (30 seg)

```bash
npm run build
```

- [ ] ✅ Build completa SIN ERRORES
- [ ] ⚠️ Warnings aceptables (<5)
- [ ] 📦 Bundle <200KB

### 3. TypeScript (10 seg)

```bash
npx tsc --noEmit
```

- [ ] ✅ 0 errores TypeScript

### 4. WordPress (10 seg)

```bash
curl -I https://laigualitaria.coop/wp-json
```

- [ ] ✅ Status 200 OK

### 5. Variables (.env.local) (10 seg)

- [ ] ✅ NEXT_PUBLIC_WORDPRESS_API_URL presente
- [ ] ❌ No hay secrets hardcodeados en código

## Resultado

```
[✅ GO / ❌ NO GO]

Razón:
[Explicación breve]
```

### Si GO ✅

→ Procede con `/vercel-deploy`

### Si NO GO ❌

Issues a resolver:

1. [Issue específico]
2. [Issue específico]

---

**Quick check en <2 min. Para check completo usa `/pre-deploy`**
