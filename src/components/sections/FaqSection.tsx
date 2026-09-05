"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import type { Faq } from "@/lib/faqs";
import { FaqStage } from "@/components/motion/stages/FaqStage";
import { MaskHeading } from "@/components/motion/MaskHeading";
import { Collapse } from "@/components/motion/Collapse";
import { ToggleIcon } from "@/components/motion/ToggleIcon";

/**
 * Figma: "HF · 06 Home — FAQs" (88:2209) — a 420px intro column carrying the
 * "talk to a person" card, beside a flexible accordion. The frame shows the
 * first two rows expanded, which is the default here.
 */
export function FaqSection({
  heading = "Questions consultants ask",
  intro = "If yours isn’t here, the fastest way to an answer is a short call. There’s no obligation and no script.",
  items,
  defaultOpen = [0, 1],
}: {
  heading?: string;
  intro?: string;
  items: Faq[];
  defaultOpen?: number[];
}) {
  const [open, setOpen] = useState<number[]>(defaultOpen);
  const baseId = useId();

  const toggle = (index: number) =>
    setOpen((current) =>
      current.includes(index) ? current.filter((i) => i !== index) : [...current, index],
    );

  return (
    <section className="bg-off-white px-6 py-[96px] md:px-10 lg:px-20 lg:py-[128px]">
     <FaqStage>
      <div className="mx-auto flex max-w-content flex-col items-start gap-[48px] lg:flex-row lg:gap-[80px]">
        {/* -- Intro + "talk to a person" card ------------------------- */}
        <div className="flex w-full flex-col gap-[24px] lg:w-[420px] lg:shrink-0">
          <MaskHeading className="text-[clamp(2rem,4vw,46px)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">
            {heading}
          </MaskHeading>
          <p data-anim="head" data-reveal="" className="text-[17px] leading-[1.7] text-ink-muted">{intro}</p>

          <div
            data-anim="aside"
            data-reveal=""
            className="flex flex-col items-start gap-[18px] rounded-[24px] p-[32px] shadow-md"
            style={{
              backgroundImage:
                "linear-gradient(142.52deg, rgb(49, 84, 79) 14.286%, rgb(21, 39, 36) 85.714%)",
            }}
          >
            <div className="flex">
              {["JM", "AK"].map((initials, index) => (
                <span
                  key={initials}
                  className={cn(
                    "flex size-[40px] items-center justify-center rounded-full border-[2.5px] border-[#2a4a46] bg-pastel text-[12px] font-semibold leading-none text-sage-dark",
                    index > 0 && "-ml-[9px]",
                  )}
                >
                  {initials}
                </span>
              ))}
            </div>
            <h3 className="text-[24px] font-semibold leading-[1.25] tracking-[-0.01em] text-white">
              Still have a question?
            </h3>
            <p className="text-[15px] leading-[1.65] text-on-sage">
              You’ll speak to someone who has worked inside private practices — not a call centre.
            </p>
            <Button href="/contact#book" leadingIcon="calendar" className="pl-[22px] pr-[26px] py-[14px]">
              Book a call
            </Button>
            <p className="flex items-center gap-[10px] text-[14px] font-medium leading-[1.4] text-on-sage">
              <Icon name="phone" className="text-mint" />
              {site.phone}  ·  Mon–Fri, 9:00–17:30
            </p>
          </div>
        </div>

        {/* -- Accordion ---------------------------------------------- */}
        <div className="flex w-full flex-1 flex-col gap-[12px]">
          {items.map((item, index) => {
            const isOpen = open.includes(index);
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;

            return (
              <div
                key={item.question}
                data-anim="q"
                data-reveal=""
                className={cn(
                  "rounded-[20px] bg-white py-[24px] pl-[28px] pr-[24px] transition-shadow duration-200",
                  isOpen ? "shadow-sm" : "shadow-xs",
                )}
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <span className="flex-1 text-[19px] font-semibold leading-[1.4] text-ink">
                      {item.question}
                    </span>
                    <span
                      className={cn(
                        "flex size-[40px] shrink-0 items-center justify-center rounded-full text-ink-muted transition-colors duration-300",
                        isOpen ? "bg-surface-2" : "bg-off-white",
                      )}
                    >
                      <ToggleIcon open={isOpen} />
                    </span>
                  </button>
                </h3>
                <Collapse open={isOpen}>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="pt-[14px]"
                  >
                    <p className="text-[16px] leading-[1.72] text-ink-muted">
                      {item.answer ?? "[ Answer to be supplied ]"}
                    </p>
                  </div>
                </Collapse>
              </div>
            );
          })}
        </div>
      </div>
     </FaqStage>
    </section>
  );
}
