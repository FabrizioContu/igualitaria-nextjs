# La Igualitaria - Claude Code Config

## 📚 Documentación Principal

- **Contexto:** Ver `project-context.md`
- **Guidelines:** Ver `coding-guidelines.md`
- **Initial Setup:** Ver `initial-prompt.md`
- **Testing:** Ver `testing-agent.md`
- **Uso:** Ver `README.md`

## 🚀 Quick Start

```bash
# Primera vez
claude "Lee todos los archivos en .claude/ para contexto"

# Workflow normal
claude /pre-deploy          # Antes de deploy
claude /build-check         # Verificar build
claude /vercel-deploy       # Deploy a Vercel
claude /post-deploy-test    # Testing post-deploy
```

## 🎯 Stack

- Next.js 16 + TypeScript + Tailwind 4
- WordPress Headless (laigualitaria.coop)
- Deploy: Vercel

## 📋 Comandos Personalizados

Ver carpeta `commands/` para todos los comandos disponibles.

## 🔐 Variables de Entorno (Vercel)

```env
NEXT_PUBLIC_WORDPRESS_API_URL=https://laigualitaria.coop/wp-json
NEXT_PUBLIC_SITE_URL=https://tu-app.vercel.app
REVALIDATE_SECRET=tu_secret
```

## 💡 Filosofía

- Server Components por defecto
- TypeScript strict
- Performance first
- Coherencia con el código existente
