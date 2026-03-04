import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Cache de componentes habilitado
  cacheComponents: true,

  // Tree-shaking per llibreries amb moltes icones/components
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // Configuración de imágenes - CRÍTICO para WordPress
  images: {
    remotePatterns: [
      // WordPress producción CON www
      {
        protocol: 'https',
        hostname: 'www.laigualitaria.coop',
      },
      // WordPress producción SIN www (por si acaso)
      {
        protocol: 'https',
        hostname: 'laigualitaria.coop',
      },
      // WordPress en subdominio wp
      {
        protocol: 'https',
        hostname: 'wp.laigualitaria.coop',
      },
    ],
    // Formatos optimizados
    formats: ['image/avif', 'image/webp'],
  },

  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;