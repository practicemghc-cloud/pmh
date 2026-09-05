"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// Tells the inline script in the root layout that the motion runtime arrived,
// so it doesn't fall back to un-hiding everything. Without this, a failed JS
// chunk would leave `.js-motion` hiding content permanently.
if (typeof document !== "undefined") {
  document.documentElement.setAttribute("data-motion-ready", "");
}

/** The design's easing — the same curve the holding page uses. */
export const EASE = "power3.out";
/** Where a section starts revealing: once its top passes 85% of the viewport. */
export const START = "top 85%";

/**
 * Runs `build` only when the visitor has not asked for reduced motion.
 *
 * Deliberately a plain guard rather than `gsap.matchMedia()`: matchMedia keeps
 * its own lifecycle, and nesting it inside `useGSAP` gave two owners for the
 * same tweens — on a re-mount they fought and left timelines frozen partway.
 * With this, `useGSAP`'s context is the only thing that creates and reverts
 * animations. Reduced-motion visitors get no tweens at all, and the media
 * query in globals.css hands them the finished layout.
 */
export function motionOK(build: () => void | (() => void)) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  return build();
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
