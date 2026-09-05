"use client";

import { useStage, onEnter, appear, gsap } from "../stage";

/**
 * About hero.
 *
 * The photo bleeds off the left edge in the design, so it uncovers from that
 * edge — the clip opens left-to-right while the image eases back from a slight
 * scale, then keeps drifting as the page scrolls.
 */
export function AboutHeroStage({ children }: { children: React.ReactNode }) {
  const ref = useStage((pick, root) => {
    const tl = onEnter(root, "top 88%");

    appear(tl, pick("photo"), {
      clipPath: "inset(0% 100% 0% 0%)",
      duration: 1.4,
      ease: "power4.inOut",
    });
    tl.from(pick("photo-inner"), { scale: 1.14, duration: 1.6, ease: "power3.out" }, 0);
    appear(tl, pick("copy"), { opacity: 0, y: 26, stagger: 0.1 }, 0.35);
    appear(tl, pick("credential"), { opacity: 0, y: 18, stagger: 0.09 }, 0.85);

    gsap.to(pick("photo"), {
      y: 48,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 1 },
    });
  });

  return <div ref={ref}>{children}</div>;
}
