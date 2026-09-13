"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

/**
 * Cookie consent prompt, shown once until a choice is made.
 *
 * The choice is kept in localStorage under `COOKIE_CONSENT_KEY` as
 * "accepted" | "essential". Nothing on the site sets a non-essential cookie
 * today, so this asks before anything is added rather than after: read the key
 * (see `getCookieConsent`) before loading analytics or any other third-party
 * script, and treat a missing value as "not accepted".
 *
 * The banner's visibility depends on browser storage, which the server cannot
 * know, so the server snapshot below reports "already answered" and the real
 * value arrives on hydration — otherwise the banner would paint for a frame
 * for everyone who has already dismissed it.
 */

export const COOKIE_CONSENT_KEY = "pmg-cookie-consent";

export type CookieConsent = "accepted" | "essential";

/** The stored choice, or `null` if the visitor hasn't answered. */
export function getCookieConsent(): CookieConsent | null {
  try {
    const stored = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    return stored === "accepted" || stored === "essential" ? stored : null;
  } catch {
    // Private browsing, or storage blocked entirely. Treat as no consent.
    return null;
  }
}

/**
 * The stored choice as a subscribable value.
 *
 * Read through `useSyncExternalStore` rather than copied into state from an
 * effect: it is external data, and this way a choice made in another tab (or,
 * later, a "manage cookies" link elsewhere on the page) updates the banner
 * without either copy going stale.
 */
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Records the choice and tells every subscriber in this tab about it. */
export function setCookieConsent(consent: CookieConsent) {
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, consent);
  } catch {
    // Nothing to store it in — the banner still closes for this visit.
  }
  listeners.forEach((notify) => notify());
}

export function CookieBanner() {
  const consent = useSyncExternalStore(
    subscribe,
    getCookieConsent,
    // The server has no storage to read; assume answered so nothing flashes.
    () => "essential" as CookieConsent,
  );

  if (consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookies"
      // Sits left of the floating WhatsApp button on wide screens and stacks
      // above it on phones, so neither covers the other.
      className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-[560px] rounded-[24px] border border-line bg-white p-[22px] shadow-lg sm:inset-x-auto sm:bottom-6 sm:left-6 sm:mx-0 md:bottom-8 md:left-8"
    >
      <p className="text-[15px] font-semibold leading-[1.35] text-ink">Cookies on this site</p>
      <p className="mt-[8px] text-[14px] leading-[1.6] text-ink-muted">
        We use essential cookies to make this site work. With your permission we’d also use
        analytics cookies to understand how it is used, so we can improve it. Read our{" "}
        <Link href="/cookie-policy" className="font-semibold text-sage underline underline-offset-2">
          cookie policy
        </Link>
        .
      </p>
      <div className="mt-[18px] flex flex-wrap gap-[10px]">
        <Button onClick={() => setCookieConsent("accepted")}>Accept all</Button>
        <Button variant="secondary" onClick={() => setCookieConsent("essential")}>
          Essential only
        </Button>
      </div>
    </div>
  );
}
