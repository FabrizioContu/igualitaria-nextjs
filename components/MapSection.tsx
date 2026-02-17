"use client";
import "leaflet/dist/leaflet.css";
import { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Circle, Popup } from "react-leaflet";
import L from "leaflet";
import type { ProviderShape } from "../types/wordpress";
import Link from "next/link";
import markerIcon from "../public/fruites.png";
import tiendaIcon from "../public/logoCircle.webp";

const pinIcon = L.icon({
  iconUrl: markerIcon.src,
  iconSize: [25, 25],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
const igualitariaIcon = L.icon({
  iconUrl: tiendaIcon.src,
  iconSize: [35, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

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
  const purpleOptions = { color: "#e50076" };
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
        <h2 className="text-3xl font-bold mb-2 text-center pb-14">
          Tots els nostres proveïdors a menys de un radi de 200Km
        </h2>
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
          <Circle
            center={[41.8743703, 1.9574336]}
            pathOptions={purpleOptions}
            radius={101000}
            fillOpacity={0.2}
          />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {markerData.map((marker) => (
            <>
              <Marker
                key={marker.id}
                icon={pinIcon}
                position={[marker.lat, marker.lng]}
              >
                <Popup>
                  <Link
                    href={`/proveidors/${marker.slug}`}
                    className="text-sm space-y-1"
                  >
                    <p className="font-bold text-primary">{marker.title}</p>
                  </Link>
                </Popup>
              </Marker>
              <Marker icon={igualitariaIcon} position={[41.3743703, 2.1574336]}>
                <Popup>
                  <p className="font-bold text-primary">La Igualitaria</p>
                </Popup>
              </Marker>
            </>
          ))}
        </MapContainer>
      )}
    </div>
  );
};
