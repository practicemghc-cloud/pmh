import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Decorative artwork exported from Figma — the blurred mint glows and the CTA
 * arc motif. All are `preserveAspectRatio="none"` in the export, i.e. they are
 * meant to stretch to whatever box the design gives them, so they use `fill`
 * inside a positioned wrapper rather than intrinsic width/height.
 *
 * Always aria-hidden: none of these carry meaning.
 */
export function Decor({
  src,
  className,
  anim,
}: {
  src: string;
  className?: string;
  /** Optional `data-anim` hook so a section timeline can move the artwork. */
  anim?: string;
}) {
  return (
    <span
      aria-hidden
      data-anim={anim}
      className={cn("pointer-events-none absolute block", className)}
    >
      <Image src={src} alt="" fill sizes="100vw" className="object-fill" />
    </span>
  );
}
