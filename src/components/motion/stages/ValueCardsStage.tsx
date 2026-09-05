"use client";

import { useStage, onEnter, appear } from "../stage";

/**
 * Home — the "Nothing hidden / We only win / Your practice, your choice" row.
 *
 * Each card tips up from a slight forward rotation, so the row reads as three
 * panels being stood upright. The figures inside then fill their tracks.
 */
export function ValueCardsStage({ children }: { children: React.ReactNode }) {
  const ref = useStage((pick) => {
    pick("card").forEach((card, i) => {
      const tl = onEnter(card, "top 88%");

      appear(tl, [card], {
        opacity: 0,
        y: 44,
        rotateX: -6,
        transformPerspective: 900,
        transformOrigin: "center bottom",
        duration: 1,
        delay: i * 0.08,
      });

      const fills = Array.from(card.querySelectorAll<HTMLElement>('[data-anim="fill"]'));
      if (fills.length) {
        tl.from(
          fills,
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
          },
          0.45,
        );
      }
    });
  });

  return <div ref={ref}>{children}</div>;
}
