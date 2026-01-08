import { PostListItem } from "@/types/wordpress";
import Link from "next/link";

export const BlogSection = ({ posts }: { posts: PostListItem[] }) => {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            <span className="">Des del nostre Blog</span>
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Mantén-te al dia amb les últimes notícies i esdeveniments de la
            nostra cooperativa.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <div className="w-full overflow-hidden rounded-lg bg-gray-200 h-48">
                {post.featuredImage && (
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                )}
              </div>

              <div className="flex items-center gap-x-4 text-xs mt-4">
                <time dateTime={post.datetime} className="text-gray-500">
                  {post.date}
                </time>
              </div>

              <Link href={`/blog/${post.slug}`} className="block">
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    <span dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 transition-colors"
          >
            Veure totes les entrades <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
