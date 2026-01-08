import Link from "next/link";
import { getPageBySlug } from "@/lib/wp";

export const metadata = {
  title: "Qui Som - La Igualitària",
  description: "Cooperativa de consum del Poble-sec, Barcelona",
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
            <div
              className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </div>

      {/* Contingut principal */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="text-left space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">La Igualitària</h2>
            <p className="text-lg text-gray-600">
              La Igualitària va ser el nom que va rebre el primer projecte de
              menjador comunitari de l&apos;Ateneu La Base, al barri de Poble
              Sec, l&apos;any 2014.
            </p>
            <p className="text-lg text-gray-600">
              Avui, 10 anys després, altres veïnes del barri recuperem el nom
              per crear l&apos;economat del barri: La Igualitària.
            </p>
            <p className="text-lg text-gray-600">
              Actualment, La Igualitària és una cooperativa de consum
              autogestionada i participativa que ofereix productes de
              proximitat, de temporada i agroecològics al veïnat del Poble-sec.
            </p>
            <div className="mt-8">
              <Link
                href="/fer-se-soci"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors"
              >
                Uneix-te a nosaltres
              </Link>
            </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <div className="rounded-xl shadow-lg w-full h-96 bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">Imatge aquí</p>
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
