"use client";

import { useStage, onEnter, appear } from "../stage";

/**
 * About — "That's where PMG comes in".
 *
 * The photo uncovers upward and the mission card, which overlaps its lower-left
 * corner in the design, slides up over it afterwards so the overlap reads as
 * deliberate layering.
 */
export function StatementStage({ children }: { children: React.ReactNode }) {
  const ref = useStage((pick, root) => {
    const tl = onEnter(root, "top 80%");

    appear(tl, pick("copy"), { opacity: 0, y: 26, stagger: 0.1 });
    appear(
      tl,
      pick("photo"),
      { clipPath: "inset(100% 0% 0% 0%)", duration: 1.3, ease: "power4.inOut" },
      0.1,
    );
    tl.from(pick("photo-inner"), { scale: 1.12, duration: 1.5, ease: "power3.out" }, 0.1);
    appear(
      tl,
      pick("mission"),
      { opacity: 0, y: 44, x: -18, duration: 1, ease: "power3.out" },
      0.75,
    );
  });

  return <div ref={ref}>{children}</div>;
}
