import Link from "next/link";
import { getPageBySlug } from "@/lib/wp";
import Image from "next/image";

export const metadata = {
  title: "Qui Som",
  description:
    "Coneix La Igualitària: una cooperativa de consum autogestionada nascuda al Poble-sec per transformar el model de consum cap a un de més just i ecològic.",
  openGraph: {
    title: "Qui Som | La Igualitària",
    description:
      "Cooperativa de consum autogestionada del Poble-sec, Barcelona.",
    url: "/qui-som",
  },
  alternates: { canonical: "/qui-som" },
};

export default async function QuiSom() {
  const [title, content] = await getPageBySlug("qui-som");

  const values = [
    {
      title: "Cooperació",
      description:
        "Treballem conjuntament per assolir objectius comuns, posant el bé col·lectiu per sobre de l'individual.",
    },
    {
      title: "Sostenibilitat",
      description:
        "Apostem per un model de consum respectuós amb el medi ambient i que garanteix la viabilitat del projecte a llarg termini.",
    },
    {
      title: "Transparència",
      description:
        "Tots els processos de decisió i gestió són oberts i accessibles per a totes les persones sòcies.",
    },
    {
      title: "Proximitat",
      description:
        "Prioritzem els productes locals per reduir l'impacte ambiental i donar suport a l'economia local.",
    },
    {
      title: "Participació",
      description:
        "Fomentem la implicació de totes les persones sòcies en la presa de decisions i la gestió del projecte.",
    },
    {
      title: "Compromís Social",
      description:
        "Treballem per construir un model econòmic i social més just i equitatiu.",
    },
  ];

  return (
    <div className="font-poppins">
      {/* Hero */}
      <div className="bg-primary-light py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1
              className="text-4xl font-bold text-gray-900 sm:text-5xl"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <h2
              className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </div>

      {/* Contingut principal */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-start">
          {/* Text column */}
          <div className="text-left space-y-6">
            <p className="text-lg text-gray-600">
              La Igualitària és un projecte que neix de l&apos;associació
              Cooperasec i l&apos;associació SomlaClau, juntament amb veïnes del
              barri del Poble-sec, amb la idea de transformar el model de
              consum.
            </p>
            <p className="text-lg text-gray-600">
              Aquest nom fa referència a una cooperativa de consum nascuda al
              Poble-sec el 1902 i que es va convertir en tot un símbol
              d&apos;autoorganització popular cooperativista al barri.
            </p>
            <p className="text-lg text-gray-600">
              Des de la dècada de 1880 fins al final de la guerra civil, el
              cooperativisme a Catalunya es va convertir en un sistema econòmic
              alternatiu al capitalisme que tenia una dimensió econòmica, però
              també social, comunitària i cultural. Les cooperatives oferien
              suport a les treballadores durant les llargues vagues ja fos en
              forma d&apos;aliments i productes bàsics, medicaments, jornal,
              etc., i van esdevenir un referent del suport mutu i la vida
              comunitària.
            </p>
            <p className="text-lg text-gray-600">
              I això és el que volem que sigui La Igualitària, un espai
              cooperatiu, autogestionat i comunitari en favor del consum
              responsable.
            </p>
            <div className="pt-2">
              <Link
                href="/fer-se-soci"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors"
              >
                Uneix-te a nosaltres
              </Link>
            </div>
          </div>

          {/* Photo collage column */}
          <div className="relative mt-12 lg:mt-0">
            {/* Decorative accent block */}
            <div className="absolute -bottom-4 -right-4 w-3/4 h-3/4 bg-primary-light rounded-2xl -z-10" />
            <div className="space-y-4">
              {/* Main image — tall */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-md">
                <Image
                  src="/quiSomImage.webp"
                  fill
                  className="object-cover"
                  alt="La Igualitària, cooperativa de consum del Poble-sec"
                />
              </div>
              {/* Two smaller images side by side */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-square overflow-hidden rounded-xl shadow-md">
                  <Image
                    src="/quisom2.webp"
                    fill
                    className="object-cover"
                    alt="Espai de La Igualitària"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-xl shadow-md">
                  <Image
                    src="/quisom3.webp"
                    fill
                    className="object-cover"
                    alt="Productes de La Igualitària"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Valors */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              <span className="">Els nostres valors</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-secondary mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
