"use client";

import { useStage, onEnter, appear } from "../stage";

/**
 * Home — "Your money stays yours".
 *
 * The payment-flow diagram draws itself in the order the story runs: PMG
 * raises the invoice, the dashed line drops to the payer who settles it, and
 * only then does the mint run carry the money across to the consultant's
 * account — reinforcing that PMG is never in the payment path.
 */
export function FlowStage({ children }: { children: React.ReactNode }) {
  const ref = useStage((pick, root) => {
    const tl = onEnter(root, "top 78%");

    appear(tl, pick("copy"), { opacity: 0, y: 24, stagger: 0.09 });
    appear(tl, pick("node-pmg"), { opacity: 0, x: -24, duration: 0.7 }, 0.25);
    tl.from(
      pick("flow-branch"),
      { scaleY: 0, transformOrigin: "center top", duration: 0.5, ease: "power2.inOut" },
      0.6,
    );
    appear(tl, pick("node-payer"), { opacity: 0, y: 20, duration: 0.6 }, 0.85);
    tl.from(
      pick("flow-line"),
      { scaleX: 0, transformOrigin: "left center", duration: 0.55, ease: "power2.inOut" },
      1.15,
    );
    appear(tl, pick("flow-arrow"), { opacity: 0, x: -12, duration: 0.35 }, 1.6);
    appear(tl, pick("node-bank"), { opacity: 0, scale: 0.92, duration: 0.6 }, 1.65);
    appear(tl, pick("flow-note"), { opacity: 0, duration: 0.6 }, 2);
  });

  return <div ref={ref}>{children}</div>;
}
