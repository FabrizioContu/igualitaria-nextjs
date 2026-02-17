import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  mockWpPost,
  mockWpPostNoImage,
  mockWpPage,
  mockWpProvider,
  mockWpProviderNoImage,
} from '../mocks/wordpress';

// Helper to set up fetch mock response
function mockFetchResponse(data: unknown) {
  (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
    ok: true,
    json: async () => data,
  });
}

function mockFetchError(status: number) {
  (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
    ok: false,
    status,
  });
}

// Dynamic import to ensure env vars and fetch mock are set up first
async function importWp() {
  return await import('@/lib/wp');
}

describe('lib/wp', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.resetModules();
  });

  // ── getPageBySlug ──────────────────────────────────────────

  describe('getPageBySlug', () => {
    it('returns [title, content] for a valid page', async () => {
      mockFetchResponse([mockWpPage]);
      const { getPageBySlug } = await importWp();
      const result = await getPageBySlug('about');
      expect(result).toEqual(['About Page', '<p>About content</p>']);
    });

    it('throws when page is not found', async () => {
      mockFetchResponse([]);
      const { getPageBySlug } = await importWp();
      await expect(getPageBySlug('nonexistent')).rejects.toThrow('not found');
    });

    it('throws on fetch error', async () => {
      mockFetchError(500);
      const { getPageBySlug } = await importWp();
      await expect(getPageBySlug('about')).rejects.toThrow('500');
    });
  });

  // ── getLatestPost ──────────────────────────────────────────

  describe('getLatestPost', () => {
    it('returns mapped PostListItem array', async () => {
      mockFetchResponse([mockWpPost]);
      const { getLatestPost } = await importWp();
      const posts = await getLatestPost({ perPage: 1 });

      expect(posts).toHaveLength(1);
      expect(posts[0]).toMatchObject({
        id: 1,
        title: 'Test Post Title',
        slug: 'test-post',
        featuredImage: 'https://example.com/image.jpg',
      });
      // The date string is parsed as local time, so just verify it's a valid ISO string
      expect(posts[0].datetime).toBe(new Date('2025-01-15T10:00:00').toISOString());
    });

    it('returns null featuredImage when no media embedded', async () => {
      mockFetchResponse([mockWpPostNoImage]);
      const { getLatestPost } = await importWp();
      const posts = await getLatestPost({});

      expect(posts[0].featuredImage).toBeNull();
    });
  });

  // ── getPostBySlug ──────────────────────────────────────────

  describe('getPostBySlug', () => {
    it('returns PostDetail for a valid slug', async () => {
      mockFetchResponse([mockWpPost]);
      const { getPostBySlug } = await importWp();
      const post = await getPostBySlug('test-post');

      expect(post).toMatchObject({
        id: 1,
        slug: 'test-post',
        title: 'Test Post Title',
        content: '<p>Test content</p>',
        featuredImage: 'https://example.com/image.jpg',
        featuredAlt: 'Alt text',
      });
    });

    it('returns null when post not found', async () => {
      mockFetchResponse([]);
      const { getPostBySlug } = await importWp();
      const post = await getPostBySlug('nonexistent');
      expect(post).toBeNull();
    });

    it('handles post without featured media', async () => {
      mockFetchResponse([mockWpPostNoImage]);
      const { getPostBySlug } = await importWp();
      const post = await getPostBySlug('no-image-post');

      expect(post?.featuredImage).toBeNull();
      expect(post?.featuredAlt).toBeNull();
    });
  });

  // ── getAllPostSlugs ────────────────────────────────────────

  describe('getAllPostSlugs', () => {
    it('returns array of slug strings', async () => {
      mockFetchResponse([{ slug: 'post-1' }, { slug: 'post-2' }]);
      const { getAllPostSlugs } = await importWp();
      const slugs = await getAllPostSlugs();
      expect(slugs).toEqual(['post-1', 'post-2']);
    });

    it('returns empty array when no posts', async () => {
      mockFetchResponse([]);
      const { getAllPostSlugs } = await importWp();
      const slugs = await getAllPostSlugs();
      expect(slugs).toEqual([]);
    });
  });

  // ── getProviders ───────────────────────────────────────────

  describe('getProviders', () => {
    it('returns normalized providers', async () => {
      mockFetchResponse([mockWpProvider, mockWpProviderNoImage]);
      const { getProviders } = await importWp();
      const providers = await getProviders();

      expect(providers).toHaveLength(2);
      expect(providers[0]).toMatchObject({
        id: 100,
        slug: 'provider-test',
        title: 'Test Provider',
        featuredImage: 'https://example.com/provider.jpg',
        featuredAlt: 'Provider image',
        acf: { tipus: 'Alimentació' },
      });
      expect(providers[1].featuredImage).toBeNull();
    });
  });

  // ── getProviderBySlug ──────────────────────────────────────

  describe('getProviderBySlug', () => {
    it('returns normalized provider for valid slug', async () => {
      mockFetchResponse([mockWpProvider]);
      const { getProviderBySlug } = await importWp();
      const provider = await getProviderBySlug('provider-test');

      expect(provider).toMatchObject({
        id: 100,
        slug: 'provider-test',
        title: 'Test Provider',
      });
    });

    it('returns null when provider not found', async () => {
      mockFetchResponse([]);
      const { getProviderBySlug } = await importWp();
      const provider = await getProviderBySlug('nonexistent');
      expect(provider).toBeNull();
    });
  });

  // ── getAllProviderSlugs ─────────────────────────────────────

  describe('getAllProviderSlugs', () => {
    it('returns array of provider slug strings', async () => {
      mockFetchResponse([{ slug: 'prov-1' }, { slug: 'prov-2' }]);
      const { getAllProviderSlugs } = await importWp();
      const slugs = await getAllProviderSlugs();
      expect(slugs).toEqual(['prov-1', 'prov-2']);
    });
  });
});
