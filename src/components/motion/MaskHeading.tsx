"use client";

import { useRef, type ElementType } from "react";
import { gsap, SplitText, useGSAP, motionOK, START } from "./gsap";

/**
 * Line-by-line mask reveal for the big headings — each line rises out from
 * behind its own clipped band.
 *
 * SplitText's `mask: "lines"` builds the overflow-hidden wrappers and
 * `autoSplit` re-splits on resize. The split waits for `document.fonts.ready`
 * so lines break against Urbanist rather than the fallback face.
 */
export function MaskHeading({
  as: Tag = "h2",
  duration = 1.05,
  stagger = 0.09,
  delay = 0,
  className,
  children,
}: {
  as?: ElementType;
  duration?: number;
  stagger?: number;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      return motionOK(() => {
        let split: SplitText | undefined;
        let cancelled = false;

        const run = () => {
          if (cancelled || !root.current) return;
          gsap.set(el, { opacity: 1 });

          split = SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            linesClass: "split-line",
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 115,
                duration,
                delay,
                stagger,
                ease: "power4.out",
                scrollTrigger: { trigger: el, start: START, once: true },
              }),
          });
        };

        if (document.fonts.status === "loaded") run();
        else void document.fonts.ready.then(run);

        return () => {
          cancelled = true;
          split?.revert();
        };
      });
    },
    { scope: root },
  );

  return (
    <Tag ref={root} data-reveal="" className={className}>
      {children}
    </Tag>
  );
}
