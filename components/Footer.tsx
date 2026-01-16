"use client";

import Link from "next/link";
import Image from "next/image";
import Map from "../components/Map";

// Constantes
const CONTACT_INFO = {
  address: "Carrer Vallhonrat, 18",
  city: "08004 Barcelona",
  email: "laigualitaria@cooperasec.org",
  phone: "+34 931947646",
  whatsapp: "34634110332",
} as const;

const SCHEDULE = [
  { days: "Dilluns-Divendres", hours: "10:00-14:00 / 16:00-20:30" },
  { days: "Dissabte", hours: "10:00-14:00" },
  { days: "Diumenge", hours: "Tancat" },
] as const;

const SOCIAL_LINKS = {
  telegram: "https://t.me/laigualitaria",
  instagram: "https://www.instagram.com/laigualitaria_economatcoop",
  whatsapp: `https://api.whatsapp.com/send?phone=${CONTACT_INFO.whatsapp}`,
} as const;

const Footer = () => {
  return (
    <>
      {/* Wave decorativa */}
      <div className="flex w-full">
        <Image
          src="/waveBottom2.png"
          alt="Decoració ona"
          width={1920}
          height={128}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      <footer>
        {/* Sección principal */}
        <section className="bg-pink-600 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-6 py-12">
            <div className="flex flex-col items-center justify-between sm:flex-row py-14 px-6 gap-6 sm:gap-2">
              {/* Logo y descripción */}
              <div className="space-y-4 xl:col-span-1">
                <Image
                  src="/LogoBillet.webp"
                  alt="La Igualitària"
                  width={128}
                  height={128}
                  className="h-48 w-auto mb-4 mx-auto sm:mx-0"
                />
                <p className="text-white text-lg max-w-xs text-pretty">
                  Cooperativa de consum autogestionada i participativa que
                  ofereix productes de proximitat, de temporada i agroecològics
                  al veïnat del Poble-sec.
                </p>

                {/* Redes sociales */}
                <div className="flex space-x-6 justify-center sm:justify-start py-2">
                  {/* Telegram */}
                  <a
                    href={SOCIAL_LINKS.telegram}
                    className="text-white/80 hover:text-white hover:scale-110 transition-colors"
                    aria-label="Telegram"
                    target="_blank"
                  >
                    <svg
                      fill="currentColor"
                      className="h-6 w-6"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M22.122 10.040c0.006-0 0.014-0 0.022-0 0.209 0 0.403 0.065 0.562 0.177l-0.003-0.002c0.116 0.101 0.194 0.243 0.213 0.403l0 0.003c0.020 0.122 0.031 0.262 0.031 0.405 0 0.065-0.002 0.129-0.007 0.193l0-0.009c-0.225 2.369-1.201 8.114-1.697 10.766-0.21 1.123-0.623 1.499-1.023 1.535-0.869 0.081-1.529-0.574-2.371-1.126-1.318-0.865-2.063-1.403-3.342-2.246-1.479-0.973-0.52-1.51 0.322-2.384 0.221-0.23 4.052-3.715 4.127-4.031 0.004-0.019 0.006-0.040 0.006-0.062 0-0.078-0.029-0.149-0.076-0.203l0 0c-0.052-0.034-0.117-0.053-0.185-0.053-0.045 0-0.088 0.009-0.128 0.024l0.002-0.001q-0.198 0.045-6.316 4.174c-0.445 0.351-1.007 0.573-1.619 0.599l-0.006 0c-0.867-0.105-1.654-0.298-2.401-0.573l0.074 0.024c-0.938-0.306-1.683-0.467-1.619-0.985q0.051-0.404 1.114-0.827 6.548-2.853 8.733-3.761c1.607-0.853 3.47-1.555 5.429-2.010l0.157-0.031zM15.93 1.025c-8.302 0.020-15.025 6.755-15.025 15.060 0 8.317 6.742 15.060 15.060 15.060s15.060-6.742 15.060-15.060c0-8.305-6.723-15.040-15.023-15.060h-0.002q-0.035-0-0.070 0z"></path>{" "}
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a
                    href={SOCIAL_LINKS.instagram}
                    className="text-white/80 hover:text-white  hover:scale-110  transition-colors"
                    aria-label="Instagram"
                    target="_blank"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                    </svg>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={SOCIAL_LINKS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white  hover:scale-110  transition-colors"
                    aria-label="WhatsApp"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Mapa */}
              <section className="rounded-lg overflow-hidden shadow-md h-80 w-80 my-3">
                <Map />
              </section>

              {/* Información de contacto y horarios */}
              <div>
                {/* Contacto */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold uppercase tracking-wider">
                    Contacte
                  </h3>
                  <ul className="mt-3 space-y-1">
                    <li className="text-lg">{CONTACT_INFO.address}</li>
                    <li className="text-lg">{CONTACT_INFO.city}</li>
                    <li className="text-lg">{CONTACT_INFO.email}</li>
                    <li className="text-lg">{CONTACT_INFO.phone}</li>
                  </ul>
                </div>

                {/* Horarios */}
                <div>
                  <h3 className="text-lg font-bold uppercase tracking-wider">
                    Horaris
                  </h3>
                  <ul className="mt-3 space-y-1">
                    {SCHEDULE.map((item, index) => (
                      <li key={index} className="text-lg">
                        {item.days}: {item.hours}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección inferior con logos */}
        <section className="bg-linear-to-t from-pink-800 to-pink-600">
          <div className="py-5 space-y-5">
            <div className="flex justify-center">
              <Link href="/" aria-label="Som la Clau">
                <Image
                  src="/somLaClau.webp"
                  alt="Logo Som la Clau"
                  width={200}
                  height={48}
                  className="h-12 w-auto rounded-lg"
                />
              </Link>
            </div>
            <div className="flex justify-center px-3">
              <Link href="/" aria-label="Logos col·laboradors">
                <Image
                  src="/logos_peu.webp"
                  alt="Logos col·laboradors"
                  width={200}
                  height={48}
                  className="h-12 w-auto rounded-lg bg-white p-1"
                />
              </Link>
            </div>
            <div className="mx-auto pt-3">
              <p
                className="text-base text-white/85 text-center"
                suppressHydrationWarning
              >
                &copy; 2026 La Igualitària. Tots els drets reservats.
              </p>
            </div>
            <div className="mx-auto pt-1">
              <p className="text-sm text-white/80 text-center">
                Desenvolupat per{" "}
                <a
                  href="https://fabriziocontu.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white transition"
                  aria-label="Web desenvolupada per FabriDev"
                >
                  FabriDev
                </a>
              </p>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
};

export default Footer;
