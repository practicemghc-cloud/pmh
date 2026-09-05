"use client";

import { useStage, onEnter, appear } from "../stage";

/**
 * Home — client stories.
 *
 * The faint column rules wipe down first, then the avatar rail scales in from
 * the centre outward — matching the way the design sizes faces by their
 * distance from the selected one. The story card lifts in last.
 */
export function AvatarRailStage({ children }: { children: React.ReactNode }) {
  const ref = useStage((pick, root) => {
    const tl = onEnter(root, "top 80%");

    tl.from(pick("rule"), {
      scaleY: 0,
      transformOrigin: "center top",
      duration: 1.1,
      stagger: { each: 0.04, from: "center" },
      ease: "power2.out",
    });
    appear(tl, pick("head"), { opacity: 0, y: 24, stagger: 0.1 }, 0.1);
    appear(
      tl,
      pick("avatar"),
      {
        opacity: 0,
        scale: 0.4,
        duration: 0.8,
        stagger: { each: 0.06, from: "center" },
        ease: "back.out(1.6)",
      },
      0.35,
    );
    appear(tl, pick("story"), { opacity: 0, y: 40, duration: 1 }, 0.6);
    appear(tl, pick("controls"), { opacity: 0, y: 16 }, 0.9);
  });

  return <div ref={ref}>{children}</div>;
}
