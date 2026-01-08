export type WP_Post = {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
      title: {
        rendered: string;
      };
    }>;
  };
};

export type PostListItem = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  datetime: string;
  slug: string;
  featuredImage: string | null;
};

export type PostDetail = {
  id: number;
  slug: string;
  date: string;
  title: string;
  content: string;
  excerpt: string;
  featuredImage: string | null;
  featuredAlt: string | null;
};


export type ProviderShape = {
  id: number;
  slug: string;
  title: string;
  content: string;
 
  featuredImage: string | null;
  featuredAlt?: string | null;
  acf?: {
    tipus?: string;
    ubicacio?: string;
    web?: string;
    email?: string;
    telefon?: string;
    descripcion?: string;
    excerpt?: string;
  
  };
};