"use client";

import { useStage, onEnter, appear } from "../stage";

/**
 * About — the answer and the purpose.
 *
 * A band of copy: both columns rise in sequence, left to right.
 */
export function PurposeStage({ children }: { children: React.ReactNode }) {
  const ref = useStage((pick, root) => {
    const tl = onEnter(root, "top 80%");

    appear(tl, pick("head"), { opacity: 0, y: 24, stagger: 0.08 });
  });

  return <div ref={ref}>{children}</div>;
}
