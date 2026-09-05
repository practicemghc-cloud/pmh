import { cn } from "@/lib/cn";

/**
 * Small uppercase section label — 12px / semibold / 0.12em tracking.
 * Sage on light surfaces, mint on dark ones.
 *
 * Extra props are forwarded to the element so section timelines can hook it
 * with `data-anim` (TypeScript lets hyphenated JSX attributes through
 * unchecked, so without this spread they would be silently dropped).
 */
export function Eyebrow({
  tone = "sage",
  className,
  children,
  ...rest
}: {
  tone?: "sage" | "mint";
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<"p">, "children" | "className">) {
  return (
    <p
      className={cn(
        "text-eyebrow font-semibold uppercase",
        tone === "sage" ? "text-sage" : "text-mint",
        className,
      )}
      {...rest}
    >
      {children}
    </p>
  );
}
