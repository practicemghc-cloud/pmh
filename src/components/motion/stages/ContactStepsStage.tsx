"use client";

import { useStage, onEnter, appear } from "../stage";

/**
 * Contact — "What happens on the call".
 *
 * The rule wipes the full width of the section, then the three steps rise
 * through it in order.
 */
export function ContactStepsStage({ children }: { children: React.ReactNode }) {
  const ref = useStage((pick, root) => {
    const tl = onEnter(root, "top 82%");

    appear(tl, pick("head"), { opacity: 0, y: 24, stagger: 0.1 });
    tl.from(
      pick("rule"),
      { scaleX: 0, transformOrigin: "left center", duration: 1, ease: "power2.inOut" },
      0.2,
    );
    appear(tl, pick("step"), { opacity: 0, y: 30, stagger: 0.12, duration: 0.85 }, 0.45);
  });

  return <div ref={ref}>{children}</div>;
}
