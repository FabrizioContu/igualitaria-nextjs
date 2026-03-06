"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/types/wordpress";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export function PhotoGallery({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = (index: number) => {
    setActiveIndex(index);
    dialogRef.current?.showModal();
  };

  const close = () => {
    dialogRef.current?.close();
    setActiveIndex(null);
  };

  const prev = () =>
    setActiveIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : 0));

  const next = () =>
    setActiveIndex((i) => (i !== null ? (i + 1) % images.length : 0));

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === "ArrowLeft") setActiveIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : 0));
      if (e.key === "ArrowRight") setActiveIndex((i) => (i !== null ? (i + 1) % images.length : 0));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex, images.length]);

  // Close on backdrop click
  const onDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) close();
  };

  if (images.length === 0) return null;

  const active = activeIndex !== null ? images[activeIndex] : null;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900">Moments de la comunitat</h2>
        <p className="mt-3 text-lg text-gray-600">
          Esdeveniments, tallers i activitats que hem viscut juntes.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((img, index) => (
          <button
            key={img.id}
            onClick={() => open(index)}
            className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label={img.alt || `Foto ${index + 1}`}
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              loading={index < 8 ? "eager" : "lazy"}
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <dialog
        ref={dialogRef}
        onClick={onDialogClick}
        onClose={() => setActiveIndex(null)}
        className="fixed inset-0 m-auto w-full h-full max-w-none max-h-none bg-transparent p-0 backdrop:bg-black/80"
      >
        {active && (
          <div className="flex items-center justify-center w-full h-full">
            {/* Close */}
            <button
              onClick={close}
              className="absolute top-4 right-4 z-10 text-white bg-black/40 hover:bg-black/60 rounded-full p-2 transition-colors"
              aria-label="Tancar"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Counter */}
            <span className="absolute top-4 left-4 z-10 text-white text-sm bg-black/40 px-3 py-1 rounded-full">
              {activeIndex! + 1} / {images.length}
            </span>

            {/* Prev */}
            {images.length > 1 && (
              <button
                onClick={prev}
                className="absolute left-4 z-10 text-white bg-black/40 hover:bg-black/60 rounded-full p-2 transition-colors"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
            )}

            {/* Image */}
            <div className="relative w-[90vw] h-[85vh] max-w-5xl">
              <Image
                src={active.url}
                alt={active.alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Next */}
            {images.length > 1 && (
              <button
                onClick={next}
                className="absolute right-4 z-10 text-white bg-black/40 hover:bg-black/60 rounded-full p-2 transition-colors"
                aria-label="Següent"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            )}
          </div>
        )}
      </dialog>
    </section>
  );
}
