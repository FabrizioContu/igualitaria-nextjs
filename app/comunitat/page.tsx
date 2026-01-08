import { Calendar, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "Comunitat - La Igualitària",
};

export default function Comunitat() {
  const events = [
    {
      id: 1,
      title: "Assemblea mensual",
      date: "26 de maig, 2024",
      time: "18:00 - 20:00",
      location: "Local de La Igualitària",
      description:
        "Assemblea mensual oberta a totes les persones sòcies per prendre decisions sobre el funcionament de la cooperativa.",
    },
    {
      id: 2,
      title: "Taller de fermentats",
      date: "2 de juny, 2024",
      time: "17:00 - 19:00",
      location: "Local de La Igualitària",
      description:
        "Aprèn a fer kombutxa, quefir i altres fermentats. Places limitades.",
    },
  ];

  return (
    <div className="font-poppins">
      {/* Hero */}
      <div className="bg-primary-light py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              <span className="">Comunitat</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              La Igualitària és molt més que una botiga. Som una comunitat que
              treballa per construir una alternativa de consum conscient.
            </p>
          </div>
        </div>
      </div>

      {/* Esdeveniments */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              <span className="">Propers esdeveniments</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Participa en les nostres activitats i forma part activa de la
              comunitat.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{event.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-5 w-5 mr-2 text-primary" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-5 w-5 mr-2 text-primary" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-5 w-5 mr-2 text-primary" />
                      {event.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary-light py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            <span className="">Forma part de la comunitat</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            La força de La Igualitària és la seva comunitat. T&apos;animes a
            participar-hi?
          </p>
          <div className="mt-8">
            <a
              href="/fer-se-soci"
              className="inline-flex bg-pink-600 items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white hover:bg-gray-50 transition-colors  hover:text-pink-600 hover:ring-2 hover:ring-pink-600"
            >
              Fes-te sòcia
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
