import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { Service } from "@/lib/site";

/**
 * Figma: "Mega menu · Services" (133:805) — 40px padding, 28px gap, a
 * 3-column grid of service tiles plus a sage promo cell in the last one.
 * Sits 12px below the floating nav and matches its 1376px width.
 *
 * The frame drew five tiles; the menu renders whatever the services list
 * holds, so the eight the site now offers fill three clean rows with the promo
 * cell closing the grid. Adding a ninth service leaves a gap beside the promo
 * — that is the point at which the grid needs revisiting, not before.
 */
export function ServicesMegaMenu({
  services,
  onNavigate,
}: {
  services: readonly Service[];
  onNavigate?: () => void;
}) {
  return (
    <div className="flex flex-col gap-[28px] rounded-[28px] bg-white p-[40px] shadow-lg">
      <Eyebrow className="tracking-[0.1em]">What we handle</Eyebrow>

      <div className="grid grid-cols-3 gap-[16px]">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/services#${service.slug}`}
            onClick={onNavigate}
            scroll={false}
            className="flex items-start gap-[16px] rounded-[18px] p-[20px] transition-colors duration-200 hover:bg-surface-2"
          >
            <span className="flex size-[44px] shrink-0 items-center justify-center rounded-[13px] bg-good-bg text-sage">
              <Icon name={service.icon} />
            </span>
            <span className="flex flex-col gap-[6px]">
              <span className="text-[17px] font-semibold leading-[1.32] tracking-[-0.004em] text-ink">
                {service.name}
              </span>
              <span className="text-[14px] leading-[1.52] text-ink-muted">{service.blurb}</span>
            </span>
          </Link>
        ))}

        <Link
          href="/services"
          onClick={onNavigate}
          className="group flex flex-col gap-[10px] rounded-[18px] bg-sage p-[24px] transition-colors duration-200 hover:bg-sage-tint"
        >
          <span className="text-[17px] font-semibold leading-[1.32] tracking-[-0.004em] text-white">
            Complete practice management
          </span>
          <span className="text-[14px] leading-[1.52] text-on-sage">
            Let us take care of what happens behind the scenes.
          </span>
          <span className="flex items-center gap-[8px] pt-[6px] text-[14px] font-semibold leading-[1.4] text-mint-light">
            See all services
            <Icon
              name="arrow-narrow-right"
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </span>
        </Link>
      </div>
    </div>
  );
}
