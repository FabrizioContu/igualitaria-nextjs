import { useSyncExternalStore } from "react";

// Nombre declarado en /politica-cookies: si cambia, actualizar la política
export const CONSENT_COOKIE = "cookie_consent";
// Subir la versión cuando cambien las cookies declaradas: invalida el consentimiento y se vuelve a preguntar
export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 365; // 1 any (la AEPD recomienda máx. 24 meses)

const CHANGE_EVENT = "cookie-consent-change";
const OPEN_SETTINGS_EVENT = "cookie-consent-open-settings";

export interface ConsentCategories {
  // Contenido de terceros (Google Maps)
  external: boolean;
}

export interface ConsentState extends ConsentCategories {
  v: number;
  ts: string;
}

export function parseConsent(raw: string | null | undefined): ConsentState | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(decodeURIComponent(raw));
    if (
      data?.v !== CONSENT_VERSION ||
      typeof data.ts !== "string" ||
      typeof data.external !== "boolean"
    ) {
      return null;
    }
    return { v: data.v, ts: data.ts, external: data.external };
  } catch {
    return null;
  }
}

export function buildConsentCookie(state: ConsentState, secure: boolean): string {
  const parts = [
    `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(state))}`,
    "Path=/",
    `Max-Age=${CONSENT_MAX_AGE}`,
    "SameSite=Lax",
  ];
  if (secure) parts.push("Secure");
  return parts.join("; ");
}

function readRawCookie(): string | null {
  const prefix = `${CONSENT_COOKIE}=`;
  const entry = document.cookie.split("; ").find((c) => c.startsWith(prefix));
  return entry ? entry.slice(prefix.length) : null;
}

// useSyncExternalStore exige la misma referencia si nada cambió: cacheamos por valor crudo
let cachedRaw: string | null | undefined;
let cachedState: ConsentState | null = null;

export function getConsent(): ConsentState | null {
  const raw = readRawCookie();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedState = parseConsent(raw);
  }
  return cachedState;
}

export function saveConsent(categories: ConsentCategories): void {
  const state: ConsentState = {
    v: CONSENT_VERSION,
    ts: new Date().toISOString(),
    ...categories,
  };
  document.cookie = buildConsentCookie(state, window.location.protocol === "https:");
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeConsent(callback: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
}

export function openConsentSettings(): void {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

export function onOpenConsentSettings(callback: () => void): () => void {
  window.addEventListener(OPEN_SETTINGS_EVENT, callback);
  return () => window.removeEventListener(OPEN_SETTINGS_EVENT, callback);
}

/**
 * undefined = todavía no se sabe (SSR / hidratación)
 * null      = el usuario no ha decidido
 */
export function useConsent(): ConsentState | null | undefined {
  return useSyncExternalStore(subscribeConsent, getConsent, () => undefined);
}
