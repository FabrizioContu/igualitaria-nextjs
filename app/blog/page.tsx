import Link from "next/link";
import { getLatestPost } from "@/lib/wp";

export const metadata = {
  title: "Blog - La Igualitària",
  description: "Totes les notícies i entrades de la cooperativa",
};

export default async function Blog() {
  const posts = await getLatestPost({ perPage: 100 });

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Blog
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Totes les notícies i entrades de la cooperativa.
        </p>
      </header>

      <section className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="h-48 w-full overflow-hidden bg-gray-100">
                {post.featuredImage && (
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                )}
              </div>
            </Link>

            <div className="p-4 flex-1 flex flex-col">
              <time className="text-xs text-gray-500">{post.date}</time>

              <h2 className="mt-2 text-lg font-semibold text-gray-900">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>

              <p className="mt-3 text-sm text-gray-600 line-clamp-3">
                <span dangerouslySetInnerHTML={{ __html: post.excerpt }} />
              </p>

              <div className="mt-6">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Llegir més →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
