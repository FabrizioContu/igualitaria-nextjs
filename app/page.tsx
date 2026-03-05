import { getLatestPost, getPageBySlug } from "@/lib/wp";
import { StructuredData } from "@/components/StructuredData";
import Participa from "@/components/Participa";
import Comptador from "@/components/Comptador";
import { HeroSection } from "@/components/HeroSection";
import { BlogSection } from "@/components/BlogSection";

export const metadata = {
  title: "Inici | La Igualitària",
  description:
    "Benvinguts a La Igualitària, economat cooperatiu autogestionat del Poble-sec. Productes locals, ecològics i de temporada.",
  openGraph: {
    title: "La Igualitària - Economat Cooperatiu del Poble-sec",
    description:
      "Benvinguts a La Igualitària, economat cooperatiu autogestionat del Poble-sec.",
    url: "/",
  },
  alternates: { canonical: "/" },
};

export default async function Home() {
  // Fetch en paralelo
  const [posts, [title, content]] = await Promise.all([
    getLatestPost({ perPage: 3 }),
    getPageBySlug("la-igualitaria"),
  ]);

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "La Igualitària",
    url: "https://laigualitaria.coop",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://laigualitaria.coop/blog?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "La Igualitària",
    description:
      "Economat cooperatiu autogestionat al barri del Poble-sec de Barcelona. Productes locals, ecològics i de temporitat.",
    url: "https://laigualitaria.coop",
    logo: "https://laigualitaria.coop/logoCircle.webp",
    image: "https://laigualitaria.coop/Panoramica.webp",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Carrer Vallhonrat, 18",
      addressLocality: "Barcelona",
      addressRegion: "Catalunya",
      postalCode: "08004",
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "41.3737",
      longitude: "2.1664",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "laigualitaria@cooperasec.org",
      telephone: "+34931947646",
      contactType: "customer service",
      availableLanguage: "Catalan",
    },
    sameAs: [
      "https://www.instagram.com/laigualitaria_economatcoop",
      "https://t.me/laigualitaria",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "20:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "14:00",
      },
    ],
  };

  return (
    <>
      <StructuredData data={websiteSchema} />
      <StructuredData data={organizationSchema} />
      <HeroSection title={title} content={content} />
      <Comptador />
      <Participa />
      <BlogSection posts={posts} />
    </>
  );
}
