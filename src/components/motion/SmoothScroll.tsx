"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

/**
 * Site-wide smooth scrolling, hash handling, and "always land at the top" on
 * navigation.
 *
 * Lenis rather than GSAP's ScrollSmoother on purpose: ScrollSmoother works by
 * transforming a content wrapper, which breaks `position: fixed` (the floating
 * nav) and `position: sticky` (the Services tab strip). Lenis interpolates the
 * real window scroll position, so both keep working untouched.
 */

const NAV_CLEARANCE = 120;

/** Fired whenever the URL changes by any means. See `patchHistory`. */
export const LOCATION_CHANGE = "pmg:locationchange";

/**
 * The live Lenis instance, so other client components can scroll through the
 * same smoothing instead of jumping past it with native APIs.
 */
let active: Lenis | null = null;

/** Scrolls an element just below the fixed nav, easing when Lenis is running. */
function scrollToElement(el: HTMLElement) {
  if (active) active.scrollTo(el, { offset: -NAV_CLEARANCE });
  else el.scrollIntoView({ block: "start" });
}

/**
 * Makes URL changes observable.
 *
 * The App Router navigates with `history.pushState`, which fires no event —
 * not `hashchange`, not `popstate`. And intercepting the click instead doesn't
 * work either: Next's <Link> calls `preventDefault()` on the anchor before the
 * event bubbles anywhere, so a document-level listener sees `defaultPrevented`
 * and has to bail. That left anything deriving state from the URL — the
 * Services tab strip — deaf to same-page navigation: clicking a service in the
 * header or footer while a different tab was open did nothing at all.
 *
 * Patching the two history methods to emit an event is the one place that
 * catches every case: Next's navigations, our own, and the browser's buttons.
 */
function patchHistory(): () => void {
  const w = window as Window & { __pmgHistoryPatched?: boolean };
  if (w.__pmgHistoryPatched) return () => {};

  const emit = () => window.dispatchEvent(new Event(LOCATION_CHANGE));
  const { pushState, replaceState } = window.history;

  window.history.pushState = function (...args) {
    const result = pushState.apply(this, args);
    emit();
    return result;
  };
  window.history.replaceState = function (...args) {
    const result = replaceState.apply(this, args);
    emit();
    return result;
  };
  w.__pmgHistoryPatched = true;

  return () => {
    window.history.pushState = pushState;
    window.history.replaceState = replaceState;
    w.__pmgHistoryPatched = false;
  };
}

export function SmoothScroll() {
  const pathname = usePathname();
  const lenis = useRef<Lenis | null>(null);

  /* -- Smoothing. Skipped entirely under reduced motion. ------------------ */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      // Leave touch alone — native momentum beats an emulation of it.
      syncTouch: false,
    });
    lenis.current = instance;
    active = instance;

    instance.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    // Lenis already smooths; GSAP's lag smoothing on top of it causes jumps.
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      instance.destroy();
      lenis.current = null;
      active = null;
    };
  }, []);

  /* -- Hash handling. Runs regardless of motion preference. --------------- */
  useEffect(() => {
    const goToHash = (hash: string) => {
      const id = hash.replace("#", "");
      if (!id || id === "top") {
        if (lenis.current) lenis.current.scrollTo(0);
        else window.scrollTo(0, 0);
        return;
      }
      const target = document.getElementById(id);
      if (target) scrollToElement(target);
    };

    const unpatch = patchHistory();

    // Plain in-page anchors (the footer's "Back to top") aren't Next Links, so
    // the browser would jump before Lenis could ease. Take those over.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = (event.target as HTMLElement | null)?.closest("a");
      const raw = link?.getAttribute("href");
      if (!link || !raw || !raw.startsWith("#") || raw === "#") return;
      if (link.target && link.target !== "_self") return;

      event.preventDefault();
      if (raw !== window.location.hash) {
        // The patched pushState emits LOCATION_CHANGE, which scrolls.
        window.history.pushState(null, "", raw);
      } else {
        goToHash(raw);
      }
    };

    const onLocationChange = () => {
      const hash = window.location.hash;
      if (!hash) return;
      // The target may only exist once a panel re-renders for the new tab.
      requestAnimationFrame(() => goToHash(hash));
    };

    // Fold the native events into the same signal.
    const relay = () => window.dispatchEvent(new Event(LOCATION_CHANGE));

    document.addEventListener("click", onClick);
    window.addEventListener(LOCATION_CHANGE, onLocationChange);
    window.addEventListener("hashchange", relay);
    window.addEventListener("popstate", relay);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener(LOCATION_CHANGE, onLocationChange);
      window.removeEventListener("hashchange", relay);
      window.removeEventListener("popstate", relay);
      unpatch();
    };
  }, []);

  /* -- Land predictably on every page change ------------------------------ */
  useEffect(() => {
    ScrollTrigger.refresh();

    const hash = window.location.hash.slice(1);
    if (!hash) {
      lenis.current?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
      return;
    }

    let frame = 0;
    let tries = 0;
    const findAndScroll = () => {
      const target = document.getElementById(hash);
      if (target) {
        scrollToElement(target);
        return;
      }
      if (tries++ < 3) {
        frame = requestAnimationFrame(findAndScroll);
        return;
      }
      lenis.current?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    };
    frame = requestAnimationFrame(findAndScroll);

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
