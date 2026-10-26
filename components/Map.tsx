"use client";
import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { saveConsent, useConsent } from "@/lib/consent";

const GOOGLE_MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=La+Igualit%C3%A0ria+Economat+Cooperatiu+del+Poble-sec";

const Map = () => {
  const [isVisible, setIsVisible] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const consent = useConsent();
  // Sin consentimiento el iframe NO se renderiza: ocultarlo con CSS igual lo cargaría
  const canLoadMap = consent?.external === true;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={mapRef} className="w-full h-full">
      {!canLoadMap ? (
        <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center gap-3 p-6 text-center">
          <MapPin className="h-8 w-8 text-secondary" aria-hidden="true" />
          <p className="text-sm text-gray-700">
            Aquest mapa és de Google Maps i pot utilitzar cookies de Google.
          </p>
          <button
            type="button"
            onClick={() => saveConsent({ external: true })}
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Acceptar i carregar el mapa
          </button>
          <a
            href={GOOGLE_MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary underline hover:text-gray-900"
          >
            Obrir a Google Maps
            <span className="sr-only"> (s&apos;obre en una pestanya nova)</span>
          </a>
        </div>
      ) : isVisible ? (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.989890745306!2d2.15757329677769!3d41.3743043578728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a3d356a3ad25%3A0xb81dc7cdd887ab6c!2sLa%20Igualit%C3%A0ria%20Economat%20Cooperatiu%20del%20Poble-sec!5e0!3m2!1ses!2ses!4v1773405016237!5m2!1ses!2ses"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa de La Igualitària"
        />
      ) : (
        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">Carregant mapa...</p>
        </div>
      )}
    </div>
  );
};

export default Map;
