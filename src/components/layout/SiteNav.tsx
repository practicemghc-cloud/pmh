"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { NavLink, Service } from "@/lib/site";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ServicesMegaMenu } from "./ServicesMegaMenu";

/**
 * Figma: "W / Nav — Floating" (37:362).
 * Component description: "Floating pill navigation. Sits 24px inset from the
 * top of the viewport, centred, over any background. Active link carries a
 * surface-2 pill. Primary CTA mint, secondary outlined."
 *
 * The design file only specifies the 1440 breakpoint, so the compact
 * (< lg) treatment — a menu toggle and a stacked panel — is an extension of
 * the desktop design rather than a frame traced from Figma.
 *
 * Width: the pill shares the sections' gutters and `max-w-content` so its
 * edges align with the content beneath it. Figma insets the nav 32px against
 * an 80px content gutter, i.e. slightly wider than the content — that reads as
 * a misalignment once the content column is 1600 wide, so alignment wins.
 */
type Cta = { label: string; href: string };

export function SiteNav({
  links,
  primaryCta,
  services,
}: {
  links: readonly NavLink[];
  primaryCta: Cta;
  services: readonly Service[];
}) {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!megaOpen && !mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [megaOpen, mobileOpen]);

  const closeAll = () => {
    setMegaOpen(false);
    setMobileOpen(false);
  };

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };

  // Small grace period so the pointer can cross the gap to the panel.
  const scheduleCloseMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 120);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-6 z-50 px-4 md:px-10 lg:px-20">
      <div className="mx-auto max-w-content">
      <nav
        aria-label="Main"
        className="flex items-center justify-between rounded-full bg-white px-[20px] py-[14px] shadow-nav"
      >
        <Link href="/" aria-label="PMG Healthcare — home" className="shrink-0">
          <Logo />
        </Link>

        {/* -- Desktop links -------------------------------------------- */}
        <ul className="hidden items-center gap-[4px] lg:flex">
          {links.map((link) => {
            const active = isActive(link.href);

            if (link.hasMegaMenu) {
              return (
                <li key={link.href} onMouseEnter={openMega} onMouseLeave={scheduleCloseMega}>
                  <Link
                    href={link.href}
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                    onFocus={openMega}
                    onClick={closeAll}
                    className={cn(
                      "flex items-center gap-[6px] rounded-full py-[12px] pl-[18px] pr-[15px] text-[15px] leading-[1.1] text-ink transition-colors duration-200",
                      active ? "bg-surface-2 font-semibold" : "font-medium hover:bg-surface-2/70",
                    )}
                  >
                    {link.label}
                    <Icon
                      name="chevron-down"
                      className={cn(
                        "text-ink-muted transition-transform duration-200",
                        megaOpen && "rotate-180",
                      )}
                    />
                  </Link>
                </li>
              );
            }

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeAll}
                  className={cn(
                    "flex items-center rounded-full px-[18px] py-[12px] text-[15px] leading-[1.1] text-ink transition-colors duration-200",
                    active ? "bg-surface-2 font-semibold" : "font-medium hover:bg-surface-2/70",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* -- Desktop actions ------------------------------------------ */}
        <div className="hidden items-center gap-[10px] lg:flex">
          <Button href={primaryCta.href} onClick={closeAll}>
            {primaryCta.label}
          </Button>
        </div>

        {/* -- Compact toggle ------------------------------------------- */}
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="flex size-[44px] items-center justify-center rounded-full bg-surface-2 lg:hidden"
        >
          <span className="flex flex-col gap-[5px]">
            <span
              className={cn(
                "block h-[1.75px] w-[18px] rounded-full bg-ink transition-transform duration-200",
                mobileOpen && "translate-y-[6.75px] rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-[1.75px] w-[18px] rounded-full bg-ink transition-opacity duration-200",
                mobileOpen && "opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-[1.75px] w-[18px] rounded-full bg-ink transition-transform duration-200",
                mobileOpen && "-translate-y-[6.75px] -rotate-45",
              )}
            />
          </span>
        </button>
      </nav>

      {/* -- Services mega menu (desktop) ------------------------------- */}
      {megaOpen && (
        <div
          className="mt-[12px] hidden lg:block"
          onMouseEnter={openMega}
          onMouseLeave={scheduleCloseMega}
        >
          <ServicesMegaMenu services={services} onNavigate={closeAll} />
        </div>
      )}

      {/* -- Compact panel --------------------------------------------- */}
      {mobileOpen && (
        <div className="mt-[12px] flex flex-col gap-4 rounded-[28px] bg-white p-6 shadow-lg lg:hidden">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block border-b border-line/60 py-3 text-[17px] text-ink",
                    isActive(link.href) ? "font-semibold" : "font-medium",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-[10px]">
            <Button href={primaryCta.href} className="w-full">
              {primaryCta.label}
            </Button>
          </div>
        </div>
      )}
      </div>
    </header>
  );
}
