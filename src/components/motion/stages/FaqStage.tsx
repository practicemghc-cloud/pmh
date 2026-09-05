"use client";

import { useStage, onEnter, appear } from "../stage";

/**
 * The FAQ blocks (Home/About, and the extended set on Contact).
 *
 * The intro column scales in, then the question cards drop from slightly above
 * with a short overlap so the stack settles rather than marching in.
 */
export function FaqStage({ children }: { children: React.ReactNode }) {
  const ref = useStage((pick, root) => {
    const tl = onEnter(root, "top 82%");
    appear(tl, pick("head"), { opacity: 0, y: 22, stagger: 0.09 });
    appear(tl, pick("aside"), { opacity: 0, y: 30, scale: 0.97, duration: 1 }, 0.15);
    appear(
      tl,
      pick("q"),
      { opacity: 0, y: -14, duration: 0.7, stagger: 0.07, ease: "power2.out" },
      0.3,
    );
  });

  return <div ref={ref}>{children}</div>;
}
