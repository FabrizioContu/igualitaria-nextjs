"use client";

import dynamic from "next/dynamic";

const MapClient = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-200 animate-pulse rounded-lg" />,
});

export default MapClient;
