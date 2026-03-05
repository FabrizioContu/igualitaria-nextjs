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


export type EventShape = {
  id: number;
  slug: string;
  title: string;
  acf: {
    fecha_evento?: string;
    hora_inicio?: string;
    hora_fin?: string;
    ubicacion_evento?: string;
    descripcion_corta?: string;
  };
};

export type GalleryImage = {
  id: number;
  url: string;
  alt: string;
  width: number;
  height: number;
};

export type ProviderShape = {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  featuredImage: string | null;
  featuredAlt?: string | null;
  acf?: {
    tipus?: string;
    ubicacion?: string;
    web?: string;
    email?: string;
    telefono?: string;
    descripcion?: string;
    excerpt?: string;
    latitud?: string;
    longitud?: string;
  };
};