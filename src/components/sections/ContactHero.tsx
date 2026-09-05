import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { site, telHref, mailHref } from "@/lib/site";
import { ContactForm } from "./ContactForm";
import { ContactStage } from "@/components/motion/stages/ContactStage";
import { MaskHeading } from "@/components/motion/MaskHeading";
import type { IconName } from "@/components/ui/Icon";

/** Figma: "HF · C01 Contact — Hero + form" (139:843). */
const DIRECT: { icon: IconName; label: string; value: string; href?: string }[] = [
  { icon: "phone", label: "Call us", value: site.phone, href: telHref(site.phone) },
  {
    icon: "mail",
    label: "Email us",
    value: site.email,
    href: mailHref(site.email),
  },
  // Office hours are placeholder values in the design.
  { icon: "clock", label: "Office hours", value: "[ Mon–Fri, 00:00–00:00 ]" },
];

export function ContactHero() {
  return (
    <section className="bg-off-white px-6 pb-[104px] pt-[140px] md:px-10 lg:px-[120px]">
     <ContactStage>
      <div className="mx-auto flex max-w-content flex-col gap-[56px] lg:flex-row lg:items-start lg:gap-[96px]">
        {/* -- Intro + direct contact -------------------------------- */}
        <div className="flex flex-1 flex-col gap-[36px]">
          <div className="flex flex-col gap-[26px]">
            <Eyebrow data-anim="copy" data-reveal="" className="tracking-[0.08em]">
              Contact
            </Eyebrow>
            <MaskHeading
              as="h1"
              className="max-w-[540px] text-[clamp(2.25rem,5vw,52px)] font-semibold leading-[1.06] tracking-[-0.024em] text-ink"
            >
              Let’s talk about your practice.
            </MaskHeading>
            <p data-anim="copy" data-reveal="" className="max-w-[500px] text-[18px] leading-[1.68] text-ink-muted">
              We take the time to understand your practice, the support you need and your priorities
              — then explain the services that actually fit.
            </p>
          </div>

          <dl className="flex flex-col border-t border-line">
            {DIRECT.map((row) => {
              const body = (
                <>
                  <span className="flex size-[40px] shrink-0 items-center justify-center rounded-[12px] bg-good-bg text-mint">
                    <Icon name={row.icon} />
                  </span>
                  <span className="flex flex-1 flex-col gap-[3px]">
                    <dt className="text-[12px] font-semibold leading-[1.4] tracking-[0.06em] text-ink-muted">
                      {row.label}
                    </dt>
                    <dd className="text-[17px] font-medium leading-[1.4] tracking-[-0.003em] text-ink">
                      {row.value}
                    </dd>
                  </span>
                </>
              );

              return (
                <div key={row.label} data-anim="contact-row" data-reveal="" className="border-b border-line">
                  {row.href ? (
                    <a href={row.href} className="flex items-center gap-[16px] py-[22px] transition-opacity hover:opacity-80">
                      {body}
                    </a>
                  ) : (
                    <div className="flex items-center gap-[16px] py-[22px]">{body}</div>
                  )}
                </div>
              );
            })}
          </dl>

          <ul className="flex flex-wrap gap-[24px] pt-[8px]">
            {["No obligation to proceed", "Your details stay with PMG"].map((item) => (
              <li key={item} data-anim="assure" data-reveal="" className="flex items-center gap-[9px]">
                <Icon name="shield-tick" className="text-sage" />
                <span className="text-[15px] font-medium leading-[1.4] text-ink-muted">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <ContactForm />
      </div>
     </ContactStage>
    </section>
  );
}
