import Image from "next/image";
import { Decor } from "@/components/ui/Decor";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { AboutHeroStage } from "@/components/motion/stages/AboutHeroStage";
import { MaskHeading } from "@/components/motion/MaskHeading";
import { CountUp } from "@/components/motion/CountUp";

/**
 * Figma: "HF · A01 About — Hero" (96:138).
 *
 * A 620×760 photo bleeds off the left edge (x = −150) with rounded right
 * corners only; the copy column sits to its right.
 */

const CREDENTIALS = [
  { value: 10, unit: "yrs", label: "In the UK private market" },
  { value: 10, unit: "+", label: "Consultants supported" },
  { value: 98, unit: "%", label: "Debt collection rate" },
] as const;

export function AboutHero() {
  return (
    <section className="relative overflow-x-clip bg-off-white">
     <AboutHeroStage>
      <div className="relative mx-auto max-w-frame lg:min-h-[1020px]">
        {/* -- Photo bleeding off the left edge ---------------------- */}
        <div
          data-anim="photo"
          className="relative h-[320px] overflow-hidden rounded-r-[36px] shadow-lg sm:h-[420px] lg:absolute lg:left-[-10.42%] lg:top-[150px] lg:h-[760px] lg:w-[43.06%]"
          style={{
            backgroundImage:
              "linear-gradient(129deg, rgb(94, 144, 137) 14.286%, rgb(51, 96, 91) 53.571%, rgb(16, 31, 29) 85.714%)",
          }}
        >
          <Image
            data-anim="photo-inner"
            src="/images/about-consultation-lounge.webp"
            alt="Two colleagues in conversation in a bright consultation lounge"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            priority
            className="object-cover"
          />
          <Decor src="/decor/about-hero-glow.svg" className="left-[29%] top-[-18%] h-[50%] w-[84%]" />
        </div>

        {/* -- Copy ------------------------------------------------- */}
        <div className="px-6 py-16 md:px-10 lg:absolute lg:left-[38.89%] lg:right-[8.33%] lg:top-[230px] lg:w-auto lg:px-0 lg:py-0">
          <Eyebrow data-anim="copy" data-reveal="" className="tracking-[0.14em]">
            Why we started
          </Eyebrow>

          <MaskHeading
            as="h1"
            className="mt-[26px] max-w-[860px] text-[clamp(2rem,4vw,46px)] font-semibold leading-[1.12] tracking-[-0.02em] text-ink"
          >
            Watching brilliant doctors lose hours to admin that had nothing to do with patient care.
          </MaskHeading>

          <p data-anim="copy" data-reveal="" className="mt-[30px] max-w-[640px] text-[21px] font-semibold leading-[1.5] text-sage">
            We spent years inside private practices before we built PMG.
          </p>

          <p data-anim="copy" data-reveal="" className="mt-[16px] max-w-[620px] text-[17px] leading-[1.7] text-ink-muted">
            We work alongside healthcare professionals to make running their practices simpler, more
            efficient and easier to manage.
          </p>

          <dl className="mt-[60px] flex flex-wrap gap-x-[40px] gap-y-8">
            {CREDENTIALS.map((credential) => (
              <div key={credential.label} data-anim="credential" data-reveal="" className="flex flex-col gap-[6px]">
                <dt className="flex items-start gap-[3px]">
                  <CountUp
                    value={credential.value}
                    className="text-[34px] font-bold leading-none tracking-[-0.03em] text-ink"
                  />
                  <span className="pt-[3px] text-[13px] font-semibold leading-none text-sage">
                    {credential.unit}
                  </span>
                </dt>
                <dd className="max-w-[150px] text-[13px] font-medium leading-[1.45] text-ink-muted">
                  {credential.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
     </AboutHeroStage>
    </section>
  );
}
