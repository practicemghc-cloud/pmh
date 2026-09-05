import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactStepsStage } from "@/components/motion/stages/ContactStepsStage";

/** Figma: "HF · C02 Contact — What happens on the call" (141:875). */
const STEPS = [
  {
    title: "We understand your practice",
    body: "We take the time to understand your practice, the support you need and your priorities.",
  },
  {
    title: "We explain what fits",
    body: "We explain the most suitable services and answer your questions.",
  },
  {
    title: "You get clear next steps",
    body: "Clear information about the next steps and fees. There is no obligation to proceed.",
  },
];

export function ContactWhatHappens() {
  return (
    <section
      className="px-6 pb-[112px] pt-[104px] md:px-10 lg:px-[120px]"
      style={{
        backgroundImage:
          "linear-gradient(163deg, rgb(51, 96, 91) 12.857%, rgb(22, 48, 44) 57.143%, rgb(12, 25, 23) 84.286%)",
      }}
    >
     <ContactStepsStage>
      <div className="mx-auto flex max-w-content flex-col gap-[56px]">
        <div className="flex flex-col gap-[20px]">
          <Eyebrow data-anim="head" data-reveal="" tone="mint" className="tracking-[0.1em] text-mint-light">
            What happens next
          </Eyebrow>
          <h2 data-anim="head" data-reveal="" className="max-w-[760px] text-[clamp(2rem,4vw,44px)] font-semibold leading-[1.1] tracking-[-0.02em] text-white">
            What happens on the call.
          </h2>
        </div>

        <div aria-hidden data-anim="rule" className="h-px w-full bg-white/15" />

        <ol className="grid gap-[32px] lg:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} data-anim="step" data-reveal="" className="flex flex-col gap-[14px]">
              <p className="text-[13px] font-semibold leading-[1.4] tracking-[0.06em] text-mint-light">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="max-w-[340px] text-[24px] font-semibold leading-[1.26] tracking-[-0.01em] text-white">
                {step.title}
              </h3>
              <p className="max-w-[340px] text-[16px] leading-[1.68] text-on-sage">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
     </ContactStepsStage>
    </section>
  );
}
