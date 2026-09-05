"use client";

import { useStage, onEnter, appear, gsap } from "../stage";

/**
 * About — "the work behind the practice".
 *
 * The five oversized words fly in from alternating sides, then keep sliding
 * horizontally as the section scrolls, so the stack keeps rearranging itself.
 * This is the page's signature moment, so it gets the longest travel.
 */
export function CascadeStage({ children }: { children: React.ReactNode }) {
  const ref = useStage((pick, root) => {
    const words = pick("word");
    const tl = onEnter(root, "top 75%");

    appear(tl, pick("head"), { opacity: 0, y: 24, stagger: 0.1 });
    if (words.length) {
      tl.fromTo(
        words,
        { opacity: 0, xPercent: (i: number) => (i % 2 === 0 ? -14 : 14) },
        {
          opacity: 1,
          xPercent: 0,
          duration: 1.2,
          stagger: 0.11,
          ease: "power4.out",
        },
        0.15,
      );
    }
    appear(tl, pick("payoff"), { opacity: 0, y: 20, scale: 0.96 }, 0.9);

    // `x` (px) rather than `xPercent`, which the entrance above already owns —
    // sharing a property makes the scrub snap on the first scroll.
    words.forEach((word, i) => {
      gsap.to(word, {
        x: i % 2 === 0 ? 70 : -70,
        ease: "none",
        immediateRender: false,
        scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 1.2 },
      });
    });
  });

  return <div ref={ref}>{children}</div>;
}
