import { Icon } from "@/components/ui/Icon";
import { site, waHref } from "@/lib/site";

/**
 * Floating "chat on WhatsApp" button, present on every page of the site.
 *
 * Bottom-right, clear of the footer's own padding, and above the fixed nav's
 * stacking (`z-50`) so it stays reachable while the nav is over content. The
 * label expands on hover and focus on pointer screens; on touch it stays a
 * circle, where there is least room to spare.
 *
 * Server component on purpose — it is a plain link, and the pulse is CSS, so
 * nothing here needs to ship as client JS.
 */

const MESSAGE = `Hello ${site.name}, I'd like to ask about your practice management services.`;

export function WhatsAppButton() {
  return (
    <div
      // `safe-area-inset-bottom` keeps the disc clear of a phone's home
      // indicator and the browser's own bottom bar, which was cutting it off.
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)" }}
      className="wa-dock fixed right-6 z-[60] print:hidden md:right-8"
    >
      {/* Expanding rings — behind the button, never clickable. */}
      <span
        aria-hidden
        className="wa-ring pointer-events-none absolute bottom-0 right-0 size-[60px] rounded-full bg-[#25d366]"
      />
      <span
        aria-hidden
        className="wa-ring wa-ring-delayed pointer-events-none absolute bottom-0 right-0 size-[60px] rounded-full bg-[#25d366]"
      />

      <a
        href={waHref(site.whatsapp, MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with ${site.name} on WhatsApp — ${site.whatsapp}`}
        className="wa-breathe group relative flex size-[60px] items-center justify-center overflow-hidden rounded-full bg-[#25d366] text-white shadow-lg transition-[width,background-color] duration-300 ease-out hover:bg-[#1eb555] focus-visible:bg-[#1eb555] md:w-[60px] md:justify-start md:pl-[18px] md:hover:w-[196px] md:focus-visible:w-[196px]"
      >
        <Icon name="whatsapp" size={26} className="shrink-0" />
        <span className="hidden whitespace-nowrap pl-[12px] text-[15px] font-semibold opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 md:block">
          Chat with us
        </span>
      </a>
    </div>
  );
}
