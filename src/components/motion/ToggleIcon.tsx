"use client";

import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

/**
 * The accordion's plus/minus control.
 *
 * Both exported glyphs are stacked and cross-faded while the pair rotates a
 * quarter turn, so plus reads as rotating *into* minus rather than swapping.
 * CSS transitions rather than GSAP — it is a state change on a control, not
 * part of a scroll timeline.
 */
export function ToggleIcon({ open, className }: { open: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "relative grid size-[20px] place-items-center transition-transform duration-300 ease-out motion-reduce:transition-none",
        open ? "rotate-90" : "rotate-0",
        className,
      )}
    >
      <Icon
        name="plus"
        className={cn(
          "absolute transition-opacity duration-200 motion-reduce:transition-none",
          open ? "opacity-0" : "opacity-100",
        )}
      />
      <Icon
        name="minus"
        className={cn(
          "absolute transition-opacity duration-200 motion-reduce:transition-none",
          open ? "opacity-100" : "opacity-0",
        )}
      />
    </span>
  );
}
