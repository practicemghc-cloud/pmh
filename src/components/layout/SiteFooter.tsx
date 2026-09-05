import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";
import { telHref, mailHref, type Service } from "@/lib/site";
import type { SocialLink } from "../../../sanity/content";

/**
 * Figma: "HF · 08 Home — Footer" (88:2283) — reused verbatim on About,
 * Services and Contact. ink-deep ground, an oversized 5%-opacity "PMG"
 * watermark bleeding off the left edge, four columns, then a legal bar.
 */
type FooterSite = {
  description: string;
  email: string;
  phone: string;
  copyright: string;
};

type FooterColumn = {
  heading: string;
  width: string;
  links: readonly { label: string; href: string | null }[];
};

/** Human-readable names, so the icons still announce themselves to screen readers. */
const PLATFORM_LABEL: Record<SocialLink["platform"], string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  x: "X",
  youtube: "YouTube",
};

export function SiteFooter({
  site,
  columns,
  socialLinks = [],
}: {
  site: FooterSite;
  columns: readonly FooterColumn[];
  /** Rendered as icons under the contact details. Empty hides the row entirely. */
  socialLinks?: readonly SocialLink[];
  /** Accepted for symmetry with the nav; the SERVICES column is built upstream. */
  services?: readonly Service[];
}) {
  return (
    <footer className="relative bg-ink-deep">
      <div className="relative mx-auto flex max-w-frame flex-col justify-between gap-16 px-6 pb-[36px] pt-[88px] md:px-10 lg:px-20">
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:gap-8">
          {/* -- Brand ------------------------------------------------- */}
          <div className="flex w-full max-w-[360px] flex-col gap-[20px]">
            <Logo size="footer" tone="light" />
            <p className="text-[15px] leading-[1.7] text-pastel">{site.description}</p>
            <div className="flex flex-col gap-[12px]">
              <a
                href={mailHref(site.email)}
                className="flex items-center gap-[10px] text-[15px] font-medium leading-[1.4] text-white transition-colors hover:text-mint-light"
              >
                <Icon name="mail" className="text-mint" />
                {site.email}
              </a>
              <a
                href={telHref(site.phone)}
                className="flex items-center gap-[10px] text-[15px] font-medium leading-[1.4] text-white transition-colors hover:text-mint-light"
              >
                <Icon name="phone" className="text-mint" />
                {site.phone}
              </a>
            </div>

            {socialLinks.length > 0 && (
              <ul className="flex flex-wrap items-center gap-[10px] pt-[4px]">
                {socialLinks.map((link) => (
                  <li key={link.platform}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`PMG on ${PLATFORM_LABEL[link.platform]}`}
                      className="flex size-[38px] items-center justify-center rounded-full bg-white/8 text-pastel transition-colors duration-200 hover:bg-white/16 hover:text-white"
                    >
                      <Icon name={link.platform} size={18} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* -- Link columns ------------------------------------------ */}
          <div className="flex flex-wrap gap-12 lg:flex-nowrap lg:gap-8">
            {columns.map((column) => (
              <nav
                key={column.heading}
                aria-label={column.heading}
                className={`flex flex-col gap-[16px] ${column.width}`}
              >
                <p className="text-eyebrow font-semibold uppercase text-mint">{column.heading}</p>
                {column.links.map((link) =>
                  link.href ? (
                    <Link
                      key={link.label}
                      href={link.href}
                      // Hash links are scrolled by SmoothScroll (eased, and
                      // offset for the fixed nav). Next's own instant jump
                      // would land first and fight it.
                      scroll={!link.href.includes("#")}
                      className="text-[15px] leading-[1.5] text-pastel transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    // No route yet — plain text beats a link that goes nowhere.
                    <span key={link.label} className="text-[15px] leading-[1.5] text-pastel">
                      {link.label}
                    </span>
                  ),
                )}
              </nav>
            ))}
          </div>
        </div>

        {/* -- Legal bar ----------------------------------------------- */}
        <div className="flex flex-col gap-[24px]">
          <div className="h-px w-full bg-white/12" />
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-[14px] leading-[1.5] text-pastel">{site.copyright}</p>
            <a
              href="#top"
              className="flex items-center gap-[8px] text-[14px] font-medium leading-[1.5] text-white transition-colors hover:text-mint-light"
            >
              Back to top
              <Icon name="chevron-down" className="rotate-180 text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
