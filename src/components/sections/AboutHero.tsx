import Image from "next/image";
import { Decor } from "@/components/ui/Decor";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { AboutHeroStage } from "@/components/motion/stages/AboutHeroStage";
import { MaskHeading } from "@/components/motion/MaskHeading";

/**
 * Figma: "HF · A01 About — Hero" (96:138).
 *
 * A 620×760 photo bleeds off the left edge (x = −150) with rounded right
 * corners only; the copy column sits to its right.
 *
 * The frame put a row of headline figures under the copy. Without them the
 * column ran out halfway down a 1020px frame and left the right-hand side
 * empty, so the mission and vision cards moved up here from the section below
 * — they carry the same "who we are" weight and they fill the column to the
 * foot of the photo.
 */

export function AboutHero() {
  return (
    <section className="relative overflow-x-clip bg-off-white">
     <AboutHeroStage>
      <div className="relative mx-auto max-w-frame lg:min-h-[870px]">
        {/* -- Photo bleeding off the left edge ---------------------- */}
        <div
          data-anim="photo"
          className="relative h-[320px] overflow-hidden rounded-r-[36px] shadow-lg sm:h-[420px] lg:absolute lg:left-[-10.42%] lg:top-[150px] lg:h-[660px] lg:w-[43.06%]"
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

          {/* -- Mission and vision ---------------------------------- */}
          <div className="mt-[48px] grid gap-[20px] xl:grid-cols-2">
            <div
              data-anim="card"
              data-reveal=""
              className="flex flex-col justify-center gap-[14px] rounded-[26px] bg-good-bg px-[32px] py-[36px]"
            >
              <Eyebrow className="tracking-[0.12em]">Our mission</Eyebrow>
              <p className="text-[19px] font-semibold leading-[1.4] tracking-[-0.01em] text-ink">
                Bring transparent, dependable practice management and peace of mind to every
                healthcare professional.
              </p>
            </div>

            <div
              data-anim="card"
              data-reveal=""
              className="flex flex-col justify-center gap-[14px] rounded-[26px] bg-sage px-[32px] py-[36px] shadow-md"
            >
              <Eyebrow tone="mint" className="tracking-[0.1em] text-mint-light">
                Our vision
              </Eyebrow>
              <p className="text-[19px] font-semibold leading-[1.4] tracking-[-0.01em] text-white">
                To become the UK’s most trusted partner for private practice management.
              </p>
            </div>
          </div>
        </div>
      </div>
     </AboutHeroStage>
    </section>
  );
}
