import Link from "next/link";
import { getLatestPost } from "@/lib/wp";
import Image from "next/image";

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
            className="relative flex flex-col bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div
              className="relative h-48 w-full overflow-hidden bg-gray-100"
              aria-hidden="true"
            >
              {post.featuredImage && (
                <Image
                  src={post.featuredImage}
                  alt=""
                  fill
                  className="object-cover transition-transform hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              )}
            </div>

            <div className="p-4 flex-1 flex flex-col">
              <time dateTime={post.datetime} className="text-xs text-gray-500">
                {post.date}
              </time>

              <h2 className="mt-2 text-lg font-semibold text-gray-900">
                <Link
                  href={`/blog/${post.slug}`}
                  className="after:absolute after:inset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
                >
                  {post.title}
                </Link>
              </h2>

              <p className="mt-3 text-sm text-gray-600 line-clamp-3">
                <span dangerouslySetInnerHTML={{ __html: post.excerpt }} />
              </p>

              <div className="mt-6" aria-hidden="true">
                <span className="text-sm font-medium text-primary">
                  Llegir més <span>→</span>
                </span>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
