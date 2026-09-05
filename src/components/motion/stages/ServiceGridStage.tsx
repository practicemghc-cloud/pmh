"use client";

import { useStage, onEnter, appear } from "../stage";

/**
 * Home — "What we handle".
 *
 * The dark feature card lifts first and its invoice table fills in row by row,
 * as if the ledger were being written. The four service cards below then
 * alternate in from opposite sides, and any bar chart grows from its baseline.
 */
export function ServiceGridStage({ children }: { children: React.ReactNode }) {
  const ref = useStage((pick, root) => {
    const tl = onEnter(root, "top 80%");

    appear(tl, pick("head"), { opacity: 0, y: 26, stagger: 0.1 });
    appear(tl, pick("feature"), { opacity: 0, y: 48, duration: 1.1 }, 0.2);
    appear(tl, pick("chip"), { opacity: 0, y: 10, scale: 0.9, stagger: 0.05 }, 0.5);
    appear(tl, pick("tile"), { opacity: 0, y: 16, stagger: 0.1 }, 0.55);
    appear(tl, pick("row"), { opacity: 0, x: -18, stagger: 0.07 }, 0.65);

    // Cards alternate in from either side, each on its own trigger.
    pick("card").forEach((card, i) => {
      appear(onEnter(card, "top 88%"), [card], {
        opacity: 0,
        y: 40,
        x: i % 2 === 0 ? -28 : 28,
        duration: 1.05,
      });
    });

    pick("bar").forEach((bar, i) => {
      onEnter(bar, "top 92%").from(bar, {
        scaleY: 0,
        transformOrigin: "center bottom",
        duration: 0.8,
        delay: i * 0.06,
        ease: "power3.out",
      });
    });
  });

  return <div ref={ref}>{children}</div>;
}
