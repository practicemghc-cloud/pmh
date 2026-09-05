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
 * The 1440×900 frame places a dark panel bleeding off the right edge with a
 * photo collage straddling its left border. Above `xl` the collage is
 * reproduced with absolute offsets measured from the frame centre (x − 720),
 * so Photo A keeps straddling the panel edge at any width while the panel
 * still bleeds to the viewport edge.
 *
 * The breakpoint is `xl` (1280) rather than `lg` deliberately: the rightmost
 * cards end at `50% + 640px`, which only fits inside the stage once the
 * viewport reaches 1280 — below that they overflowed and the section's
 * overflow-hidden clipped them. Everything under `xl` uses the stacked
 * collage instead. Note browser zoom shrinks the CSS viewport, so zooming in
 * crosses this breakpoint too.
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
      className={`flex flex-col justify-between rounded-card-lg bg-gradient-to-b from-[#378059] to-[#4e7f7a] px-[24px] py-[22px] shadow-lg ${className ?? ""}`}
    >
      <div className="flex items-center justify-between">
        <span className="flex size-[46px] items-center justify-center rounded-chip bg-white text-[20px] font-semibold leading-none text-sage">
          £
        </span>
        <span className="flex size-[34px] items-center justify-center rounded-full border border-white/62 text-white">
          <Icon name="arrow-up-right" />
        </span>
      </div>
      <p className="text-[20px] font-semibold leading-[1.25] tracking-[-0.01em] text-white">
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
      {/* -- Offset panel: bleeds right, offset +140px from frame centre --- */}
      <div
        aria-hidden
        data-anim="panel"
        className="absolute right-0 top-[144px] hidden h-[755px] overflow-hidden rounded-l-[36px] xl:left-[calc(50%+140px)] xl:block"
        style={{
          backgroundImage: "linear-gradient(37deg, #31544F 0%, #132523 100%)",
        }}
      >
        <div className="absolute -left-[120px] -top-[140px] size-[460px] rounded-full bg-mint/16 blur-[50px]" />
      </div>

      <div className="relative mx-auto max-w-frame xl:min-h-[900px]">
        {/* -- Copy ------------------------------------------------------- */}
        <div className="relative z-10 max-w-[600px] px-6 pb-16 pt-[140px] md:px-10 lg:px-20 xl:max-w-[760px] xl:pb-[24px] xl:pt-[214px]">
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
            Operations, billing and collection, medical coding, embassy registration and practice
            growth — handled side by side with you.
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
          {/* Photo A — straddles the panel edge */}
          <div data-anim="card" data-reveal="" className="absolute left-[calc(50%+64px)] top-[196px] h-[330px] w-[248px] overflow-hidden rounded-card shadow-lg">
            <Image
              src="/images/hero-consultant-with-patient.webp"
              alt="A consultant reviewing notes with a patient"
              fill
              sizes="248px"
              priority
              className="object-cover"
            />
            <Decor src="/decor/hero-glow-a.svg" className="-left-[50px] -top-[59px] h-[165px] w-[223px]" />
          </div>

          {/* Photo B */}
          <div data-anim="card" data-reveal="" className="absolute left-[calc(50%+340px)] top-[216px] h-[404px] w-[300px] overflow-hidden rounded-card shadow-lg">
            <Image
              src="/images/hero-surgery.webp"
              alt="A surgical team at work in theatre"
              fill
              sizes="300px"
              className="object-cover"
            />
            <Decor src="/decor/hero-glow-b.svg" className="-left-[60px] -top-[73px] h-[202px] w-[270px]" />
          </div>

          {/* Photo C — with caption */}
          <div data-anim="card" data-reveal="" className="absolute left-[calc(50%+340px)] top-[652px] h-[204px] w-[300px] overflow-hidden rounded-card shadow-lg">
            <Image
              src="/images/hero-paperwork.webp"
              alt="Invoices and statements beside a laptop"
              fill
              sizes="300px"
              className="object-cover"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/25 to-black/10"
            />
            <Decor src="/decor/hero-glow-c.svg" className="-left-[60px] -top-[37px] h-[102px] w-[270px]" />
            <p className="absolute left-[20px] top-[30px] text-[17px] font-semibold leading-[1.35] tracking-[-0.01em]">
              <span className="block text-white">Nothing hidden.</span>
              <span className="block text-mint-light">Every balance, live.</span>
            </p>
          </div>

          <FeatureCard anim="card" className="absolute left-[calc(50%-8px)] top-[576px] h-[180px] w-[336px]" />
        </div>

        {/* -- Collage (compact) ----------------------------------------- */}
        <div className="grid gap-4 px-6 pb-16 md:grid-cols-2 md:px-10 xl:hidden">
          <div className="relative h-[280px] overflow-hidden rounded-card shadow-lg md:col-span-2">
            <Image
              src="/images/hero-consultant-with-patient.webp"
              alt="A consultant reviewing notes with a patient"
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              priority
              className="object-cover"
            />
          </div>
          <div className="relative h-[240px] overflow-hidden rounded-card shadow-lg">
            <Image
              src="/images/hero-surgery.webp"
              alt="A surgical team at work in theatre"
              fill
              sizes="(max-width: 768px) 100vw, 384px"
              className="object-cover"
            />
          </div>
          <FeatureCard className="h-[240px]" />
        </div>
      </div>
     </HomeHeroStage>
    </section>
  );
}
