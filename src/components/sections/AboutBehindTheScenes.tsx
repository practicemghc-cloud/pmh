import { Decor } from "@/components/ui/Decor";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CascadeStage } from "@/components/motion/stages/CascadeStage";

/**
 * Figma: "HF · A02 About — Behind the scenes" (100:267).
 *
 * Five 108px words cascade across the frame at staggered x offsets and
 * opacities, each 100px apart vertically. The offsets below are the frame's
 * own values expressed as a share of its 1440px width.
 */
const WORDS = [
  { text: "Billing", left: "20.8%", opacity: 1, tone: "text-white" },
  { text: "Administration", left: "8.3%", opacity: 0.52, tone: "text-on-sage" },
  { text: "Operations", left: "36.1%", opacity: 0.9, tone: "text-white" },
  { text: "Marketing", left: "16.7%", opacity: 0.42, tone: "text-on-sage" },
  { text: "Growth", left: "48.6%", opacity: 0.8, tone: "text-white" },
] as const;

export function AboutBehindTheScenes() {
  return (
    <section
      className="relative overflow-x-clip"
      style={{
        backgroundImage:
          "linear-gradient(154.6deg, rgb(51, 96, 91) 12.857%, rgb(22, 48, 44) 57.143%, rgb(12, 25, 23) 84.286%)",
      }}
    >
     <CascadeStage>
      <Decor src="/decor/about-behind-glow.svg" className="left-[53%] top-[-35%] h-[65%] w-[57%]" />

      <div className="relative mx-auto max-w-frame px-6 py-[88px] md:px-10 lg:px-20">
        <Eyebrow data-anim="head" data-reveal="" tone="mint" className="tracking-[0.14em] text-mint-light">
          The work behind the practice
        </Eyebrow>

        <h2 data-anim="head" data-reveal="" className="mt-[36px] max-w-[520px] text-[26px] font-semibold leading-[1.35] tracking-[-0.01em] text-white">
          Behind every great practice, there’s a lot happening behind the scenes.
        </h2>

        {/* -- Word cascade ----------------------------------------- */}
        {/* Offsets are a share of the 1440 frame, so the list spans the full
            frame width rather than the padded content column. */}
        <ul className="mt-[46px] flex flex-col gap-2 lg:relative lg:-mx-20 lg:mt-[36px] lg:block lg:h-[540px]">
          {WORDS.map((word, index) => (
            <li
              key={word.text}
              data-anim="word"
              data-reveal=""
              className={`text-[clamp(2.5rem,8vw,108px)] font-semibold leading-[0.96] tracking-[-0.04em] lg:absolute ${word.tone}`}
              style={{
                opacity: word.opacity,
                ...({ "--word-left": word.left } as React.CSSProperties),
                left: `var(--word-left)`,
                top: `${index * 100}px`,
              }}
            >
              {word.text}
            </li>
          ))}
        </ul>

        <p data-anim="payoff" data-reveal="" className="mt-[46px] inline-block rounded-full bg-mint px-[22px] py-[14px] text-[16px] font-semibold leading-[1.3] text-ink lg:mt-[60px]">
          All competing for the time you’d rather give to your patients.
        </p>
      </div>
     </CascadeStage>
    </section>
  );
}
