import Link from "next/link";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

/**
 * "Explore …  →" link used throughout the service cards and panels.
 * 16px on dark feature cards, 15px on white cards.
 */
export function ArrowLink({
  href,
  tone = "dark",
  size = "sm",
  className,
  children,
}: {
  href: string;
  tone?: "dark" | "light" | "mint";
  size?: "sm" | "md";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-[10px] font-semibold leading-[1.1]",
        size === "sm" ? "text-[15px]" : "text-[16px]",
        tone === "dark" ? "text-ink" : tone === "light" ? "text-white" : "text-mint-light",
        className,
      )}
    >
      {children}
      <Icon
        name="arrow-narrow-right"
        className="transition-transform duration-200 group-hover:translate-x-1"
      />
    </Link>
  );
}
