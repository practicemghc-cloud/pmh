"use client";

import { useStage, onEnter, appear, gsap } from "../stage";

/**
 * About — the UK Medical Adviser.
 *
 * The portrait uncovers from the left while the copy rises beside it, then the
 * credentials tick in one at a time and the seal settles onto the photo last.
 * The portrait keeps drifting as you scroll, so the card has depth rather than
 * sitting flat once the entrance is over.
 */
export function AdviserStage({ children }: { children: React.ReactNode }) {
  const ref = useStage((pick, root) => {
    const tl = onEnter(root, "top 78%");

    appear(
      tl,
      pick("portrait"),
      { clipPath: "inset(0% 100% 0% 0%)", duration: 1.25, ease: "power4.inOut" },
    );
    appear(tl, pick("copy"), { opacity: 0, y: 24, stagger: 0.1 }, 0.25);
    appear(tl, pick("credential"), { opacity: 0, x: 18, stagger: 0.1, duration: 0.7 }, 0.75);
    appear(tl, pick("seal"), { opacity: 0, scale: 0.8, duration: 0.7, ease: "back.out(1.8)" }, 1);

    // Deliberately `yPercent`, not `y`: the entrance owns `y`, and two tweens
    // writing the same property fight on the first scroll. See HomeHeroStage.
    pick("portrait").forEach((portrait) => {
      gsap.to(portrait, {
        yPercent: -5,
        ease: "none",
        immediateRender: false,
        scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    });
  });

  return <div ref={ref}>{children}</div>;
}
