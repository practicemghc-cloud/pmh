"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import type { FaqCategory } from "@/lib/faqs";
import { FaqStage } from "@/components/motion/stages/FaqStage";
import { Collapse } from "@/components/motion/Collapse";
import { ToggleIcon } from "@/components/motion/ToggleIcon";

/**
 * Figma: "HF · C03 Contact — Extended FAQs" (146:880) — a topic rail beside
 * the questions for the selected topic, with a search field above and an
 * "ask us directly" card below.
 *
 * Search filters across every topic, matching the field's intent in the design.
 *
 * Long lists are cut to `VISIBLE_STEP` with a "show more" under them — the
 * same six-row cut the home and About accordions use, so a topic with a lot in
 * it (or a broad search) opens at a readable length.
 */

const VISIBLE_STEP = 6;
export function ContactExtendedFaqs({
  categories,
  eyebrow = "Everything else",
  heading = "Answers before you ask.",
  askCard,
}: {
  categories: readonly FaqCategory[];
  eyebrow?: string;
  heading?: string;
  askCard?: { title?: string; body?: string; cta?: { label: string; href: string } };
}) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string[]>([categories[0].questions[0]?.question ?? ""]);
  /*
   * Which list the "show more" is expanded for, rather than a plain boolean:
   * switching topic or typing a search changes the key, which collapses the
   * new list back to six without an effect to reset it.
   */
  const [expandedFor, setExpandedFor] = useState<string | null>(null);

  const searching = query.trim().length > 0;

  const visible = useMemo(() => {
    if (!searching) return categories[activeCategory].questions;
    const needle = query.trim().toLowerCase();
    return categories
      .flatMap((category) => category.questions)
      .filter((faq) => faq.question.toLowerCase().includes(needle));
  }, [activeCategory, categories, query, searching]);

  const listKey = searching ? `search:${query.trim().toLowerCase()}` : categories[activeCategory].name;
  const expanded = expandedFor === listKey;
  const shown = expanded ? visible : visible.slice(0, VISIBLE_STEP);
  const hidden = visible.length - shown.length;

  const toggle = (question: string) =>
    setOpen((current) =>
      current.includes(question)
        ? current.filter((q) => q !== question)
        : [...current, question],
    );

  const category = categories[activeCategory];

  return (
    <section className="bg-off-white px-6 pt-[104px] md:px-10 lg:px-[120px]">
     <FaqStage>
      <div className="mx-auto flex max-w-content flex-col gap-[56px]">
        {/* -- Header + search --------------------------------------- */}
        <div className="flex flex-col gap-[32px] lg:flex-row lg:items-end lg:gap-[80px]">
          <div className="flex flex-1 flex-col gap-[20px]">
            <Eyebrow data-anim="head" data-reveal="" className="tracking-[0.1em]">
              {eyebrow}
            </Eyebrow>
            <h2 data-anim="head" data-reveal="" className="max-w-[620px] text-[clamp(2rem,4vw,44px)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">
              {heading}
            </h2>
          </div>
          <label data-anim="aside" data-reveal="" className="flex w-full items-center gap-[12px] rounded-full border border-field-line bg-white px-[20px] py-[16px] lg:w-[380px]">
            <Icon name="search" size={20} className="text-ink-muted" />
            <span className="sr-only">Search questions</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search questions"
              className="flex-1 bg-transparent text-[16px] leading-[1.4] text-ink placeholder:text-ink-muted focus:outline-none"
            />
          </label>
        </div>

        {/* -- Rail + questions -------------------------------------- */}
        <div className="flex flex-col gap-[40px] lg:flex-row lg:items-start lg:gap-[72px]">
          <nav aria-label="FAQ topics" className="flex flex-col gap-[4px] lg:sticky lg:top-[140px] lg:w-[268px] lg:shrink-0">
            <p className="text-[12px] font-semibold uppercase leading-[1.4] tracking-[0.08em] text-ink-muted">
              Browse by topic
            </p>
            <div className="h-[14px]" />
            {categories.map((item, index) => {
              const isActive = !searching && index === activeCategory;
              return (
                <button
                  key={item.name}
                  data-anim="head"
                  data-reveal=""
                  type="button"
                  aria-current={isActive}
                  onClick={() => {
                    setQuery("");
                    setActiveCategory(index);
                  }}
                  className={cn(
                    "flex items-center gap-[10px] rounded-[12px] px-[18px] py-[14px] text-left leading-[1.4] transition-colors duration-200",
                    isActive
                      ? "bg-surface-2 font-semibold text-sage"
                      : "font-medium text-ink-muted hover:bg-surface-2/60",
                  )}
                >
                  <span className="flex-1 text-[16px]">{item.name}</span>
                  <span className="text-[14px]">{item.plannedCount}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex flex-1 flex-col gap-[10px]">
            {shown.map((faq) => {
              const isOpen = open.includes(faq.question);
              return (
                <div
                  key={faq.question}
                  data-anim="q"
                  data-reveal=""
                  className={cn(
                    "rounded-[20px] bg-white px-[24px] py-[26px] transition-shadow duration-200 sm:px-[32px]",
                    isOpen && "shadow-sm",
                  )}
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => toggle(faq.question)}
                      className="flex w-full items-center gap-[24px] text-left"
                    >
                      <span className="flex-1 text-[19px] font-semibold leading-[1.32] tracking-[-0.006em] text-ink">
                        {faq.question}
                      </span>
                      <span className="shrink-0 text-ink-muted">
                        <ToggleIcon open={isOpen} />
                      </span>
                    </button>
                  </h3>
                  <Collapse open={isOpen}>
                    <p className="mt-[16px] text-[16px] leading-[1.68] text-ink-muted">
                      {faq.answer ?? "[ Answer to be supplied ]"}
                    </p>
                  </Collapse>
                </div>
              );
            })}

            {(hidden > 0 || expanded) && (
              <div className="pt-[6px]">
                <Button
                  variant="secondary"
                  trailingIcon={expanded ? "minus" : "plus"}
                  onClick={() => setExpandedFor(expanded ? null : listKey)}
                >
                  {expanded ? "Show fewer questions" : `Show ${hidden} more questions`}
                </Button>
              </div>
            )}

            {visible.length === 0 && (
              <p className="rounded-[20px] bg-white px-[32px] py-[26px] text-[16px] leading-[1.68] text-ink-muted">
                {searching
                  ? "No questions match that search yet."
                  : `[ ${category.plannedCount} “${category.name}” questions to be supplied ]`}
              </p>
            )}
          </div>
        </div>

        {/* -- Ask us directly -------------------------------------- */}
        <div
          className="flex flex-col items-start gap-[24px] rounded-[24px] px-[24px] py-[36px] shadow-md sm:px-[48px] sm:py-[44px] lg:flex-row lg:items-center lg:gap-[40px]"
          style={{
            backgroundImage:
              "linear-gradient(174deg, rgb(51, 96, 91) 12.857%, rgb(22, 48, 44) 57.143%, rgb(12, 25, 23) 84.286%)",
          }}
        >
          <div className="flex flex-1 flex-col gap-[8px]">
            <p className="text-[24px] font-semibold leading-[1.28] tracking-[-0.01em] text-white">
              {askCard?.title ?? "Not answered here?"}
            </p>
            <p className="max-w-[560px] text-[16px] leading-[1.6] text-on-sage">
              {askCard?.body ?? "Send it with your enquiry above and we’ll answer it on the call."}
            </p>
          </div>
          <Link
            href={askCard?.cta?.href ?? "#book"}
            className="group flex shrink-0 items-center gap-[9px] rounded-full bg-mint px-[26px] py-[16px] text-[16px] font-semibold leading-[1.4] text-ink shadow-cta transition-[filter] hover:brightness-[1.04]"
          >
            {askCard?.cta?.label ?? "Ask your question"}
            <Icon
              name="arrow-narrow-right"
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="h-[104px]" />
      </div>
     </FaqStage>
    </section>
  );
}
