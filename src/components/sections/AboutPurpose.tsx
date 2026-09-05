import Image from "next/image";
import { Decor } from "@/components/ui/Decor";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PurposeStage } from "@/components/motion/stages/PurposeStage";

/** Figma: "HF · A04 About — Purpose (vision & belief)" (125:177). */
const QUALITIES = ["Transparency", "Reliability", "Peace of mind"];

export function AboutPurpose() {
  return (
    <section className="bg-off-white px-6 py-[96px] md:px-10 lg:px-[120px] lg:py-[120px]">
     <PurposeStage>
      <div className="mx-auto flex max-w-content flex-col gap-[64px]">
        {/* -- Header ----------------------------------------------- */}
        <div className="flex flex-col gap-[40px] lg:flex-row lg:items-start lg:gap-[80px]">
          <div className="flex flex-1 flex-col items-start gap-[28px]">
            <Eyebrow data-anim="head" data-reveal="" className="tracking-[0.08em]">
              Our purpose
            </Eyebrow>
            <h2 data-anim="head" data-reveal="" className="max-w-[620px] text-[clamp(2rem,4vw,44px)] font-semibold leading-[1.12] tracking-[-0.02em] text-ink">
              Focus on your patients. We’ll handle the rest.
            </h2>
            <Button href="/contact#book" size="md" className="px-[30px] py-[17px]" data-anim="head" data-reveal="">
              Book a conversation
            </Button>
          </div>
          <div data-anim="head" data-reveal="" className="lg:w-[440px] lg:shrink-0 lg:pt-[8px]">
            <p className="text-[17px] leading-[1.72] text-ink-muted">
              Every healthcare professional deserves a trusted partner that delivers transparency,
              reliability, and the peace of mind to focus on their patients.
            </p>
          </div>
        </div>

        {/* -- Photo + statement cards ------------------------------ */}
        <div className="flex flex-col gap-[24px] lg:h-[560px] lg:flex-row">
          <div
            data-anim="photo"
            className="relative h-[360px] overflow-hidden rounded-[32px] shadow-lg sm:h-[460px] lg:h-full lg:flex-1"
            style={{
              backgroundImage:
                "linear-gradient(143deg, rgb(94, 144, 137) 14.286%, rgb(51, 96, 91) 53.571%, rgb(16, 31, 29) 85.714%)",
            }}
          >
            <Image
              src="/images/about-purpose-reading-room.webp"
              alt="Clinicians reviewing radiographs together on a light box"
              fill
              sizes="(max-width: 1024px) 100vw, 70vw"
              className="object-cover"
            />
            <Decor src="/decor/about-purpose-glow.svg" className="left-[20%] top-[-25%] h-[64%] w-[68%]" />
          </div>

          <div className="flex flex-col gap-[24px] lg:h-full lg:w-[440px] lg:shrink-0">
            <div data-anim="aside" data-reveal="" className="flex flex-1 flex-col justify-center gap-[18px] rounded-[28px] bg-good-bg px-[36px] py-[40px]">
              <Eyebrow className="tracking-[0.1em]">What that means</Eyebrow>
              <ul className="flex flex-col gap-[14px]">
                {QUALITIES.map((quality) => (
                  <li key={quality} data-anim="quality" data-reveal="" className="flex items-center gap-[12px]">
                    <Icon name="check-circle" className="text-sage" />
                    <span className="text-[19px] font-medium leading-[1.4] tracking-[-0.005em] text-ink">
                      {quality}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div data-anim="aside" data-reveal="" className="flex flex-1 flex-col justify-center gap-[14px] rounded-[28px] bg-sage px-[36px] py-[40px] shadow-md">
              <Eyebrow tone="mint" className="tracking-[0.1em] text-mint-light">
                Our vision
              </Eyebrow>
              <p className="max-w-[368px] text-[22px] font-semibold leading-[1.3] tracking-[-0.008em] text-white">
                To become the UK’s most trusted partner for private practice management.
              </p>
            </div>
          </div>
        </div>
      </div>
     </PurposeStage>
    </section>
  );
}
