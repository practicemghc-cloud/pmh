"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { gsap } from "./gsap";

/**
 * Animated disclosure panel for the FAQ accordions.
 *
 * Animates real height (0 <-> auto) and settles back to `auto` so the panel
 * keeps reflowing with its content afterwards. The inner content eases up
 * slightly behind the opening edge, which reads better than the box and the
 * text arriving together.
 *
 * - The first render never animates, so a server-rendered open row is simply
 *   open.
 * - Reduced motion snaps instead.
 * - Closed panels are `inert` so their content leaves the tab order and the
 *   accessibility tree, which `height: 0` alone would not do.
 */
export function Collapse({
  open,
  className,
  children,
}: {
  open: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const shell = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  /**
   * The last `open` value this panel actually rendered.
   *
   * Compared against the incoming value rather than tracking "is this the
   * first run": React re-invokes effects on mount in development, which
   * defeats a first-run flag and made server-rendered open rows animate from
   * height 0 — leaving them collapsed if the animation never ran.
   */
  const rendered = useRef<boolean | null>(null);

  useEffect(() => {
    const el = shell.current;
    const content = inner.current;
    if (!el || !content) return;

    const snap = () => {
      gsap.set(el, { height: open ? "auto" : 0 });
      gsap.set(content, { opacity: open ? 1 : 0, y: 0 });
    };

    // Nothing to animate on mount, on a re-invoked effect, or under reduced
    // motion — just be in the right state.
    if (
      rendered.current === null ||
      rendered.current === open ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      rendered.current = open;
      snap();
      return;
    }
    rendered.current = open;

    const tl = gsap.timeline();

    if (open) {
      tl.set(el, { height: "auto" })
        .from(el, { height: 0, duration: 0.42, ease: "power2.out" })
        .fromTo(
          content,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.34, ease: "power2.out" },
          0.08,
        )
        // Hand height back to the browser so the panel keeps reflowing.
        .set(el, { height: "auto" });
    } else {
      tl.to(content, { opacity: 0, y: -6, duration: 0.18, ease: "power2.in" }).to(
        el,
        { height: 0, duration: 0.34, ease: "power2.inOut" },
        0.06,
      );
    }

    return () => {
      tl.kill();
    };
  }, [open]);

  return (
    <div
      ref={shell}
      className="overflow-hidden"
      style={{ height: open ? "auto" : 0 }}
      inert={!open}
    >
      <div ref={inner} className={cn(className)}>
        {children}
      </div>
    </div>
  );
}
