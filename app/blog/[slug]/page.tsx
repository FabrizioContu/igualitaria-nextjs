import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostSlugs } from "@/lib/wp";

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

  return {
    title: `${post.title} - La Igualitària`,
    description: post.excerpt.replace(/<[^>]*>/g, "").substring(0, 160),
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <Link href="/blog" className="text-sm text-primary mb-4 inline-block">
        ← Tornar al blog
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
          <img
            src={post.featuredImage}
            alt={post.featuredAlt ?? post.title}
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
