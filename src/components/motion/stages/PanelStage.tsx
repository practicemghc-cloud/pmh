"use client";

import { useEffect } from "react";
import { useStage, onEnter, appear, gsap } from "../stage";

/**
 * Services — the five service panels.
 *
 * "What's included" ticks down the left while the sage asset card builds on the
 * right. `slug` re-keys it, so switching tabs re-plays both columns instead of
 * cutting.
 */
export function PanelStage({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const ref = useStage((pick, root) => {
    appear(onEnter(root, "top 85%"), pick("head"), { opacity: 0, y: 24, stagger: 0.1 });
  });

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const left = root.querySelectorAll<HTMLElement>('[data-anim="included"]');
    const right = root.querySelectorAll<HTMLElement>('[data-anim="asset-row"]');
    const steps = root.querySelectorAll<HTMLElement>('[data-anim="step"]');

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    if (left.length)
      tl.fromTo(left, { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.05 }, 0);
    if (right.length)
      tl.fromTo(right, { opacity: 0, x: 18 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.06 }, 0.1);
    if (steps.length)
      tl.fromTo(steps, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, 0.25);

    return () => {
      tl.kill();
    };
  }, [slug, ref]);

  return <div ref={ref}>{children}</div>;
}
