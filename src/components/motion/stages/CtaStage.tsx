"use client";

import { useStage, onEnter, appear } from "../stage";

/**
 * The closing CTA card.
 *
 * The card scales up into place, then keeps moving on its own: the background
 * rings pulse outward on a CSS loop (see `.cta-pulse` in globals.css), so the
 * panel stays alive after the copy has settled — no scroll needed.
 */
export function CtaStage({ children }: { children: React.ReactNode }) {
  const ref = useStage((pick, root) => {
    const tl = onEnter(root, "top 85%");

    appear(tl, pick("card"), {
      opacity: 0,
      y: 40,
      scale: 0.95,
      duration: 1.15,
      ease: "power3.out",
    });
    appear(tl, pick("line"), { opacity: 0, y: 22, stagger: 0.1 }, 0.35);
    appear(tl, pick("action"), { opacity: 0, y: 16, scale: 0.96, stagger: 0.08 }, 0.6);
    appear(tl, pick("assure"), { opacity: 0, y: 12, stagger: 0.08 }, 0.8);

  });

  return <div ref={ref}>{children}</div>;
}
