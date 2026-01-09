import Image from "next/image";

export const metadata = {
  title: "Fes-te Sòcia - La Igualitària",
};

export default function FesteSoci() {
  return (
    <div className="font-family-cocotte bg-primary">
      <div className="mt-16 pb-16 rounded-lg mx-auto max-w-4xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="pb-8">
              <Image
                src="/header-2.svg"
                alt="imatge de la botiga"
                width={800}
                height={300}
                priority
                className="mx-auto"
              />
            </div>
            <h1 className=" text-7xl lg:px-28">
              <span className="">Suma&apos;t al consum que canvia el món!</span>
            </h1>
            <p className="mt-4 text-2xl max-w-3xl mx-auto">
              La Igualitària – Economat cooperatiu del Poble-sec som una botiga
              cooperativa on podràs adquirir els productes quotidians reduint
              impacte ambiental i garantint preus justos en tota la cadena de
              producció.
            </p>
            <p className="mt-4 text-2xl max-w-3xl mx-auto">
              Som una cooperativa de consum impulsada pel teixit veïnal del
              Poble-sec, un projecte autogestionat i participatiu que fomenta el
              comerç de productes locals, de temporada i ecològics.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 bg p-16 lg:rounded-lg mx-auto max-w-4xl bg-[url(/bgBlue.jpg)] bg-center bg-repeat">
        <h2 className="text-4xl font-bold text-white mb-4 mx-auto text-center ">
          Fes-te sòcia de La Igualitària – Economat cooperatiu del Poble-sec
        </h2>
        <ol className="space-y-6 mt-8 text-white">
          <li className="flex">
            <div className="shrink-0 ">
              <div className="flex text-2xl items-center justify-center h-10 w-10 rounded-full bg-[#ff9900] text-white font-bold">
                1
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium ">
                Per tenir un 15% de descompte en la compra de productes.
              </h3>
            </div>
          </li>
          <li className="flex">
            <div className="shrink-0">
              <div className="flex text-2xl items-center justify-center h-10 w-10 rounded-full bg-[#ff9900] text-white font-bold">
                2
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                Per minimitzar l’impacte ambiental. Productes ecològics i de
                proximitat.
              </h3>
            </div>
          </li>
          <li className="flex">
            <div className="shrink-0">
              <div className="flex text-2xl items-center justify-center h-10 w-10 rounded-full bg-[#ff9900] text-white font-bold">
                3
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                Per fer una compra justa per tot el procés productiu. Visca la
                pagesia!.
              </h3>
            </div>
          </li>
          <li className="flex">
            <div className="shrink-0">
              <div className="flex text-2xl items-center justify-center h-10 w-10 rounded-full bg-[#ff9900] text-white font-bold">
                4
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                Per decidir sobre el funcionament i criteris de la cooperativa.
                T’esperem a l’assemblea!.
              </h3>
            </div>
          </li>
          <li className="flex">
            <div className="shrink-0">
              <div className="flex text-2xl items-center justify-center h-10 w-10 rounded-full bg-[#ff9900] text-white font-bold">
                5
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                Per ser part del teixit que manté viu el barri del Poble-sec.
              </h3>
            </div>
          </li>
        </ol>
        <div className="mt-20 text-center">
          <a
            href="https://usem.liberaforms.org/socialaigualitaria"
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold  rounded-md text-white bg-[#ff9900] hover:bg-[#ff9900] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fes-te sòcia
          </a>
          <div className="mt-20 flex justify-center">
            <Image
              src="/fruites.png"
              alt="imagen fruta"
              width={400}
              height={300}
            />
          </div>
        </div>
      </div>
      <div className=" p-16 lg:rounded-lg mx-auto max-w-4xl">
        <p className=" text-lg text-white text-center">
          ** Per ser sòcia de La Igualitària Economat Cooperatiu del Poble-sec
          SCCL cal fer una aportació inicial de capital social de 50 €
          (retornable en el moment de donar-se de baixa) i el pagament
          trimestral d’una quota de 20 €. Les sòcies tenen un 15% de descompte
          en tot el producte i participen de l’assemblea de la cooperativa per a
          definir les línies estratègiques del projecte.
        </p>
      </div>
    </div>
  );
}
