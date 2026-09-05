import Image from "next/image";
import { Decor } from "@/components/ui/Decor";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { StatementStage } from "@/components/motion/stages/StatementStage";

/**
 * Figma: "HF · A03 About — VARIANT 3 (statement + photo)" (114:2795).
 * The mission card overlaps the photo's lower-left corner (x = −30, y = 430).
 */
export function AboutStatement() {
  return (
    <section className="bg-off-white px-6 py-[96px] md:px-10 lg:px-20 lg:py-[120px]">
     <StatementStage>
      <div className="mx-auto flex max-w-content flex-col items-center gap-[64px] lg:flex-row lg:gap-[80px]">
        {/* -- Copy ------------------------------------------------- */}
        <div className="w-full lg:w-[560px] lg:shrink-0">
          <Eyebrow data-anim="copy" data-reveal="" className="tracking-[0.14em]">
            The answer
          </Eyebrow>
          <h2 data-anim="copy" data-reveal="" className="mt-[24px] max-w-[540px] text-[clamp(2rem,4vw,48px)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">
            That’s where PMG comes in.
          </h2>
          <p data-anim="copy" data-reveal="" className="mt-[26px] max-w-[520px] text-[18px] leading-[1.72] text-ink-muted">
            We work alongside healthcare professionals to make running their practices simpler, more
            efficient and easier to manage. From day-to-day practice management and billing to
            marketing and long-term growth, we take care of what happens behind the scenes.
          </p>
          <div data-anim="copy" data-reveal="" className="mt-[30px]">
            <ArrowLink href="/services" size="md" className="text-sage">
              See all services
            </ArrowLink>
          </div>
        </div>

        {/* -- Photo + overlapping mission card --------------------- */}
        <div className="relative w-full lg:h-[660px] lg:flex-1">
          <div
            data-anim="photo"
            className="relative h-[420px] overflow-hidden rounded-[32px] shadow-lg sm:h-[520px] lg:absolute lg:left-[60px] lg:right-0 lg:top-0 lg:h-[660px] lg:w-auto"
            style={{
              backgroundImage:
                "linear-gradient(130deg, rgb(94, 144, 137) 14.286%, rgb(51, 96, 91) 53.571%, rgb(16, 31, 29) 85.714%)",
            }}
          >
            <Image
              data-anim="photo-inner"
              src="/images/about-pmg-at-work.webp"
              alt="The PMG team at work in their office"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
            <Decor src="/decor/about-statement-glow.svg" className="left-[27%] top-[-21%] h-[55%] w-[89%]" />
          </div>

          <div data-anim="mission" data-reveal="" className="relative -mt-12 ml-4 mr-4 flex flex-col gap-[14px] rounded-[24px] bg-white p-[28px] shadow-lg lg:absolute lg:-left-[30px] lg:top-[430px] lg:m-0 lg:w-[420px]">
            <Eyebrow className="tracking-[0.12em]">Our mission</Eyebrow>
            <p className="text-[20px] font-semibold leading-[1.38] tracking-[-0.01em] text-ink">
              Bring transparent, dependable practice management and peace of mind to every
              healthcare professional.
            </p>
          </div>
        </div>
      </div>
     </StatementStage>
    </section>
  );
}
