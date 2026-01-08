import Link from "next/link";
import { notFound } from "next/navigation";
import { getProviderBySlug, getAllProviderSlugs } from "@/lib/wp";

type Props = {
  params: Promise<{ slug: string }>;
};

// Generar páginas estáticas
export async function generateStaticParams() {
  const slugs = await getAllProviderSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Metadata dinámica
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const provider = await getProviderBySlug(slug);

  if (!provider) {
    return { title: "Proveïdor no trobat" };
  }

  return {
    title: `${provider.title} - La Igualitària`,
    description: provider.excerpt.replace(/<[^>]*>/g, "").substring(0, 160),
  };
}

export default async function Proveidor({ params }: Props) {
  const { slug } = await params;
  const provider = await getProviderBySlug(slug);

  if (!provider) {
    notFound();
  }

  const ubicacion = provider?.acf?.ubicacion ?? "";
  const web = provider?.acf?.web ?? "";
  const email = provider?.acf?.email ?? "";
  const telefono = provider?.acf?.telefono ?? "";
  const descripcion = provider?.acf?.descripcion ?? provider.content;

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <Link
        href="/proveidors"
        className="text-sm text-primary mb-4 inline-block"
      >
        ← Tornar als proveïdors
      </Link>

      <article>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {provider.title}
        </h1>

        {/* Badges de info */}
        <div className="flex flex-wrap gap-2 mb-6">
          {ubicacion && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
              📍 {ubicacion}
            </span>
          )}
          {web && (
            <a
              href={web}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 hover:bg-green-200"
            >
              🌐 Web
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
            >
              📧 {email}
            </a>
          )}
          {telefono && (
            <a
              href={`tel:${telefono}`}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200"
            >
              📞 {telefono}
            </a>
          )}
        </div>

        {/* Imagen destacada */}
        {provider.featuredImage && (
          <img
            src={provider.featuredImage}
            alt={provider.featuredAlt ?? provider.title}
            className="mt-6 w-full max-h-96 object-cover rounded-lg shadow-lg"
          />
        )}

        {/* Contenido */}
        <div
          className="prose prose-lg mt-8 max-w-none"
          dangerouslySetInnerHTML={{ __html: descripcion }}
        />
      </article>
    </main>
  );
}
