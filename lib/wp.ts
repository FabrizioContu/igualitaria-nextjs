'use cache'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cache } from 'react';
import type { PostListItem, PostDetail, ProviderShape, EventShape, GalleryImage } from '@/types/wordpress';

const domain = process.env.NEXT_PUBLIC_WP_DOMAIN ?? '';
if (!domain) throw new Error('NEXT_PUBLIC_WP_DOMAIN no definida en .env.local');
const API_URL = `${domain.replace(/\/$/, '')}/wp-json/wp/v2`;

// Helper fetch con caché de Next.js
async function fetchJSON(url: string, options?: RequestInit & { tags?: string[] }) {
  const { tags, ...rest } = options ?? {};
  const res = await fetch(url, {
    next: { revalidate: 3600, tags },
    ...rest,
  });
  if (!res.ok) throw new Error(`Error fetching ${url}: ${res.status}`);
  return res.json();
}

function extractFeaturedImage(post: any): string | null {
  const embedded = post?._embedded;
  const media = embedded?.['wp:featuredmedia']?.[0];
  return media?.source_url ?? post?.featured_image_url ?? null;
}

// Pages
export const getPageBySlug = async (slug: string): Promise<[string, string, Record<string, unknown>]> => {
  const data = await fetchJSON(`${API_URL}/pages?slug=${slug}&_embed`);
  const page = data[0];
  if (!page) throw new Error(`Page ${slug} not found`);

  const {
    title: { rendered: title },
    content: { rendered: content },
    acf = {},
  } = page;
  return [title, content, acf];
};

// Posts
export const getLatestPost = async ({ 
  
  perPage = 10 
}: { 
  perPage?: number 
}): Promise<PostListItem[]> => {

  
  const results = await fetchJSON(`${API_URL}/posts?per_page=${perPage}&_embed`);
  

  return results.map((post: any) => {
    const {
      id,
      title: { rendered: title },
      excerpt: { rendered: excerpt },
      date,
      slug,
    } = post;
    const featuredImage = extractFeaturedImage(post);
    return {
      id,
      title,
      excerpt,
      date: new Date(date).toLocaleDateString('ca-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      datetime: new Date(date).toISOString(),
      slug,
      featuredImage,
    };
  });
};

export const getPostBySlug = cache(async (slug: string): Promise<PostDetail | null> => {
  const results = await fetchJSON(
    `${API_URL}/posts?slug=${encodeURIComponent(slug)}&_embed`
  );
  const post = results[0];
  if (!post) return null;

  const media = post?._embedded?.['wp:featuredmedia']?.[0] ?? null;
  const featuredImage = media?.source_url ?? null;
  const featuredAlt = media?.alt_text ?? media?.title?.rendered ?? null;

  return {
    id: post.id,
    slug: post.slug,
    date: post.date,
    title: post.title.rendered,
    content: post.content.rendered,
    excerpt: post.excerpt?.rendered ?? '',
    featuredImage,
    featuredAlt,
  };
});

// Helper para generateStaticParams
export const getAllPostSlugs = async (): Promise<string[]> => {
  const posts = await fetchJSON(`${API_URL}/posts?per_page=100&_fields=slug`);
  return posts.map((post: any) => post.slug);
};


// Providers
function normalizeProvider(p: any): ProviderShape {
  const embedded = p?._embedded;
  const media = embedded?.['wp:featuredmedia']?.[0];
  const featuredImage = media?.source_url ?? null;
  const featuredAlt = media?.alt_text ?? media?.title?.rendered ?? null;

  return {
    id: p.id,
    slug: p.slug,
    title: p.title?.rendered ?? '',
    content: p.content?.rendered ?? '',
    excerpt: p.excerpt?.rendered ?? '',
    featuredImage,
    featuredAlt,
    acf: p.acf ?? {},
  };
}

export const getProviders = async (perPage = 100): Promise<ProviderShape[]> => {
  const url = `${API_URL}/proveedores?per_page=${perPage}&_embed`;
  const results = await fetchJSON(url);
  return (results as any[]).map(normalizeProvider);
};

export const getProviderBySlug = cache(async (slug: string): Promise<ProviderShape | null> => {
  const url = `${API_URL}/proveedores?slug=${encodeURIComponent(slug)}&_embed`;
  const results = await fetchJSON(url);
  const p = results[0];
  if (!p) return null;
  return normalizeProvider(p);
});

export const getAllProviderSlugs = async (): Promise<string[]> => {
  const providers = await fetchJSON(
    `${API_URL}/proveedores?per_page=100&_fields=slug`
  );
  return providers.map((provider: any) => provider.slug);
};


// Events
function normalizeEvent(e: any): EventShape {
  return {
    id: e.id,
    slug: e.slug,
    title: e.title?.rendered ?? '',
    acf: e.acf ?? {},
  };
}

export const getEvents = async (perPage = 100): Promise<EventShape[]> => {
  const url = `${API_URL}/eventos?per_page=${perPage}&_embed`;
  const results = await fetchJSON(url, { tags: ['eventos'] });
  const events = (results as any[]).map(normalizeEvent);

  const parseAcfDate = (raw: string) => {
    const normalized = raw.includes('-')
      ? raw
      : `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;
    return new Date(normalized + 'T00:00:00').getTime();
  };

  const now = Date.now();
  return events.sort((a, b) => {
    const dateA = a.acf.fecha_evento ? parseAcfDate(a.acf.fecha_evento) : Infinity;
    const dateB = b.acf.fecha_evento ? parseAcfDate(b.acf.fecha_evento) : Infinity;
    return Math.abs(dateA - now) - Math.abs(dateB - now);
  });
};

export const getEventBySlug = async (slug: string): Promise<EventShape | null> => {
  const url = `${API_URL}/eventos?slug=${encodeURIComponent(slug)}`;
  const results = await fetchJSON(url, { tags: ['eventos'] });
  const e = results[0];
  if (!e) return null;
  return normalizeEvent(e);
};

export const getAllEventSlugs = async (): Promise<string[]> => {
  const events = await fetchJSON(
    `${API_URL}/eventos?per_page=100&_fields=slug`
  );
  return events.map((e: any) => e.slug);
};


// Comunitat gallery (5 ACF Image fields on the "comunitat" page)
export const getComunitatGallery = cache(async (): Promise<GalleryImage[]> => {
  const data = await fetchJSON(`${API_URL}/pages?slug=comunitat`);
  const page = data[0];
  if (!page) return [];

  const acf = page.acf ?? {};
  const ids: number[] = [];

  for (let i = 1; i <= 5; i++) {
    const val = acf[`galeria_${i}`];
    if (!val) continue;
    // ACF REST API may return full object or just the ID
    if (typeof val === 'object' && val.url) {
      // Already a full image object
      ids.push(val.ID ?? val.id);
    } else if (typeof val === 'number') {
      ids.push(val);
    }
  }

  if (ids.length === 0) return [];

  // Fetch media objects in parallel
  const mediaResults = await Promise.all(
    ids.map((id) =>
      fetchJSON(`${API_URL}/media/${id}`).catch(() => null)
    )
  );

  return mediaResults
    .filter(Boolean)
    .map((media: any) => ({
      id: media.id,
      url: media.source_url,
      alt: media.alt_text ?? media.title?.rendered ?? '',
      width: media.media_details?.width ?? 1200,
      height: media.media_details?.height ?? 800,
    }))
    .filter((img) => img.url);
});