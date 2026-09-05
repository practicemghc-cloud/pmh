import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { Service } from "@/lib/site";
import { ServicesIndexStage } from "@/components/motion/stages/ServicesIndexStage";
import { MaskHeading } from "@/components/motion/MaskHeading";

/** Figma: "HF · S01 Services — Hero" (129:741). */
export function ServicesHero({ services }: { services: readonly Service[] }) {
  return (
    <section className="bg-off-white px-6 pb-[96px] pt-[140px] md:px-10 lg:px-[120px]">
     <ServicesIndexStage>
      <div className="mx-auto flex max-w-content flex-col gap-[48px] lg:flex-row lg:items-start lg:gap-[80px]">
        {/* -- Copy ------------------------------------------------- */}
        <div className="flex flex-1 flex-col items-start gap-[28px]">
          <Eyebrow data-anim="copy" data-reveal="" className="tracking-[0.08em]">
            Services
          </Eyebrow>
          <MaskHeading
            as="h1"
            className="max-w-[620px] text-[clamp(2.25rem,5vw,56px)] font-semibold leading-[1.06] tracking-[-0.024em] text-ink"
          >
            Private practice management services.
          </MaskHeading>
          <p data-anim="copy" data-reveal="" className="max-w-[560px] text-[18px] leading-[1.68] text-ink-muted">
            Between patient calls, clinic schedules, insurer requirements, invoices and outstanding
            payments, the work can continue long after your clinic ends. Let us take care of what
            happens behind the scenes.
          </p>
          <Button href="/contact#book" size="md" className="px-[30px] py-[17px]" data-anim="copy" data-reveal="">
            Book a conversation
          </Button>
        </div>

        {/* -- Service index ---------------------------------------- */}
        <nav aria-label="Services index" className="w-full lg:w-[460px] lg:shrink-0 lg:pt-[6px]">
          <ul>
            <li aria-hidden data-anim="rule" className="h-px w-full bg-line" />
            {services.map((service, index) => (
              <li key={service.slug} data-anim="index-row" data-reveal="" className="border-b border-line">
                <Link
                  href={`/services#${service.slug}`}
                  className="group flex items-center gap-[20px] py-[22px]"
                >
                  <span className="w-[24px] shrink-0 text-[13px] font-semibold leading-[1.4] tracking-[0.06em] text-sage">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-[19px] font-medium leading-[1.3] tracking-[-0.005em] text-ink">
                    {service.name}
                  </span>
                  <Icon
                    name="arrow-narrow-right"
                    className="text-ink transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
     </ServicesIndexStage>
    </section>
  );
}
