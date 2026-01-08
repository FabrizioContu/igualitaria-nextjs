import { getLatestPost, getPageBySlug } from "@/lib/wp";

import Participa from "@/components/Participa";
import Comptador from "@/components/Comptador";
import { HeroSection } from "@/components/HeroSection";
import { BlogSection } from "@/components/BlogSection";

export const metadata = {
  title: "La Igualitària",
  description: "Economat cooperatiu del Poble-sec, Barcelona",
};

export default async function Home() {
  // Fetch en paralelo
  const [posts, [title, content]] = await Promise.all([
    getLatestPost({ perPage: 3 }),
    getPageBySlug("la-igualitaria"),
  ]);

  return (
    <>
      <div>
        <HeroSection title={title} content={content} />
      </div>

      <section>
        <Comptador />
      </section>

      <section>
        <Participa />
      </section>
      <section>
        <BlogSection posts={posts} />
      </section>
    </>
  );
}
