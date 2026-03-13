"use client";
import { useEffect, useRef, useState } from "react";

const Map = () => {
  const [isVisible, setIsVisible] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

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
    <div ref={mapRef} className="w-full h-full min-h-400">
      {isVisible ? (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d408.5423898917244!2d2.1565583846794336!3d41.374155115673524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a3d356a3ad25%3A0xb81dc7cdd887ab6c!2sLa%20Igualit%C3%A0ria%20Economat%20Cooperatiu%20del%20Poble-sec!5e1!3m2!1ses!2ses!4v1773404231531!5m2!1ses!2ses"
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
