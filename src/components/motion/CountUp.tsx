"use client";

import { useRef } from "react";
import { gsap, useGSAP, motionOK, START } from "./gsap";

/**
 * Counts a stat up to its final value when it scrolls into view.
 *
 * The final value is rendered server-side, so it is correct before any JS runs
 * and for reduced-motion visitors — the animation only rewinds it to 0 and
 * plays it forward.
 */
export function CountUp({
  value,
  duration = 1.6,
  className,
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  const root = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      motionOK(() => {
        const counter = { n: 0 };
        gsap.to(counter, {
          n: value,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = String(Math.round(counter.n));
          },
          scrollTrigger: { trigger: el, start: START, once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <span ref={root} className={className}>
      {value}
    </span>
  );
}
