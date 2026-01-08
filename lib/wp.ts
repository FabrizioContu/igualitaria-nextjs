
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PostListItem, PostDetail } from '@/types/wordpress';

const domain = process.env.NEXT_PUBLIC_WP_DOMAIN ?? '';
if (!domain) throw new Error('NEXT_PUBLIC_WP_DOMAIN no definida en .env.local');
const API_URL = `${domain.replace(/\/$/, '')}/wp-json/wp/v2`;

// Helper fetch con caché de Next.js
async function fetchJSON(url: string, options?: RequestInit) {
  const res = await fetch(url, {
    next: { revalidate: 60 },
    ...options,
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
export const getPageBySlug = async (slug: string): Promise<[string, string]> => {

  
  const data = await fetchJSON(`${API_URL}/pages?slug=${slug}&_embed`);
  const page = data[0];
  if (!page) throw new Error(`Page ${slug} not found`);
  
  const {
    title: { rendered: title },
    content: { rendered: content },
  } = page;
  return [title, content];
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

export const getPostBySlug = async (slug: string): Promise<PostDetail | null> => {
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
};

// Helper para generateStaticParams
export const getAllPostSlugs = async (): Promise<string[]> => {
  const posts = await fetchJSON(`${API_URL}/posts?per_page=100&_fields=slug`);
  return posts.map((post: any) => post.slug);
};


// Providers
function normalizeProvider(p: any): any {
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

export const getProviders = async (perPage = 100): Promise<any[]> => {
  const url = `${API_URL}/proveedores?per_page=${perPage}&_embed`;
  const results = await fetchJSON(url);
  return (results as any[]).map(normalizeProvider);
};

export const getProviderBySlug = async (slug: string): Promise<any | null> => {
  const url = `${API_URL}/proveedores?slug=${encodeURIComponent(slug)}&_embed`;
  const results = await fetchJSON(url);
  const p = results[0];
  if (!p) return null;
  return normalizeProvider(p);
};

export const getAllProviderSlugs = async (): Promise<string[]> => {
  const providers = await fetchJSON(
    `${API_URL}/proveedores?per_page=100&_fields=slug`
  );
  return providers.map((provider: any) => provider.slug);
};