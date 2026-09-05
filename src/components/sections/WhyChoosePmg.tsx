import { Decor } from "@/components/ui/Decor";
import { PaymentFlowDiagram } from "./PaymentFlowDiagram";
import { FlowStage } from "@/components/motion/stages/FlowStage";
import { ValueCardsStage } from "@/components/motion/stages/ValueCardsStage";
import { MaskHeading } from "@/components/motion/MaskHeading";

/**
 * Figma: "HF · 03 Home — Why choose PMG" (88:1976).
 *
 * A full-width dark hero card (Value 01) above three white cards, each with an
 * "asset zone" holding a small built UI. Those panels are illustrative sample
 * data in the design, not live figures.
 */

/** Value 02 — live balance panel (88:2025). */
function LiveBalancePanel() {
  const rows = [
    { label: "Raised", value: "£170,580", strong: false },
    { label: "Collected", value: "£128,400", strong: true },
    { label: "Outstanding", value: "£42,180", strong: false },
  ];

  return (
    <>
      <div className="flex w-full flex-col gap-[12px] rounded-[14px] bg-white p-[16px] shadow-xs">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-semibold uppercase leading-[1.2] tracking-[0.06em] text-ink-muted">
            This month
          </p>
          <span className="rounded-full bg-good-bg px-[9px] py-[4px] text-[11px] font-semibold leading-[1.2] text-sage-dark">
            Live
          </span>
        </div>

        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between">
            <p className="text-[13px] font-medium leading-[1.3] text-ink-muted">{row.label}</p>
            <p
              className={
                row.strong
                  ? "text-[17px] font-bold leading-[1.2] tracking-[-0.01em] text-ink"
                  : "text-[15px] font-semibold leading-[1.2] text-ink"
              }
            >
              {row.value}
            </p>
          </div>
        ))}

        <div className="h-[6px] w-full overflow-hidden rounded-full bg-surface-2">
          <div data-anim="fill" className="h-full w-[75%] rounded-full bg-sage" />
        </div>
      </div>
      <p className="text-[11px] leading-[1.4] text-ink-muted">
        75% collected · updated 2 minutes ago
      </p>
    </>
  );
}

/** Value 03 — billed vs collected (88:2048). */
function BilledVsCollected() {
  const bars = [
    { label: "BILLED", value: "£170,580", width: "100%", fill: "bg-sage-tint" },
    { label: "COLLECTED", value: "£128,400", width: "75%", fill: "bg-sage-dark" },
  ];

  return (
    <>
      <div className="flex w-full flex-col gap-[16px]">
        {bars.map((bar) => (
          <div key={bar.label} className="flex flex-col gap-[7px]">
            <div className="flex items-start justify-between">
              <p className="text-[12px] font-semibold leading-[1.3] tracking-[0.06em] text-ink-muted">
                {bar.label}
              </p>
              <p className="text-[15px] font-bold leading-[1.3] tracking-[-0.01em] text-ink">
                {bar.value}
              </p>
            </div>
            <div className="h-[14px] w-full overflow-hidden rounded-[6px] bg-surface-2">
              <div
              data-anim="fill"
              className={`h-full rounded-[6px] ${bar.fill}`}
              style={{ width: bar.width }}
            />
            </div>
          </div>
        ))}
        <span className="self-start rounded-full bg-good-bg px-[12px] py-[8px] text-[12px] font-semibold leading-[1.3] text-sage-dark">
          Our fee is calculated on this line only
        </span>
      </div>
      <p className="text-[11px] leading-[1.4] text-ink-muted">Illustrative — sample data</p>
    </>
  );
}

/** Value 04 — systems choice (88:2070). Illustrative, not an actual control. */
function SystemsChoice() {
  const systems = ["[ Your PMS ]", "[ Your billing tool ]", "[ Your calendar ]", "[ Your reporting ]"];

  return (
    <>
      <div aria-hidden className="flex w-full gap-[4px] rounded-full bg-surface-2 p-[5px]">
        <div className="flex flex-1 items-center justify-center rounded-full bg-white py-[11px] text-[13px] font-semibold leading-[1.2] text-ink">
          Keep your systems
        </div>
        <div className="flex flex-1 items-center justify-center rounded-full py-[11px] text-[13px] font-semibold leading-[1.2] text-ink-muted">
          Let us set you up
        </div>
      </div>
      <ul className="flex flex-wrap gap-[8px]">
        {systems.map((system) => (
          <li
            key={system}
            className="rounded-full bg-white px-[12px] py-[8px] text-[12px] font-medium leading-[1.2] text-ink-muted"
          >
            {system}
          </li>
        ))}
      </ul>
      <p className="text-[11px] leading-[1.4] text-ink-muted">
        Your name stays front and centre. We work quietly behind it.
      </p>
    </>
  );
}

const VALUE_CARDS = [
  {
    number: "02",
    title: "Nothing hidden",
    body: "You see every invoice, every payment and every outstanding balance in real time. If something’s stuck, you’ll know before you have to ask us.",
    Asset: LiveBalancePanel,
  },
  {
    number: "03",
    title: "We only win when you do",
    body: "Our fees are earned on what we actually collect, never on what’s simply billed. If your revenue doesn’t move, neither does our pay.",
    Asset: BilledVsCollected,
  },
  {
    number: "04",
    title: "Your practice, your choice",
    body: "Keep the software you already trust, or let us set you up properly. Either way, the practice stays built around you, not around us.",
    Asset: SystemsChoice,
  },
];

export function WhyChoosePmg() {
  return (
    <section className="bg-off-white px-6 py-[96px] md:px-10 lg:px-20 lg:py-[128px]">
     <FlowStage>
      <div className="mx-auto flex max-w-content flex-col gap-[72px]">
        {/* -- Section header ------------------------------------------ */}
        <div className="flex flex-col gap-[32px] lg:flex-row lg:items-end lg:gap-[80px]">
          <MaskHeading className="max-w-[680px] text-[clamp(2rem,4vw,46px)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">
            Trust isn’t something we ask for. It’s built into how we work.
          </MaskHeading>
          <div data-anim="copy" data-reveal="" className="flex flex-1 flex-col gap-[20px] text-[17px] leading-[1.7]">
            <p className="text-ink-muted">
              Each of these is a structural fact about how PMG operates — where the money goes, how
              our fee is calculated, what you can see and when.
            </p>
            <p className="font-semibold text-ink">Not promises. Mechanics.</p>
          </div>
        </div>

        <div className="flex flex-col gap-[24px]">
          {/* -- Value 01 — dark hero card --------------------------- */}
          <div
            className="relative overflow-hidden rounded-[28px] shadow-lg"
            style={{
              backgroundImage:
                "linear-gradient(161deg, rgb(49, 84, 79) 14.286%, rgb(19, 37, 35) 85.714%)",
            }}
          >
            <Decor src="/decor/value-01-glow.svg" className="left-[48%] top-[-45%] h-[91%] w-[41%]" />

            <div className="relative flex flex-col gap-12 p-[32px] lg:min-h-[440px] lg:flex-row lg:items-start lg:gap-[52px] lg:p-[48px] lg:pt-[96px]">
              <div className="flex max-w-[430px] flex-col gap-[26px]">
                <div className="flex flex-col gap-[16px]">
                  <p className="text-[13px] font-semibold leading-[1.2] tracking-[0.1em] text-mint-light">
                    01
                  </p>
                  <h3 className="text-[clamp(1.75rem,3vw,36px)] font-semibold leading-[1.12] tracking-[-0.02em] text-white">
                    Your money stays yours
                  </h3>
                  <p className="text-[17px] leading-[1.7] text-on-sage">
                    Every patient and insurer payment goes straight to your bank account. We never
                    sit between a consultant and their income.
                  </p>
                </div>
                <p className="text-[15px] font-semibold leading-[1.6] text-mint-light">
                  Trust isn’t something we ask for — it’s built into how the money moves.
                </p>
              </div>

              <div className="lg:pt-[10px]">
                <PaymentFlowDiagram />
              </div>
            </div>
          </div>

          {/* -- Values 02–04 ---------------------------------------- */}
          <ValueCardsStage>
          <div className="grid gap-[24px] lg:grid-cols-3">
            {VALUE_CARDS.map(({ number, title, body, Asset }) => (
              <div
                key={number}
                data-anim="card"
                data-reveal=""
                className="flex flex-col gap-[24px] rounded-[28px] bg-white p-[32px] shadow-md lg:min-h-[456px]"
              >
                <div className="flex flex-col gap-[10px]">
                  <p className="text-[13px] font-semibold leading-[1.2] tracking-[0.1em] text-sage">
                    {number}
                  </p>
                  <h3 className="text-[24px] font-semibold leading-[1.22] tracking-[-0.01em] text-ink">
                    {title}
                  </h3>
                  <p className="text-[15px] leading-[1.65] text-ink-muted">{body}</p>
                </div>
                <div className="flex flex-1 flex-col items-start justify-center gap-[14px] rounded-[18px] bg-off-white p-[18px]">
                  <Asset />
                </div>
              </div>
            ))}
          </div>
          </ValueCardsStage>
        </div>
      </div>
     </FlowStage>
    </section>
  );
}
