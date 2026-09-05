import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

/**
 * PMG lockup, read straight from `public/images/Group.svg`.
 *
 * The file is the source of truth on purpose — an earlier version inlined the
 * path data so the fills could use `currentColor`, which meant swapping the
 * asset silently did nothing. Instead the artwork is recoloured with a filter:
 *
 * - `brightness(0)`            -> flattens any monochrome source to black
 * - `brightness(0) invert(1)`  -> ...and then to white
 *
 * So a replacement file just works, whatever colour or aspect ratio it has.
 * Height is fixed and width follows the file's own aspect ratio.
 */
export function Logo({
  size = "nav",
  tone = "dark",
  className,
}: {
  size?: "nav" | "footer";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    // next/image would need `dangerouslyAllowSVG` to serve this, and there is
    // nothing to optimise in a 1.5KB vector — so a plain img is the right call.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/Group.svg"
      alt={`${site.name} ${site.wordmarkSub}`}
      // shrink-0 + self-start stop a flex parent stretching the box: with
      // `w-auto` that widens it to the column and the artwork gets centred.
      className={cn(
        "block w-auto shrink-0 self-start",
        size === "nav" ? "h-[30px]" : "h-[36px]",
        className,
      )}
      style={{ filter: tone === "dark" ? "brightness(0)" : "brightness(0) invert(1)" }}
    />
  );
}
