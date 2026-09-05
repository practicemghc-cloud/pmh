"use client";

import { useStage, onEnter, appear } from "../stage";

/**
 * Contact hero.
 *
 * The intro and the direct-contact rows come in on the left, then the form card
 * lifts in and its fields fill downward — so the eye is led to the form last.
 */
export function ContactStage({ children }: { children: React.ReactNode }) {
  const ref = useStage((pick, root) => {
    const tl = onEnter(root, "top 88%");

    appear(tl, pick("copy"), { opacity: 0, y: 26, stagger: 0.1 });
    appear(tl, pick("contact-row"), { opacity: 0, x: -20, stagger: 0.09 }, 0.3);
    appear(tl, pick("assure"), { opacity: 0, y: 12, stagger: 0.08 }, 0.6);
    appear(tl, pick("form"), { opacity: 0, y: 46, duration: 1.1 }, 0.25);
    appear(tl, pick("field"), { opacity: 0, y: 14, stagger: 0.06 }, 0.55);
  });

  return <div ref={ref}>{children}</div>;
}
