export const mockWpPost = {
  id: 1,
  slug: 'test-post',
  date: '2025-01-15T10:00:00',
  title: { rendered: 'Test Post Title' },
  excerpt: { rendered: '<p>Test excerpt</p>' },
  content: { rendered: '<p>Test content</p>' },
  _embedded: {
    'wp:featuredmedia': [
      {
        source_url: 'https://example.com/image.jpg',
        alt_text: 'Alt text',
        title: { rendered: 'Image Title' },
      },
    ],
  },
};

export const mockWpPostNoImage = {
  id: 2,
  slug: 'no-image-post',
  date: '2025-02-01T12:00:00',
  title: { rendered: 'No Image Post' },
  excerpt: { rendered: '<p>No image</p>' },
  content: { rendered: '<p>Content without image</p>' },
};

export const mockWpPage = {
  id: 10,
  slug: 'about',
  title: { rendered: 'About Page' },
  content: { rendered: '<p>About content</p>' },
};

export const mockWpProvider = {
  id: 100,
  slug: 'provider-test',
  title: { rendered: 'Test Provider' },
  content: { rendered: '<p>Provider content</p>' },
  excerpt: { rendered: '<p>Provider excerpt</p>' },
  acf: {
    tipus: 'Alimentació',
    ubicacion: 'Barcelona',
    web: 'https://example.com',
    email: 'test@example.com',
    telefon: '123456789',
  },
  _embedded: {
    'wp:featuredmedia': [
      {
        source_url: 'https://example.com/provider.jpg',
        alt_text: 'Provider image',
        title: { rendered: 'Provider Image' },
      },
    ],
  },
};

export const mockWpProviderNoImage = {
  id: 101,
  slug: 'provider-no-img',
  title: { rendered: 'Provider No Image' },
  content: { rendered: '<p>Content</p>' },
  excerpt: { rendered: '' },
  acf: {},
};
