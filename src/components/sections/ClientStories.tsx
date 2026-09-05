"use client";

import { Decor } from "@/components/ui/Decor";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { defaultStoryIndex, type ClientStory } from "@/lib/stories";
import { AvatarRailStage } from "@/components/motion/stages/AvatarRailStage";

/**
 * Figma: "HF · 04 Home — Client stories" (88:2085).
 *
 * The avatar selector scales each face by its distance from the active one
 * (92 → 74 → 66 → 58 → 48px, with matching opacity and fill), and the
 * neighbouring stories peek in from either side at 34% opacity.
 */

/** Avatar treatment per |index − active|, read off the frame. */
const RING = [
  { size: 92, text: 20, fill: "bg-mint", opacity: "opacity-100" },
  { size: 74, text: 19, fill: "bg-pastel", opacity: "opacity-80" },
  { size: 66, text: 17, fill: "bg-mint-light", opacity: "opacity-62" },
  { size: 58, text: 15, fill: "bg-pastel", opacity: "opacity-45" },
  { size: 48, text: 12, fill: "bg-sage-tint", opacity: "opacity-28" },
] as const;

/** 13 hairline column rules at the frame's 108.67px pitch, starting at x=80. */
const COLUMN_RULES = Array.from({ length: 13 }, (_, i) => 80 + i * (1304 / 12));

function StoryCard({ story, variant }: { story: ClientStory; variant: "active" | "dimmed" }) {
  const isActive = variant === "active";

  return (
    <article
      className={cn(
        "flex gap-[22px] rounded-[26px] p-[26px] backdrop-blur-[8px]",
        isActive
          ? "h-full border border-mint bg-[rgba(11,25,23,0.46)]"
          : "h-full border border-white/10 bg-[rgba(11,25,23,0.4)]",
      )}
    >
      {/* -- Rail: practice type ---------------------------------- */}
      <div className="hidden h-full w-[168px] shrink-0 flex-col justify-between md:flex">
        <p className="flex items-center gap-[8px] text-[14px] font-medium leading-[1.3] text-on-sage">
          <Icon name="asterisk" className="text-mint" />
          Practice type
        </p>
        <ul className="flex flex-wrap gap-[8px]">
          {story.chips.map((chip) => (
            <li
              key={chip}
              className="rounded-full bg-white/10 px-[13px] py-[8px] text-[13px] font-medium leading-[1.2] text-on-sage"
            >
              {chip}
            </li>
          ))}
        </ul>
      </div>

      {/* -- Quote card ------------------------------------------- */}
      <div className="flex h-full flex-1 flex-col justify-between gap-4 rounded-[20px] bg-[rgba(6,17,15,0.45)] p-[24px]">
        <div className="flex items-center gap-[14px]">
          <span className="flex size-[48px] shrink-0 items-center justify-center rounded-full bg-pastel text-[16px] font-semibold leading-none text-sage-dark">
            {story.initials}
          </span>
          <span className="flex flex-1 flex-col gap-[3px]">
            <span className="text-[19px] font-semibold leading-[1.25] tracking-[-0.01em] text-white">
              {story.name}
            </span>
            <span className="text-[14px] leading-[1.4] text-on-sage">{story.meta}</span>
          </span>
        </div>

        <div className="flex items-center gap-[10px]">
          <span className="flex items-center gap-[4px] text-mint">
            {Array.from({ length: 5 }, (_, i) => (
              <Icon key={i} name="star-filled" />
            ))}
          </span>
          <span className="text-[16px] font-semibold leading-[1.2] text-white">{story.rating}</span>
        </div>

        <blockquote className="text-[16px] leading-[1.68] text-white">{story.quote}</blockquote>
      </div>
    </article>
  );
}

export function ClientStories({ stories }: { stories: readonly ClientStory[] }) {
  const total = stories.length;
  // The design highlights the middle face; keep that if the list length changes.
  const [active, setActive] = useState(Math.min(defaultStoryIndex, Math.max(total - 1, 0)));

  const go = (delta: number) => setActive((i) => (i + delta + total) % total);
  const prevIndex = (active - 1 + total) % total;
  const nextIndex = (active + 1) % total;

  return (
    <section
      className="relative overflow-x-clip"
      style={{
        backgroundImage:
          "linear-gradient(149.67deg, rgb(57, 101, 94) 12.857%, rgb(29, 53, 50) 55.714%, rgb(15, 30, 28) 84.286%)",
      }}
    >
     <AvatarRailStage>
      {/* -- Decorative glow + column rules -------------------------- */}
      <Decor src="/decor/client-stories-glow.svg" className="left-[19%] top-[-31%] h-[57%] w-[62%]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 mx-auto max-w-frame">
        {COLUMN_RULES.map((left) => (
          <span
            key={left}
            data-anim="rule"
            className="absolute top-0 h-full w-px bg-white opacity-5"
            style={{ left: `${(left / 1440) * 100}%` }}
          />
        ))}
      </div>

      <div className="relative mx-auto flex max-w-frame flex-col items-center px-6 pb-[60px] pt-[100px] md:px-10 lg:px-20">
        <p data-anim="head" data-reveal="" className="text-[13px] font-semibold uppercase leading-[1.2] tracking-[0.14em] text-white">
          Client stories
        </p>
        <h2 data-anim="head" data-reveal="" className="mt-[24px] text-center text-[clamp(2rem,5vw,54px)] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
          What consultants say
        </h2>
        <p data-anim="head" data-reveal="" className="mt-[30px] max-w-[720px] text-center text-[18px] leading-[1.65] text-on-sage">
          Independent consultants and private healthcare providers on what changed when PMG took
          over the work behind the practice.
        </p>

        {/* -- Avatar selector -------------------------------------- */}
        <div
          role="tablist"
          aria-label="Client stories"
          className="mt-[24px] flex h-[111px] max-w-full items-center gap-[22px] overflow-x-auto px-2"
        >
          {stories.map((story, index) => {
            const ring = RING[Math.min(Math.abs(index - active), RING.length - 1)];
            const isActive = index === active;

            return (
              <button
                key={story.initials}
                data-anim="avatar"
                data-reveal=""
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Story ${index + 1} of ${total} — ${story.initials}`}
                onClick={() => setActive(index)}
                className={cn(
                  "flex shrink-0 items-center justify-center rounded-full font-semibold leading-none text-sage-dark transition-all duration-300",
                  ring.fill,
                  ring.opacity,
                  isActive && "border-[2.5px] border-mint",
                )}
                style={{ width: ring.size, height: ring.size, fontSize: ring.text }}
              >
                {story.initials}
              </button>
            );
          })}
        </div>

        {/* -- Stories: active centred, neighbours peeking ---------- */}
        <div data-anim="story" data-reveal="" className="mt-[50px] w-full">
          {/* Desktop: three-up with bleed */}
          <div className="relative hidden h-[400px] w-full xl:block">
            <div
              aria-hidden
              className="absolute right-[calc(50%+358px)] top-[22px] h-[356px] w-[520px] opacity-34"
            >
              <StoryCard story={stories[prevIndex]} variant="dimmed" />
            </div>
            <div className="absolute left-1/2 top-0 z-10 h-[400px] w-[700px] -translate-x-1/2">
              <StoryCard story={stories[active]} variant="active" />
            </div>
            <div
              aria-hidden
              className="absolute left-[calc(50%+358px)] top-[22px] h-[356px] w-[520px] opacity-34"
            >
              <StoryCard story={stories[nextIndex]} variant="dimmed" />
            </div>
          </div>

          {/* Compact: active only */}
          <div className="mx-auto min-h-[400px] w-full max-w-[700px] xl:hidden">
            <StoryCard story={stories[active]} variant="active" />
          </div>
        </div>

        {/* -- Controls --------------------------------------------- */}
        <div data-anim="controls" data-reveal="" className="mt-[48px] flex items-center gap-[12px]">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous story"
            className="flex size-[52px] items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <Icon name="arrow-narrow-left" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next story"
            className="flex size-[52px] items-center justify-center rounded-full bg-mint text-ink transition-[filter] hover:brightness-[1.04]"
          >
            <Icon name="arrow-narrow-right" />
          </button>
        </div>

        <p className="mt-[28px] max-w-[720px] text-center text-[12px] leading-[1.4] text-on-sage opacity-55">
          Placeholder content — names, roles, ratings and quotes all await approved client stories.
        </p>
      </div>
     </AvatarRailStage>
    </section>
  );
}
