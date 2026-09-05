"use client";

import { useStage, onEnter, appear } from "../stage";

/**
 * Home — "Your money stays yours".
 *
 * The payment-flow diagram draws itself in the order the money actually moves:
 * the payer appears, the mint line runs across to the consultant's account,
 * then the dashed branch drops away to PMG — reinforcing that PMG is never in
 * the payment path.
 */
export function FlowStage({ children }: { children: React.ReactNode }) {
  const ref = useStage((pick, root) => {
    const tl = onEnter(root, "top 78%");

    appear(tl, pick("copy"), { opacity: 0, y: 24, stagger: 0.09 });
    appear(tl, pick("node-payer"), { opacity: 0, x: -24, duration: 0.7 }, 0.25);
    tl.from(
      pick("flow-line"),
      { scaleX: 0, transformOrigin: "left center", duration: 0.55, ease: "power2.inOut" },
      0.5,
    );
    appear(tl, pick("flow-arrow"), { opacity: 0, x: -12, duration: 0.35 }, 0.95);
    appear(tl, pick("node-bank"), { opacity: 0, scale: 0.92, duration: 0.6 }, 1);
    tl.from(
      pick("flow-branch"),
      { scaleY: 0, transformOrigin: "center top", duration: 0.5, ease: "power2.inOut" },
      1.25,
    );
    appear(tl, pick("node-pmg"), { opacity: 0, y: 20, duration: 0.6 }, 1.5);
    appear(tl, pick("flow-note"), { opacity: 0, duration: 0.6 }, 1.7);
  });

  return <div ref={ref}>{children}</div>;
}
