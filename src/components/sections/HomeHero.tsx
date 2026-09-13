import Image from "next/image";
import { Decor } from "@/components/ui/Decor";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { Icon } from "@/components/ui/Icon";
import { HomeHeroStage } from "@/components/motion/stages/HomeHeroStage";
import { MaskHeading } from "@/components/motion/MaskHeading";
import { CountUp } from "@/components/motion/CountUp";

/**
 * Figma: "HF · 01 Home — Hero · OPTION B (offset panel + collage)" (88:1735).
 *
 * The 1440×900 frame places a dark panel bleeding off the right edge, one
 * tall photo straddling its left border, and the feature card overlapping the
 * photo's lower-left corner. Above `xl` that is reproduced with absolute
 * offsets measured from the frame centre (x − 720), so the photo keeps
 * straddling the panel edge at any width while the panel still bleeds to the
 * viewport edge.
 *
 * The breakpoint is `xl` (1280) rather than `lg` deliberately: below it the
 * offsets overflowed and the section's overflow-clip cut them off, so
 * everything under `xl` uses the stacked collage instead. Note browser zoom
 * shrinks the CSS viewport, so zooming in crosses this breakpoint too.
 *
 * Geometry, all relative to the panel (left `50% + 176`, y 140–760): the
 * photo starts 72px left of the panel edge and 78px below its top; the card's
 * right edge lands 155px inside the panel and its base 37px above the photo's.
 * Move the panel and every offset below has to move with it.
 */

const STATS = [
  { value: 98, unit: "%", label: "Debt collection rate" },
  { value: 10, unit: "+", label: "Consultants supported" },
  { value: 10, unit: "yrs", label: "In the UK private market" },
] as const;

/** "Every payment goes straight to you" — Figma 88:1789. */
function FeatureCard({ className, anim }: { className?: string; anim?: string }) {
  return (
    <div
      data-anim={anim}
      data-reveal={anim ? "" : undefined}
      className={`flex flex-col justify-between rounded-card-lg bg-[linear-gradient(135deg,rgba(55,128,89,0.96)_0%,rgba(83,137,124,0.84)_100%)] px-[24px] py-[22px] shadow-lg ${className ?? ""}`}
    >
      <div className="flex items-center justify-between">
        <span className="flex size-[46px] items-center justify-center rounded-chip bg-white text-[20px] font-semibold leading-none text-sage">
          £
        </span>
        <span className="flex size-[34px] items-center justify-center rounded-full border border-white/62 text-white">
          <Icon name="arrow-up-right" />
        </span>
      </div>
      <p className="text-[20px] font-semibold leading-[1.2] tracking-[-0.02em] text-white sm:text-[24px] md:text-[28px]">
        Every payment goes
        <br />
        straight to you
      </p>
    </div>
  );
}

export function HomeHero() {
  return (
    <section className="relative overflow-x-clip bg-off-white">
     <HomeHeroStage>
      {/* -- Offset panel: bleeds right, offset +176px from frame centre --- */}
      <div
        aria-hidden
        data-anim="panel"
        className="absolute right-0 top-[140px] hidden h-[620px] overflow-hidden rounded-l-[36px] bg-[#132523] xl:left-[calc(50%+176px)] xl:block"
      />

      <div className="relative mx-auto max-w-frame xl:min-h-[900px]">
        {/* -- Copy ------------------------------------------------------- */}
        <div className="relative z-10 max-w-[600px] px-6 pb-10 pt-[116px] md:px-10 md:pb-16 md:pt-[140px] lg:px-20 xl:max-w-[760px] xl:pb-[24px] xl:pt-[214px]">
          <MaskHeading
            as="h1"
            className="text-[clamp(2.5rem,6vw,60px)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink"
          >
            Complete Practice Management <span className="text-sage">Built Around You.</span>
          </MaskHeading>

          <p data-anim="copy" data-reveal="" className="mt-[28px] text-[20px] font-medium leading-[1.5] text-ink">
            More time for your patients. More control over your practice.
          </p>
          <p data-anim="copy" data-reveal="" className="mt-[10px] text-[17px] leading-[1.65] text-ink-muted">
            PMG takes care of the work behind the scenes: day-to-day operations, billing and
            collection, medical coding, embassy registration, international patient services and
            practice growth.
          </p>

          <div data-anim="copy" data-reveal="" className="mt-[36px] flex flex-wrap items-center gap-[24px]">
            <Button href="/services" size="md" iconChip="arrow-right">
              Explore All Services
            </Button>
            <TextLink href="/contact#book">Book a Conversation</TextLink>
          </div>

          <dl className="mt-[52px] flex flex-wrap gap-x-[48px] gap-y-8">
            {STATS.map((stat) => (
              <div key={stat.label} data-anim="stat" data-reveal="" className="flex flex-col gap-[8px]">
                <dt className="flex items-start gap-[3px]">
                  <CountUp value={stat.value} className="text-stat font-bold text-ink" />
                  <span className="pt-[5px] text-[15px] font-semibold leading-none text-sage">
                    {stat.unit}
                  </span>
                </dt>
                <dd className="max-w-[160px] text-[13px] font-medium leading-[1.4] text-ink-muted">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* -- Collage (desktop) ----------------------------------------- */}
        <div className="hidden xl:block">
          {/* The photo — straddles the panel edge */}
          <div data-anim="card" data-reveal="" className="absolute left-[calc(50%+104px)] top-[218px] h-[585px] w-[440px] overflow-hidden rounded-card shadow-lg">
            <Image
              src="/images/hero-surgery.webp"
              alt="A surgical team at work in theatre"
              fill
              sizes="440px"
              priority
              className="object-cover"
            />
            <Decor src="/decor/hero-glow-b.svg" className="-left-[60px] -top-[73px] h-[202px] w-[270px]" />
          </div>

          {/* Overlaps the photo's lower-left corner */}
          <FeatureCard anim="card" className="absolute left-[calc(50%-5px)] top-[570px] h-[196px] w-[336px]" />
        </div>

        {/* -- Collage (compact) -----------------------------------------
            Two 340px blocks stacked filled a phone screen on their own, so
            both shrink well below `md`, where they still sit side by side. */}
        <div className="grid gap-3 px-6 pb-10 md:grid-cols-2 md:gap-4 md:px-10 md:pb-16 xl:hidden">
          <div className="relative h-[200px] overflow-hidden rounded-card shadow-lg sm:h-[260px] md:h-[340px]">
            <Image
              src="/images/hero-surgery.webp"
              alt="A surgical team at work in theatre"
              fill
              sizes="(max-width: 768px) 100vw, 384px"
              priority
              className="object-cover"
            />
          </div>
          <FeatureCard className="h-[150px] sm:h-[190px] md:h-[340px]" />
        </div>
      </div>
     </HomeHeroStage>
    </section>
  );
}
