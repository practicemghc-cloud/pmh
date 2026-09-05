import { Decor } from "@/components/ui/Decor";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ctaReassurance } from "@/lib/site";
import { CtaStage } from "@/components/motion/stages/CtaStage";

/**
 * Figma: "HF · 07 Home — Closing CTA" (88:2255), reused as
 * "HF · S04 Services — Closing CTA" (130:844) and on About (120:226).
 *
 * A 36px-radius card on an off-white ground, carrying a diagonal sage→ink
 * gradient, a blurred mint glow bleeding off the top, and concentric arcs.
 */
/** Fades the pulse out before it can reach an edge. Origin matches the rings. */
const PULSE_FADE =
  "radial-gradient(ellipse 82% 82% at 50% 118%, #000 38%, rgba(0,0,0,0.55) 60%, transparent 80%)";

export function ClosingCta({
  headline = "Focus on your patients.",
  headlineAccent = "We’ll handle the rest.",
  body = "Book a no-obligation conversation. We’ll listen to how your practice works today and explain exactly which services fit — and what they cost.",
}: {
  headline?: string;
  headlineAccent?: string;
  body?: string;
}) {
  return (
    <section className="bg-off-white px-6 py-[96px] md:px-10 lg:px-20">
     <CtaStage>
      <div
        data-anim="card"
        data-reveal=""
        className="relative mx-auto max-w-content overflow-hidden rounded-panel shadow-lg"
        style={{
          backgroundImage:
            "linear-gradient(163.79deg, rgb(53, 96, 89) 12.857%, rgb(16, 31, 29) 84.286%)",
        }}
      >
        {/* Decorative glow + arc motif, both exported from Figma. */}
        <Decor src="/decor/cta-glow.svg" className="left-[20%] top-[-64%] h-[111%] w-[59%]" />
        {/*
          Looping pulse, in place of the export's three static arcs.

          The layer is masked with a radial fade centred on the same origin the
          rings expand from, so a ring dissolves as it travels outward instead
          of being sliced off against the card's edge.
        */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{
            maskImage: PULSE_FADE,
            WebkitMaskImage: PULSE_FADE,
          }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="cta-pulse absolute left-1/2 top-[118%] aspect-square w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-on-sage/40"
              style={{ animationDelay: `${i * 2}s` }}
            />
          ))}
        </span>

        <div className="relative flex flex-col items-center justify-between gap-12 px-6 pb-[56px] pt-[64px] md:px-10 lg:min-h-[468px] lg:px-20">
          <div className="flex w-full flex-col items-center gap-[22px]">
            <h2 data-anim="line" data-reveal="" className="max-w-[820px] text-center text-[clamp(2rem,5vw,54px)] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
              {headline}
              <br />
              <span className="text-mint-light">{headlineAccent}</span>
            </h2>
            <p data-anim="line" data-reveal="" className="max-w-[680px] text-center text-[18px] leading-[1.65] text-on-sage">
              {body}
            </p>
            <div data-anim="action" data-reveal="" className="flex flex-wrap items-center justify-center gap-[14px]">
              <Button href="/contact#book" size="md" leadingIcon="calendar">
                Book a Conversation
              </Button>
              <Button href="/services" size="md" variant="onDark" trailingIcon="arrow-narrow-right">
                Explore All Services
              </Button>
            </div>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-x-[40px] gap-y-4">
            {ctaReassurance.map((item) => (
              <li key={item.label} data-anim="assure" data-reveal="" className="flex items-center gap-[10px]">
                <Icon name={item.icon} className="text-mint-light" />
                <span className="text-[15px] font-medium leading-[1.3] text-on-sage">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
     </CtaStage>
    </section>
  );
}
