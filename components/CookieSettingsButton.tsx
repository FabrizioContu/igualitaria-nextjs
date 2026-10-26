"use client";
import { openConsentSettings } from "@/lib/consent";

interface CookieSettingsButtonProps {
  className?: string;
}

export function CookieSettingsButton({ className }: CookieSettingsButtonProps) {
  return (
    <button type="button" onClick={openConsentSettings} className={className}>
      Configuració de cookies
    </button>
  );
}

export default CookieSettingsButton;
