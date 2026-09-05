"use client";

import { useStage, onEnter, appear } from "../stage";

/**
 * Services hero.
 *
 * The numbered index on the right builds line by line — each hairline wipes
 * across before its row slides in, so the list draws itself like a table of
 * contents.
 */
export function ServicesIndexStage({ children }: { children: React.ReactNode }) {
  const ref = useStage((pick, root) => {
    const tl = onEnter(root, "top 88%");

    appear(tl, pick("copy"), { opacity: 0, y: 26, stagger: 0.1 });
    tl.from(
      pick("rule"),
      {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.6,
        stagger: 0.07,
        ease: "power2.inOut",
      },
      0.25,
    );
    appear(tl, pick("index-row"), { opacity: 0, x: 26, duration: 0.7, stagger: 0.07 }, 0.4);
  });

  return <div ref={ref}>{children}</div>;
}
