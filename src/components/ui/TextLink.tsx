import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Text link with the design's 1.5px rule beneath it
 * (hero "Book a Conversation"). The rule sits flush under the label.
 */
export function TextLink({
  href,
  tone = "dark",
  className,
  children,
}: {
  href: string;
  tone?: "dark" | "light";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex flex-col items-start gap-[6px] text-[16px] font-semibold leading-[1.1]",
        tone === "dark" ? "text-ink" : "text-white",
        className,
      )}
    >
      <span>{children}</span>
      <span
        aria-hidden
        className={cn(
          "h-[1.5px] w-full origin-left transition-transform duration-300 group-hover:scale-x-[1.06]",
          tone === "dark" ? "bg-ink" : "bg-white",
        )}
      />
    </Link>
  );
}
