import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Avís Legal",
  description: "Avís legal del lloc web de La Igualitària, Cooperativa del Poble-sec.",
  robots: { index: false, follow: false },
};

export default function AvisLegal() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Avís Legal</h1>

      <section className="space-y-6 text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Informació general</h2>
          <p>
            En compliment de la Llei 34/2002, d&apos;11 de juliol, de Serveis de la Societat de la
            Informació i de Comerç Electrònic (LSSI-CE), s&apos;informa que el present lloc web{" "}
            <strong>laigualitaria.coop</strong> és titularitat de:
          </p>
          <ul className="mt-2 space-y-1 list-none pl-0">
            <li><strong>Denominació:</strong> La Igualitària, Cooperativa del Poble-sec</li>
            <li><strong>Domicili social:</strong> Carrer Vallhonrat, 18, 08004 Barcelona</li>
            <li><strong>Correu electrònic:</strong> laigualitaria@cooperasec.org</li>
            <li><strong>Web:</strong> https://laigualitaria.coop</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. Objecte</h2>
          <p>
            El present Avís Legal regula l&apos;accés i l&apos;ús del lloc web laigualitaria.coop, així
            com els continguts i serveis posats a disposició dels usuaris per part de La Igualitària.
          </p>
          <p className="mt-2">
            L&apos;accés i l&apos;ús del lloc web implica l&apos;acceptació plena i sense reserves de
            totes les disposicions incloses en aquest Avís Legal, la Política de Privacitat i la
            Política de Cookies.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. Condicions d&apos;accés i ús</h2>
          <p>
            L&apos;usuari es compromet a fer un ús adequat i lícit del lloc web, de conformitat amb
            la legislació vigent, l&apos;ordre públic, la moral i els bons costums.
          </p>
          <p className="mt-2">Queda prohibit:</p>
          <ul className="mt-1 list-disc pl-5 space-y-1">
            <li>L&apos;ús del lloc web amb finalitats il·legals o lesives per a La Igualitària o tercers.</li>
            <li>La reproducció, distribució o modificació dels continguts sense autorització expressa.</li>
            <li>La introducció de programes, virus o qualsevol codi maliciós.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. Propietat intel·lectual i industrial</h2>
          <p>
            Tots els continguts del lloc web —incloent-hi textos, imatges, logotips, dissenys i codi
            font— són propietat de La Igualitària o disposen de llicència d&apos;ús, i estan protegits
            per la legislació vigent en matèria de propietat intel·lectual i industrial.
          </p>
          <p className="mt-2">
            Queda expressament prohibida la seva reproducció total o parcial sense el consentiment
            previ i per escrit de La Igualitària.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Responsabilitat</h2>
          <p>
            La Igualitària no es responsabilitza dels danys i perjudicis que puguin derivar-se de
            l&apos;ús del lloc web, ni dels continguts de tercers als quals es pugui accedir mitjançant
            enllaços externs.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">6. Llei aplicable i jurisdicció</h2>
          <p>
            El present Avís Legal es regeix per la legislació espanyola. Per a la resolució de
            qualsevol controvèrsia, les parts se sotmeten als jutjats i tribunals de Barcelona, amb
            renúncia expressa a qualsevol altre fur que pogués correspondre&apos;ls.
          </p>
        </div>

        <p className="text-sm text-gray-500 pt-4 border-t">
          Darrera actualització: març de 2026
        </p>
      </section>
    </div>
  );
}
