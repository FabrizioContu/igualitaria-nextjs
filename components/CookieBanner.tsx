"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import {
  onOpenConsentSettings,
  saveConsent,
  useConsent,
  type ConsentCategories,
} from "@/lib/consent";

// Acceptar y Rebutjar con el mismo peso visual (exigencia AEPD)
const BUTTON_CLASS =
  "inline-flex items-center justify-center rounded-md border-2 border-primary bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

const CookieBanner = () => {
  const consent = useConsent();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  // Abierto desde el footer o desde /politica-cookies
  useEffect(() => onOpenConsentSettings(() => setSettingsOpen(true)), []);

  // <dialog> nativo: showModal() da foco atrapado, fondo inert y cierre con Escape
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (settingsOpen && !dialog.open) {
      returnFocusRef.current = document.activeElement as HTMLElement | null;
      dialog.showModal();
    } else if (!settingsOpen && dialog.open) {
      dialog.close();
    }
  }, [settingsOpen]);

  const handleDialogClose = () => {
    setSettingsOpen(false);
    if (returnFocusRef.current?.isConnected) {
      returnFocusRef.current.focus();
    }
  };

  const decide = (categories: ConsentCategories) => {
    saveConsent(categories);
    setSettingsOpen(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    decide({ external: data.get("external") === "on" });
  };

  return (
    <>
      {consent === null && (
        <section
          aria-labelledby="cookie-banner-title"
          className="fixed inset-x-0 bottom-0 z-60 border-t border-gray-200 bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.12)]"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="text-sm text-gray-700">
              <h2
                id="cookie-banner-title"
                className="mb-1 text-base font-semibold text-primary"
              >
                Utilitzem cookies
              </h2>
              <p className="max-w-3xl">
                Aquest web només utilitza cookies tècniques necessàries. Si ho
                acceptes, també carregarem el mapa de Google Maps, que pot
                instal·lar o llegir cookies de Google. Més informació a la{" "}
                <Link
                  href="/politica-cookies"
                  className="underline hover:text-gray-900"
                >
                  Política de cookies
                </Link>
                .
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <button
                type="button"
                className={BUTTON_CLASS}
                onClick={() => decide({ external: true })}
              >
                Acceptar
              </button>
              <button
                type="button"
                className={BUTTON_CLASS}
                onClick={() => decide({ external: false })}
              >
                Rebutjar
              </button>
              <button
                type="button"
                className={BUTTON_CLASS}
                onClick={() => setSettingsOpen(true)}
              >
                Configurar
              </button>
            </div>
          </div>
        </section>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby="cookie-settings-title"
        onClose={handleDialogClose}
        className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-lg bg-white p-0 text-gray-700 shadow-xl backdrop:bg-black/50"
      >
        {settingsOpen && (
          <form onSubmit={handleSubmit} className="space-y-5 p-6">
            <div className="flex items-start justify-between gap-4">
              <h2
                id="cookie-settings-title"
                className="text-xl font-semibold text-primary"
              >
                Configuració de cookies
              </h2>
              <button
                type="button"
                onClick={() => setSettingsOpen(false)}
                className="rounded-md p-1 text-gray-500 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Tanca"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <p className="text-sm">
              Tria quines cookies acceptes. Pots canviar la teva elecció en
              qualsevol moment des de l&apos;enllaç «Configuració de cookies»
              del peu de pàgina.
            </p>

            <div className="space-y-4">
              <div className="rounded-md border border-gray-200 p-4">
                <label className="flex items-center justify-between gap-4 font-medium">
                  Necessàries
                  <span className="flex items-center gap-2 text-sm font-normal text-gray-500">
                    Sempre actives
                    <input
                      type="checkbox"
                      checked
                      disabled
                      aria-describedby="cookie-necessary-desc"
                      className="h-4 w-4 accent-primary"
                    />
                  </span>
                </label>
                <p id="cookie-necessary-desc" className="mt-1 text-sm">
                  Imprescindibles perquè el web funcioni i per recordar la teva
                  elecció sobre les cookies.
                </p>
              </div>

              <div className="rounded-md border border-gray-200 p-4">
                <label className="flex items-center justify-between gap-4 font-medium">
                  Contingut extern (Google Maps)
                  <input
                    type="checkbox"
                    name="external"
                    defaultChecked={consent?.external ?? false}
                    aria-describedby="cookie-external-desc"
                    className="h-4 w-4 accent-primary"
                  />
                </label>
                <p id="cookie-external-desc" className="mt-1 text-sm">
                  Mostra el mapa interactiu de la botiga. En carregar-lo, Google
                  pot instal·lar o llegir les seves pròpies cookies i rep la teva
                  adreça IP.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                className={BUTTON_CLASS}
                onClick={() => decide({ external: false })}
              >
                Rebutjar tot
              </button>
              <button
                type="button"
                className={BUTTON_CLASS}
                onClick={() => decide({ external: true })}
              >
                Acceptar tot
              </button>
              <button type="submit" className={BUTTON_CLASS}>
                Desar preferències
              </button>
            </div>
          </form>
        )}
      </dialog>
    </>
  );
};

export default CookieBanner;
