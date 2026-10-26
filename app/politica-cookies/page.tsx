import type { Metadata } from "next";
import CookieSettingsButton from "@/components/CookieSettingsButton";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Política de cookies del lloc web de La Igualitària, Cooperativa del Poble-sec.",
  robots: { index: false, follow: false },
};

export default function PoliticaCookies() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Política de Cookies</h1>

      <section className="space-y-6 text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Què són les cookies?</h2>
          <p>
            Les cookies són fitxers de text petits que els llocs web emmagatzemen al teu dispositiu
            quan els visites. Permeten que el lloc web recordi les teves accions i preferències durant
            un període de temps.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. Cookies que utilitzem</h2>
          <h3 className="font-medium mt-3 mb-1">Cookies pròpies</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-200 px-3 py-2 text-left">Nom</th>
                  <th className="border border-gray-200 px-3 py-2 text-left">Tipus</th>
                  <th className="border border-gray-200 px-3 py-2 text-left">Finalitat</th>
                  <th className="border border-gray-200 px-3 py-2 text-left">Durada</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-3 py-2 font-mono text-xs">cookie_consent</td>
                  <td className="border border-gray-200 px-3 py-2">Tècnica</td>
                  <td className="border border-gray-200 px-3 py-2">Emmagatzema la teva elecció sobre l&apos;ús de cookies (acceptació o rebuig)</td>
                  <td className="border border-gray-200 px-3 py-2">1 any</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-medium mt-4 mb-1">Cookies de tercers</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-200 px-3 py-2 text-left">Proveïdor</th>
                  <th className="border border-gray-200 px-3 py-2 text-left">Nom</th>
                  <th className="border border-gray-200 px-3 py-2 text-left">Tipus</th>
                  <th className="border border-gray-200 px-3 py-2 text-left">Finalitat</th>
                  <th className="border border-gray-200 px-3 py-2 text-left">Durada</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-3 py-2">Google (Google Maps)</td>
                  <td className="border border-gray-200 px-3 py-2">Cookies pròpies de Google</td>
                  <td className="border border-gray-200 px-3 py-2">Contingut extern</td>
                  <td className="border border-gray-200 px-3 py-2">Mostrar el mapa interactiu amb la ubicació de la botiga. Només es carrega si hi dones el consentiment.</td>
                  <td className="border border-gray-200 px-3 py-2">Segons la{" "}
                    <a href="https://policies.google.com/technologies/cookies?hl=ca" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-900">política de Google</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-sm bg-gray-50 border border-gray-200 rounded p-3">
            <strong>Sobre Google Maps:</strong> el mapa no es carrega fins que no l&apos;acceptes. En
            carregar-lo, el teu navegador es connecta amb servidors de Google (google.com,
            googleapis.com i gstatic.com), que reben la teva adreça IP, i Google pot llegir o instal·lar
            les seves pròpies cookies (per exemple, si tens una sessió iniciada en un compte de Google).
            Google pot transferir aquestes dades als Estats Units, a l&apos;empara del Marc de Privacitat
            de Dades UE-EUA. Més informació a la{" "}
            <a href="https://policies.google.com/privacy?hl=ca" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-900">política de privadesa de Google</a>.
          </p>

          <p className="mt-3 text-sm bg-gray-50 border border-gray-200 rounded p-3">
            <strong>Nota:</strong> Aquest lloc web té un ús de cookies mínim. No s&apos;utilitzen cookies
            analítiques, de publicitat ni de xarxes socials. Si en el futur s&apos;incorporen, aquesta
            política s&apos;actualitzarà i se sol·licitarà el consentiment corresponent.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. Tipus de cookies per categoria</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Cookies tècniques (necessàries):</strong> Imprescindibles per al funcionament del lloc web. No requereixen consentiment.</li>
            <li><strong>Contingut extern:</strong> Serveis de tercers integrats al web (Google Maps). Requereixen consentiment.</li>
            <li><strong>Cookies analítiques:</strong> No s&apos;utilitzen en aquest lloc web.</li>
            <li><strong>Cookies de màrqueting:</strong> No s&apos;utilitzen en aquest lloc web.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. Com donar o retirar el consentiment</h2>
          <p>
            La primera vegada que visites el web et mostrem un avís on pots acceptar, rebutjar o
            configurar les cookies que no són necessàries. Rebutjar-les és tan fàcil com acceptar-les i
            no afecta la navegació. Guardem la teva elecció durant 1 any; passat aquest temps, te la
            tornarem a demanar.
          </p>
          <p className="mt-2">
            Pots canviar o retirar el teu consentiment en qualsevol moment des d&apos;aquí o des de
            l&apos;enllaç «Configuració de cookies» del peu de pàgina:
          </p>
          <CookieSettingsButton className="mt-3 inline-flex items-center rounded-md border-2 border-primary bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" />
          <p className="mt-3">
            Si retires el consentiment, el mapa de Google Maps deixarà de carregar-se. Les cookies que
            Google ja hagi instal·lat no es poden esborrar des d&apos;aquest web: les pots eliminar des
            del teu navegador seguint les instruccions de l&apos;apartat següent.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Com gestionar les cookies des del navegador</h2>
          <p>
            Pots configurar el teu navegador per bloquejar o eliminar les cookies. Tingues en compte
            que bloquejar les cookies tècniques pot afectar el funcionament del lloc web.
          </p>
          <p className="mt-2">Instruccions per als principals navegadors:</p>
          <ul className="mt-1 list-disc pl-5 space-y-1">
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-900">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/ca/kb/cookies-informacio-que-els-llocs-web-emmagatzemen" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-900">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/ca-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-900">Safari</a></li>
            <li><a href="https://support.microsoft.com/ca-es/microsoft-edge/eliminar-les-cookies-a-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-900">Microsoft Edge</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">6. Actualitzacions d&apos;aquesta política</h2>
          <p>
            La Igualitària es reserva el dret d&apos;actualitzar aquesta Política de Cookies en funció de
            canvis legislatius o tècnics. Et recomanem que la revisis periòdicament.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">7. Contacte</h2>
          <p>
            Per a qualsevol dubte relacionat amb l&apos;ús de cookies, pots contactar-nos a:{" "}
            <a href="mailto:laigualitaria@cooperasec.org" className="underline hover:text-gray-900">
              laigualitaria@cooperasec.org
            </a>
          </p>
        </div>

        <p className="text-sm text-gray-500 pt-4 border-t">
          Darrera actualització: octubre de 2026
        </p>
      </section>
    </div>
  );
}
