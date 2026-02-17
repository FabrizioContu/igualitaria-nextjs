"use client";
import { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import type { ProviderShape } from "../types/wordpress";
import Link from "next/link";

interface MarkerData {
  id: number;
  title: string;
  slug: string;
  ubicacio: string;
  lat: number;
  lng: number;
  tipus: string;
}

interface MapSectionProps {
  providers?: ProviderShape[];
}

export const MapSection = ({ providers = [] }: MapSectionProps) => {
  const markerData = useMemo<MarkerData[]>(() => {
    return providers
      .filter((p) => {
        const lat = parseFloat(p.acf?.latitud ?? "");
        const lng = parseFloat(p.acf?.longitud ?? "");
        return !isNaN(lat) && !isNaN(lng);
      })
      .map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        ubicacio: p.acf?.ubicacion ?? "",
        lat: parseFloat(p.acf?.latitud ?? "0"),
        lng: parseFloat(p.acf?.longitud ?? "0"),
        tipus: p.acf?.tipus ?? "",
      }));
  }, [providers]);

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
                  href={`/proveidors/${marker.slug}`}
                  className="text-sm space-y-1"
                >
                  <p className="font-bold text-primary">{marker.title}</p>
                </Link>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};
