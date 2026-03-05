import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostSlugs } from "@/lib/wp";
import Image from "next/image";
import { StructuredData } from "@/components/StructuredData";

type Props = {
  params: Promise<{ slug: string }>;
};

// Generar páginas estáticas
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Metadata dinámica para SEO
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post no trobat",
    };
  }

  const description = post.excerpt.replace(/<[^>]*>/g, "").trim().substring(0, 160);

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: ["La Igualitària"],
      ...(post.featuredImage && {
        images: [{ url: post.featuredImage, width: 1200, height: 630, alt: post.featuredAlt ?? post.title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      ...(post.featuredImage && { images: [post.featuredImage] }),
    },
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt.replace(/<[^>]*>/g, "").trim().substring(0, 160),
    ...(post.featuredImage && { image: post.featuredImage }),
    datePublished: post.date,
    author: { "@type": "Organization", name: "La Igualitària" },
    publisher: {
      "@type": "Organization",
      name: "La Igualitària",
      logo: { "@type": "ImageObject", url: "https://laigualitaria.coop/logoCircle.webp" },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://laigualitaria.coop/blog/${post.slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inici", item: "https://laigualitaria.coop" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://laigualitaria.coop/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://laigualitaria.coop/blog/${post.slug}` },
    ],
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <StructuredData data={articleSchema} />
      <StructuredData data={breadcrumbSchema} />
      <Link
        href="/blog"
        className="text-sm text-primary mb-4 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
      >
        <span aria-hidden="true">← </span>Tornar al blog
      </Link>

      <article>
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <time className="text-sm text-gray-500 block mt-2">
          {new Date(post.date).toLocaleDateString("ca-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>

        {post.featuredImage && (
          <Image
            src={post.featuredImage}
            alt={post.featuredAlt ?? post.title}
            width={1200}
            height={384}
            className="mt-6 w-full max-h-96 object-cover rounded"
          />
        )}

        <div
          className="prose prose-lg mt-6 max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}
