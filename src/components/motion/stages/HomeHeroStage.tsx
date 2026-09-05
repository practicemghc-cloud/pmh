"use client";

import { useStage, onEnter, appear, gsap } from "../stage";

/**
 * Home hero — the site's opening move.
 *
 * The dark panel wipes in from the right edge, the copy rises in sequence, and
 * the collage assembles card by card. The cards then drift at different rates
 * as you scroll, so the composition has depth rather than sitting flat.
 */
export function HomeHeroStage({ children }: { children: React.ReactNode }) {
  const ref = useStage((pick, root) => {
    const tl = onEnter(root, "top 90%");

    appear(tl, pick("panel"), {
      clipPath: "inset(0% 0% 0% 100%)",
      duration: 1.3,
      ease: "power4.inOut",
    });
    appear(tl, pick("copy"), { opacity: 0, y: 26, stagger: 0.1 }, 0.15);
    appear(
      tl,
      pick("card"),
      { opacity: 0, y: 56, scale: 0.94, duration: 1.15, stagger: 0.13, ease: "power3.out" },
      0.45,
    );
    appear(tl, pick("stat"), { opacity: 0, y: 18, stagger: 0.08 }, 0.9);

    // Each collage card then drifts at its own rate.
    //
    // Deliberately `yPercent`, not `y`: the entrance above animates `y`, and
    // two tweens writing the same property meant the scrub seized it on the
    // first scroll and snapped the cards. GSAP keeps `y` and `yPercent` as
    // separate transform channels and sums them, so the drift composes with
    // the entrance instead of fighting it. `immediateRender: false` also stops
    // the scrub staking a claim before the entrance has played.
    pick("card").forEach((card, i) => {
      gsap.to(card, {
        yPercent: [-11, 7, -9, 13][i % 4],
        ease: "none",
        immediateRender: false,
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 1 },
      });
    });
  });

  return <div ref={ref}>{children}</div>;
}
