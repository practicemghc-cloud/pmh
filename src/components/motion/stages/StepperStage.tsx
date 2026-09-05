"use client";

import { useEffect } from "react";
import { useStage, onEnter, appear, gsap } from "../stage";

/**
 * Home — "See exactly what happens next".
 *
 * The four tabs slide in from the left and the progress rail runs out beneath
 * them. `step` re-keys the panel animation, so stepping through re-plays the
 * copy and the asset each time rather than snapping.
 */
export function StepperStage({
  step,
  children,
}: {
  step: number;
  children: React.ReactNode;
}) {
  const ref = useStage((pick, root) => {
    const tl = onEnter(root, "top 82%");
    appear(tl, pick("head"), { opacity: 0, y: 24, stagger: 0.1 });
    appear(tl, pick("tab"), { opacity: 0, x: -24, stagger: 0.08 }, 0.2);
    tl.from(
      pick("progress"),
      { scaleX: 0, transformOrigin: "left center", duration: 0.9, ease: "power2.inOut" },
      0.4,
    );
  });

  // Re-play the panel on every step change.
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = root.querySelectorAll<HTMLElement>('[data-anim="panel-item"]');
    if (!targets.length) return;

    const tween = gsap.fromTo(
      targets,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.55, stagger: 0.06, ease: "power2.out", overwrite: true },
    );
    return () => {
      tween.kill();
    };
  }, [step, ref]);

  return <div ref={ref}>{children}</div>;
}
