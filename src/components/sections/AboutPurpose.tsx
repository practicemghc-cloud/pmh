import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { PurposeStage } from "@/components/motion/stages/PurposeStage";

/**
 * Figma: "HF · A03 About — VARIANT 3 (statement + photo)" (114:2795) and
 * "HF · A04 About — Purpose (vision & belief)" (125:177), merged.
 *
 * The two frames said one thing twice — what PMG does, then why — across two
 * near-identical layouts, each with its own photo and its own aside. They run
 * as one band of copy now: the answer on the left, the purpose on the right.
 * The photos, the "What that means" list and the mission and vision cards all
 * came out — the cards moved up into the hero, which had the room for them.
 */
export function AboutPurpose() {
  return (
    <section className="bg-off-white px-6 pb-[80px] pt-[56px] md:px-10 lg:px-[120px] lg:pb-[104px] lg:pt-[64px]">
      <PurposeStage>
        <div className="mx-auto max-w-content">
          {/* -- Header: the answer, then the purpose ----------------- */}
          <div className="flex flex-col gap-[48px] lg:flex-row lg:items-start lg:gap-[80px]">
            <div className="flex flex-1 flex-col items-start gap-[26px]">
              <Eyebrow data-anim="head" data-reveal="" className="tracking-[0.14em]">
                The answer
              </Eyebrow>
              <h2
                data-anim="head"
                data-reveal=""
                className="max-w-[560px] text-[clamp(2rem,4vw,48px)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink"
              >
                That’s where PMG comes in.
              </h2>
              <p
                data-anim="head"
                data-reveal=""
                className="max-w-[560px] text-[18px] leading-[1.72] text-ink-muted"
              >
                We work alongside healthcare professionals to make running their practices simpler,
                more efficient and easier to manage. From day-to-day practice management and billing
                to marketing and long-term growth, we take care of what happens behind the scenes.
              </p>
              <div data-anim="head" data-reveal="">
                <ArrowLink href="/services" size="md" className="text-sage">
                  See all services
                </ArrowLink>
              </div>
            </div>

            <div className="flex flex-col items-start gap-[24px] lg:w-[440px] lg:shrink-0 lg:pt-[6px]">
              <Eyebrow data-anim="head" data-reveal="" className="tracking-[0.08em]">
                Our purpose
              </Eyebrow>
              <h3
                data-anim="head"
                data-reveal=""
                className="text-[clamp(1.5rem,2.6vw,30px)] font-semibold leading-[1.18] tracking-[-0.02em] text-ink"
              >
                Focus on your patients. We’ll handle the rest.
              </h3>
              <p data-anim="head" data-reveal="" className="text-[17px] leading-[1.72] text-ink-muted">
                Every healthcare professional deserves a trusted partner that delivers transparency,
                reliability, and the peace of mind to focus on their patients.
              </p>
              <Button
                href="/contact#book"
                size="md"
                className="px-[30px] py-[17px]"
                data-anim="head"
                data-reveal=""
              >
                Book a conversation
              </Button>
            </div>
          </div>

        </div>
      </PurposeStage>
    </section>
  );
}
