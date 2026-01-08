"use client";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import type { ProviderShape } from "../types/wordpress";
import { Spinner } from "./ui/Spinner";
import Link from "next/link";

interface MarkerData {
  id: number;
  title: string;
  ubicacio: string;
  lat: number;
  lng: number;
  tipus: string;
}

interface MapSectionProps {
  providers?: ProviderShape[];
}

// Geocoding con Nominatim (gratuito, sin API key)
async function geocodeLocation(
  location: string
): Promise<{ lat: number; lng: number } | null> {
  if (!location) return null;
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        location + ", Spain"
      )}`
    );
    if (!response.ok) return null;
    const data = await response.json();
    if (data.length === 0) return null;
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  } catch (error) {
    console.error(`Error geocoding ${location}:`, error);
    return null;
  }
}

export const MapSection = ({ providers = [] }: MapSectionProps) => {
  const defaultCenter = useMemo(() => [41.3746, 2.1619] as const, []);
  const [markerData, setMarkerData] = useState<MarkerData[]>([]);
  const [loading, setLoading] = useState(false);

  // Geocodificar ubicaciones cuando cambian los proveedores
  useEffect(() => {
    if (providers.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMarkerData([]);
      return;
    }

    setLoading(true);
    const geocodeAll = async () => {
      const results = await Promise.all(
        providers.map(async (p) => {
          const ubicacio = p.acf?.ubicacio ?? "";
          const coords = await geocodeLocation(ubicacio);
          return {
            id: p.id,
            title: p.title,
            ubicacio,
            lat: coords?.lat ?? defaultCenter[0],
            lng: coords?.lng ?? defaultCenter[1],
            tipus: p.acf?.tipus ?? "",
          };
        })
      );
      setMarkerData(results);
      setLoading(false);
    };

    geocodeAll();
  }, [defaultCenter, providers]);

  if (loading) {
    return (
      <div className="space-y-8">
        <h2 className="text-3xl font-bold">Localització dels Proveïdors</h2>
        <div>
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">
          Localització dels Proveïdors
        </h2>
        <p className="text-gray-600">
          Descobreix on es troben els nostres proveïdors a Barcelona i arreu.
        </p>
      </div>

      {markerData.length === 0 ? (
        <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">No hi ha proveïdors per mostrar.</p>
        </div>
      ) : (
        <MapContainer
          center={[41.3743703, 2.1574336]}
          zoom={8}
          className="h-96 rounded-lg border border-gray-300 z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {markerData.map((marker) => (
            <Marker key={marker.id} position={[marker.lat, marker.lng]}>
              <Tooltip className="">
                <p className="font-semibold">{marker.title}</p>
                <p>{marker.ubicacio}</p>
                <p>{marker.tipus}</p>
              </Tooltip>
              <Popup>
                <Link
                  href={`/proveidors/${marker.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="text-sm space-y-1"
                >
                  <p className="font-bold text-primary">{marker.title}</p>
                </Link>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
      <section className="flex flex-col items-center bg-gray-50 p-6 rounded-lg text-center">
        <div className="font-bold text-lg mb-2">Ets Proveidor?</div>
        <p>
          Si ets productor i estàs interessat en formar part de la nostra xarxa,
          contacta&apos;ns!
        </p>
        <a
          className="bg-primary text-white px-4 py-3 my-4 rounded-md "
          href="mailto:laigualitaria@cooperasec.org"
        >
          Contacta&apos;ns
        </a>
      </section>
    </div>
  );
};
