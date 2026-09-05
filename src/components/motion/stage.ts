"use client";

import { useRef } from "react";
import { gsap, useGSAP, motionOK, EASE, START } from "./gsap";

/** Elements inside a stage opt in with `data-anim="<name>"`. */
export type Pick = (name: string) => HTMLElement[];

/**
 * Runs one bespoke scroll timeline per section.
 *
 * A section marks its moving parts with `data-anim="…"` and the matching stage
 * component choreographs them. Nothing wraps or re-parents the markup, and the
 * stage element itself is never transformed — a transform there would become
 * the containing block for the absolutely-positioned hero collage.
 */
export function useStage(build: (pick: Pick, root: HTMLElement) => void) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      motionOK(() => {
        const pick: Pick = (name) =>
          gsap.utils.toArray<HTMLElement>(el.querySelectorAll(`[data-anim="${name}"]`));
        build(pick, el);
      });
    },
    { scope: root },
  );

  return root;
}

/** A timeline that plays once when the section reaches `start`. */
export function onEnter(trigger: Element, start = START) {
  return gsap.timeline({
    defaults: { ease: EASE, duration: 0.9 },
    scrollTrigger: { trigger, start, once: true },
  });
}

/** Resting value for every property `appear()` knows how to animate in. */
const RESTING: Record<string, unknown> = {
  opacity: 1,
  x: 0,
  y: 0,
  xPercent: 0,
  yPercent: 0,
  scale: 1,
  scaleX: 1,
  scaleY: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  clipPath: "inset(0% 0% 0% 0%)",
  filter: "blur(0px)",
};

const TIMING = [
  "duration",
  "ease",
  "stagger",
  "delay",
  "transformOrigin",
  "transformPerspective",
] as const;

/**
 * Adds a "come in from" tween to a timeline.
 *
 * Deliberately `fromTo` rather than `from`: several of these elements start
 * hidden in CSS (see `[data-reveal]` in globals.css) so nothing flashes before
 * hydration, and `from()` would read that hidden value as the *destination* and
 * animate 0 → 0. Spelling out the resting state releases them properly.
 *
 * No `clearProps` — the leftover inline transform is harmless here, and
 * clearing it would fight the scrub parallax that some of the same elements run
 * afterwards.
 */
export function appear(
  tl: gsap.core.Timeline,
  targets: HTMLElement[],
  from: gsap.TweenVars,
  position?: gsap.Position,
) {
  if (!targets.length) return tl;

  const to: gsap.TweenVars = {};
  for (const key of Object.keys(from)) {
    if (key in RESTING) to[key] = RESTING[key];
  }
  for (const key of TIMING) {
    if (key in from) to[key] = from[key];
  }

  return tl.fromTo(targets, from, to, position);
}

export { gsap, EASE, START };
