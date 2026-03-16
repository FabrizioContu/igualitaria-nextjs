import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacitat",
  description: "Política de privacitat del lloc web de La Igualitària, Cooperativa del Poble-sec.",
  robots: { index: false, follow: false },
};

export default function PoliticaPrivacitat() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Política de Privacitat</h1>

      <section className="space-y-6 text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Responsable del tractament</h2>
          <p>
            En compliment del Reglament (UE) 2016/679 (RGPD) i la Llei Orgànica 3/2018 (LOPDGDD),
            t&apos;informem que el responsable del tractament de les teves dades personals és:
          </p>
          <ul className="mt-2 space-y-1 list-none pl-0">
            <li><strong>Denominació:</strong> La Igualitària, Cooperativa del Poble-sec</li>
            <li><strong>Domicili:</strong> Carrer Vallhonrat, 18, 08004 Barcelona</li>
            <li><strong>Correu electrònic:</strong> laigualitaria@cooperasec.org</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. Dades que recollim</h2>
          <p>Podem recollir les següents categories de dades personals:</p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li><strong>Dades d&apos;identificació:</strong> nom, cognoms, correu electrònic.</li>
            <li><strong>Dades de navegació:</strong> adreça IP, tipus de navegador, pàgines visitades (a través de cookies tècniques i analítiques).</li>
          </ul>
          <p className="mt-2">No recollim dades especialment protegides ni dades de menors de 14 anys.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. Finalitats i base jurídica del tractament</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-200 px-3 py-2 text-left">Finalitat</th>
                  <th className="border border-gray-200 px-3 py-2 text-left">Base jurídica</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">Respondre consultes enviades a través del formulari de contacte</td>
                  <td className="border border-gray-200 px-3 py-2">Interès legítim / consentiment</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">Gestió de la comunitat de sòcies i proveïdors</td>
                  <td className="border border-gray-200 px-3 py-2">Execució d&apos;un contracte</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">Enviament de comunicacions informatives (newsletter)</td>
                  <td className="border border-gray-200 px-3 py-2">Consentiment</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">Anàlisi estadística del lloc web</td>
                  <td className="border border-gray-200 px-3 py-2">Interès legítim</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. Conservació de les dades</h2>
          <p>
            Les teves dades es conservaran durant el temps necessari per a la finalitat per a la qual
            van ser recollides i, posteriorment, durant els terminis legals de prescripció aplicables.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Destinataris</h2>
          <p>
            Les teves dades no seran cedides a tercers, excepte per obligació legal o quan sigui
            necessari per a la prestació del servei (per exemple, proveïdors tecnològics com Vercel
            per a l&apos;allotjament del lloc web).
          </p>
          <p className="mt-2">
            Aquests proveïdors actuen com a encarregats del tractament i estan obligats a mantenir
            la confidencialitat de les dades.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">6. Drets de les persones interessades</h2>
          <p>Pots exercir en qualsevol moment els teus drets de:</p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li><strong>Accés</strong> a les teves dades personals.</li>
            <li><strong>Rectificació</strong> de dades inexactes.</li>
            <li><strong>Supressió</strong> (&quot;dret a l&apos;oblit&quot;).</li>
            <li><strong>Oposició</strong> al tractament.</li>
            <li><strong>Limitació</strong> del tractament.</li>
            <li><strong>Portabilitat</strong> de les dades.</li>
            <li><strong>Retirada del consentiment</strong> en qualsevol moment, sense que això afecti la licitud del tractament previ.</li>
          </ul>
          <p className="mt-3">
            Per exercir aquests drets, envia una sol·licitud a{" "}
            <a href="mailto:laigualitaria@cooperasec.org" className="underline hover:text-gray-900">
              laigualitaria@cooperasec.org
            </a>{" "}
            adjuntant una còpia del teu document d&apos;identitat.
          </p>
          <p className="mt-2">
            Si consideres que el tractament de les teves dades vulnera la normativa, pots presentar
            una reclamació davant l&apos;<strong>Agència Espanyola de Protecció de Dades (AEPD)</strong>:{" "}
            <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-900">
              www.aepd.es
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">7. Seguretat</h2>
          <p>
            La Igualitària aplica les mesures tècniques i organitzatives adequades per garantir la
            seguretat de les teves dades i evitar-ne l&apos;accés no autoritzat, la pèrdua o la destrucció.
          </p>
        </div>

        <p className="text-sm text-gray-500 pt-4 border-t">
          Darrera actualització: març de 2026
        </p>
      </section>
    </div>
  );
}
