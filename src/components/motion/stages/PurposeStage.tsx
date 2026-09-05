"use client";

import { useStage, onEnter, appear } from "../stage";

/**
 * About — purpose, vision and belief.
 *
 * The wide photo uncovers from the left, then the two stacked cards arrive from
 * the right; inside the first, each quality ticks in one at a time.
 */
export function PurposeStage({ children }: { children: React.ReactNode }) {
  const ref = useStage((pick, root) => {
    const tl = onEnter(root, "top 80%");

    appear(tl, pick("head"), { opacity: 0, y: 24, stagger: 0.1 });
    appear(
      tl,
      pick("photo"),
      { clipPath: "inset(0% 100% 0% 0%)", duration: 1.3, ease: "power4.inOut" },
      0.2,
    );
    appear(tl, pick("aside"), { opacity: 0, x: 34, stagger: 0.12, duration: 1 }, 0.4);
    appear(tl, pick("quality"), { opacity: 0, x: 16, stagger: 0.09, duration: 0.6 }, 0.85);
  });

  return <div ref={ref}>{children}</div>;
}
