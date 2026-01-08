import Link from "next/link";

const Participa = () => {
  const features = [
    {
      title: "Productes de proximitat",
      description:
        "Oferim productes locals, reduint l'impacte ambiental del transport i donant suport a l'economia local.",
      icon: (
        <svg
          className="h-6 w-6 text-accent"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
    },
    {
      title: "Productes de temporada",
      description:
        "Seguim els cicles naturals per oferir-te els productes quan estan en el seu millor moment i són més sostenibles.",
      icon: (
        <svg
          className="h-6 w-6 text-accent"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      ),
    },
    {
      title: "Productes agroecològics",
      description:
        "Apostem per mètodes respectuosos amb el medi ambient i la salut de les persones.",
      icon: (
        <svg
          className="h-6 w-6 text-accent"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            <span className="">Participa en La Igualitària</span>
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
            Uneix-te a la nostra comunitat de veïns i veïnes del Poble-sec i
            gaudeix dels beneficis de formar part d&apos;una cooperativa de
            consum autogestionada.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10 md:space-y-0">
            {features.map((feature) => (
              <div key={feature.title} className="relative">
                <dt>
                  <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-primary-light">
                    {feature.icon}
                  </div>
                  <p className="ml-16 text-lg font-medium text-gray-900">
                    {feature.title}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/fer-se-soci"
            className=" _block inline-flex bg-pink-600 items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white hover:bg-gray-50 transition-colors  hover:text-pink-600 hover:ring-2 hover:ring-pink-600"
          >
            Fes-te sòcia
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Participa;
