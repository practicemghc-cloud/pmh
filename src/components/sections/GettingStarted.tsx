"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { StepperStage } from "@/components/motion/stages/StepperStage";
import { MaskHeading } from "@/components/motion/MaskHeading";

/**
 * Figma: "HF · 05 Getting started · VARIANT 5 (focus stepper)" (88:2326),
 * with the three sibling state frames supplying steps 02–04
 * (88:2470 / 88:2532 / 88:2598).
 *
 * The asset panels are illustrations of the process, not working controls —
 * they are rendered as static markup so nothing looks clickable that isn't.
 */

/** Step 01 — "Asset — booking (built)" (88:2359). */
function BookingAsset() {
  const days = [
    { day: "Mon", date: "8", active: false },
    { day: "Tue", date: "9", active: true },
    { day: "Wed", date: "10", active: false },
    { day: "Thu", date: "11", active: false },
  ];
  const slots = [
    { time: "09:00", active: false },
    { time: "11:30", active: true },
    { time: "14:00", active: false },
    { time: "16:30", active: false },
  ];

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <p className="flex items-center gap-[10px] text-[17px] font-semibold leading-[1.25] tracking-[-0.01em] text-ink">
          <Icon name="calendar" className="text-ink" />
          Book your first call
        </p>
        <span className="rounded-full bg-surface-2 px-[11px] py-[6px] text-[11px] font-semibold leading-[1.2] text-ink-muted">
          [ Duration ]
        </span>
      </div>

      <div aria-hidden className="flex w-full gap-[8px]">
        {days.map((d) => (
          <div
            key={d.day}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-[2px] rounded-[14px] py-[12px]",
              d.active ? "bg-sage" : "bg-white",
            )}
          >
            <span
              className={cn(
                "text-[11px] font-medium leading-[1.2]",
                d.active ? "text-mint-light" : "text-ink-muted",
              )}
            >
              {d.day}
            </span>
            <span
              className={cn(
                "text-[18px] font-semibold leading-[1.2] tracking-[-0.01em]",
                d.active ? "text-white" : "text-ink",
              )}
            >
              {d.date}
            </span>
          </div>
        ))}
      </div>

      <div aria-hidden className="flex w-full flex-wrap gap-[8px]">
        {slots.map((s) => (
          <div
            key={s.time}
            className={cn(
              "flex flex-1 items-center justify-center rounded-full py-[11px] text-[13px] font-semibold leading-[1.2]",
              s.active ? "bg-mint text-ink" : "bg-white text-ink-muted",
            )}
          >
            {s.time}
          </div>
        ))}
      </div>

      <div className="flex w-full items-center gap-[10px] pt-[2px]">
        <span className="flex">
          <span className="flex size-[26px] items-center justify-center rounded-full border-2 border-off-white bg-pastel text-[10px] font-semibold leading-none text-sage-dark">
            Y
          </span>
          <span className="-ml-[9px] flex size-[26px] items-center justify-center rounded-full border-2 border-off-white bg-mint text-[10px] font-semibold leading-none text-sage-dark">
            P
          </span>
        </span>
        <p className="flex-1 text-[12px] leading-[1.4] text-ink-muted">
          You and the PMG team · [ format ]
        </p>
      </div>
    </>
  );
}

/** Step 02 — "Select your services" (88:2501). */
function ServiceSelectAsset() {
  const rows = [
    { label: "Billing & Collection", added: true },
    { label: "Practice Management Operations", added: true },
    { label: "Medical Coding & Reporting", added: false },
    { label: "International Patient Services", added: false },
    { label: "Marketing & Digital Growth", added: false },
  ];

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <p className="text-[17px] font-semibold leading-[1.25] tracking-[-0.01em] text-ink">
          Select your services
        </p>
        <span className="rounded-full bg-good-bg px-[11px] py-[6px] text-[11px] font-semibold leading-[1.2] text-sage-dark">
          2 selected
        </span>
      </div>

      <ul aria-hidden className="flex w-full flex-col gap-[8px]">
        {rows.map((row) => (
          <li
            key={row.label}
            className="flex items-center gap-[12px] rounded-[12px] bg-white px-[14px] py-[12px]"
          >
            {row.added ? (
              <Icon name="check-circle" className="text-mint" />
            ) : (
              <span className="size-[20px] shrink-0 rounded-full border-[1.75px] border-line" />
            )}
            <span
              className={cn(
                "flex-1 text-[14px] leading-[1.4]",
                row.added ? "font-semibold text-ink" : "text-ink-muted",
              )}
            >
              {row.label}
            </span>
            {row.added && (
              <span className="text-[11px] font-semibold leading-[1.2] text-sage">Added</span>
            )}
          </li>
        ))}
      </ul>

      <p className="text-[11px] leading-[1.4] text-ink-muted">
        We only recommend what fits your priorities.
      </p>
    </>
  );
}

/** Step 03 — "Scope of service" (88:2563). */
function ScopeAsset() {
  const terms = [
    { label: "Services", value: "2 of 5 selected" },
    { label: "Responsibilities", value: "[ Agreed with you ]" },
    { label: "System access", value: "[ Access level ] to [ your PMS ]" },
    { label: "Reporting", value: "[ Frequency ] + live dashboard" },
    { label: "Payments", value: "Direct to your bank account" },
  ];

  return (
    <>
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex flex-col gap-[3px]">
          <p className="text-[17px] font-semibold leading-[1.25] tracking-[-0.01em] text-ink">
            Scope of service
          </p>
          <p className="text-[12px] leading-[1.4] text-ink-muted">
            Prepared for [ Practice name ]
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-warning-bg px-[11px] py-[6px] text-[11px] font-semibold leading-[1.2] text-warning">
          Awaiting your approval
        </span>
      </div>

      <dl className="flex w-full flex-col gap-[12px] rounded-[14px] bg-white p-[16px]">
        {terms.map((term, index) => (
          <div
            key={term.label}
            className={cn(
              "flex items-center justify-between gap-4",
              index > 0 && "border-t border-line pt-[10px]",
            )}
          >
            <dt className="text-[13px] font-medium leading-[1.4] text-ink-muted">{term.label}</dt>
            <dd className="text-right text-[14px] font-semibold leading-[1.4] text-ink">
              {term.value}
            </dd>
          </div>
        ))}
      </dl>

      <div aria-hidden className="flex w-full flex-wrap items-center gap-[12px]">
        <span className="rounded-full bg-mint px-[20px] py-[12px] text-[14px] font-semibold leading-[1.1] text-ink">
          Approve and begin
        </span>
        <span className="rounded-full bg-white px-[20px] py-[12px] text-[14px] font-semibold leading-[1.1] text-ink-muted">
          Request changes
        </span>
      </div>
    </>
  );
}

/** Step 04 — "Your practice, this month" (88:2629). */
function ReportingAsset() {
  const bars = [
    { month: "Mar", height: 37 },
    { month: "Apr", height: 42 },
    { month: "May", height: 40 },
    { month: "Jun", height: 52 },
    { month: "Jul", height: 62 },
    { month: "Aug", height: 76 },
  ];

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <p className="text-[17px] font-semibold leading-[1.25] tracking-[-0.01em] text-ink">
          Your practice, this month
        </p>
        <span className="rounded-full bg-good-bg px-[11px] py-[6px] text-[11px] font-semibold leading-[1.2] text-sage-dark">
          Live
        </span>
      </div>

      <div className="flex w-full gap-[12px]">
        <div className="flex flex-1 flex-col gap-[4px] rounded-[14px] bg-white px-[16px] py-[14px]">
          <p className="text-[10px] font-semibold uppercase leading-[1.2] tracking-[0.08em] text-ink-muted">
            Collected
          </p>
          <p className="text-[24px] font-bold leading-[1.1] tracking-[-0.02em] text-sage">£128,400</p>
        </div>
        <div className="flex flex-1 flex-col gap-[4px] rounded-[14px] bg-white px-[16px] py-[14px]">
          <p className="text-[10px] font-semibold uppercase leading-[1.2] tracking-[0.08em] text-ink-muted">
            Outstanding
          </p>
          <p className="text-[24px] font-bold leading-[1.1] tracking-[-0.02em] text-ink">£42,180</p>
        </div>
      </div>

      <div className="flex w-full flex-col gap-[12px] rounded-[14px] bg-white p-[16px]">
        <p className="text-[10px] font-semibold uppercase leading-[1.2] tracking-[0.08em] text-ink-muted">
          Collected, last 6 months
        </p>
        <div className="flex items-end gap-[8px] border-b border-line">
          {bars.map((bar) => (
            <div
              key={bar.month}
              className="flex-1 rounded-t-[4px] bg-sage"
              style={{ height: `${bar.height}px` }}
            />
          ))}
        </div>
        <div className="flex gap-[8px]">
          {bars.map((bar) => (
            <p
              key={bar.month}
              className="flex-1 text-center text-[10px] font-medium leading-[1.2] text-ink-muted"
            >
              {bar.month}
            </p>
          ))}
        </div>
      </div>

      <p className="text-[11px] leading-[1.4] text-ink-muted">
        Illustrative — sample data. Updated 2 minutes ago.
      </p>
    </>
  );
}

const STEPS = [
  {
    tab: "The first call",
    timing: "[ Day 1 ]",
    title: "The first call",
    body: "We listen to how your practice works, where support is needed and what you would like to improve. No preparation, no documents, no commitment.",
    you: "Talk us through how the practice runs today.",
    pmg: "Listen, ask, and come back with what fits.",
    Asset: BookingAsset,
  },
  {
    tab: "Choosing your services",
    timing: "[ Week 1 ]",
    title: "Choosing your services",
    body: "Together, we select the services that best fit your priorities and practice needs.",
    you: "Tell us what is costing you the most time.",
    pmg: "Recommend what fits, and quote it clearly.",
    Asset: ServiceSelectAsset,
  },
  {
    tab: "Agreeing how we work",
    timing: "[ Weeks 1–2 ]",
    title: "Agreeing how we work",
    body: "You approve the responsibilities, access requirements and reporting arrangements before we begin.",
    you: "Approve the scope, or send it back with changes.",
    pmg: "Set up access and reporting exactly as agreed.",
    Asset: ScopeAsset,
  },
  {
    tab: "Running and reporting",
    timing: "Ongoing",
    title: "Running and reporting",
    body: "We manage the agreed services while giving you clear, ongoing visibility. Every invoice, every payment and every outstanding balance, in real time.",
    you: "See the numbers whenever you want. Nothing is hidden.",
    pmg: "Run the agreed services and keep the reporting live.",
    Asset: ReportingAsset,
  },
];

export function GettingStarted() {
  const [active, setActive] = useState(0);
  const step = STEPS[active];
  const { Asset } = step;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="bg-off-white px-6 py-[96px] md:px-10 lg:px-20 lg:py-[128px]">
     <StepperStage step={active}>
      <div className="mx-auto flex max-w-content flex-col gap-[40px]">
        <div className="flex max-w-[760px] flex-col gap-[18px]">
          <MaskHeading className="text-[clamp(2rem,4vw,46px)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">
            See exactly what happens next.
          </MaskHeading>
          <p data-anim="head" data-reveal="" className="text-[17px] leading-[1.7] text-ink-muted">
            Four steps, each one shown in full before you agree to it. Step through them at your own
            pace.
          </p>
        </div>

        {/* -- Step rail --------------------------------------------- */}
        <div className="flex flex-col gap-[14px]">
          <div role="tablist" aria-label="Getting started steps" className="flex flex-col gap-[12px] md:flex-row">
            {STEPS.map((s, index) => {
              const isActive = index === active;
              return (
                <button
                  key={s.tab}
                  data-anim="tab"
                  data-reveal=""
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(index)}
                  className={cn(
                    "flex flex-1 items-center gap-[12px] rounded-full px-[22px] py-[16px] text-left font-semibold transition-colors duration-200",
                    isActive ? "bg-sage" : "bg-white hover:bg-surface-2",
                  )}
                >
                  <span
                    className={cn(
                      "shrink-0 text-[12px] leading-[1.2] tracking-[0.08em]",
                      isActive ? "text-mint-light" : "text-sage",
                    )}
                  >
                    {pad(index + 1)}
                  </span>
                  <span
                    className={cn(
                      "flex-1 text-[15px] leading-[1.3]",
                      isActive ? "text-white" : "text-ink-muted",
                    )}
                  >
                    {s.tab}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="h-[4px] w-full overflow-hidden rounded-full bg-line">
            <div
              data-anim="progress"
              className="h-full rounded-full bg-mint transition-[width] duration-300"
              style={{ width: `${((active + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* -- Active step panel -------------------------------------- */}
        <div className="flex flex-col gap-[48px] rounded-[28px] bg-white p-[24px] shadow-md lg:flex-row lg:items-start lg:p-[40px]">
          <div className="flex flex-col items-start gap-[20px] lg:w-[520px] lg:shrink-0">
            <span data-anim="panel-item" className="rounded-full bg-mint px-[14px] py-[8px] text-[12px] font-semibold leading-[1.2] tracking-[0.04em] text-ink">
              {step.timing}
            </span>
            <h3 data-anim="panel-item" className="text-[clamp(1.5rem,3vw,34px)] font-semibold leading-[1.18] tracking-[-0.02em] text-ink">
              {step.title}
            </h3>
            <p data-anim="panel-item" className="text-[17px] leading-[1.7] text-ink-muted">{step.body}</p>
            <dl data-anim="panel-item" className="flex w-full flex-col gap-[10px] pt-[4px]">
              {[
                { who: "You", what: step.you },
                { who: "PMG", what: step.pmg },
              ].map((row) => (
                <div key={row.who} className="flex items-start gap-[14px]">
                  <dt className="w-[46px] shrink-0 text-[12px] font-semibold leading-[1.5] tracking-[0.08em] text-sage">
                    {row.who}
                  </dt>
                  <dd className="flex-1 text-[15px] leading-[1.55] text-ink">{row.what}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div data-anim="panel-item" className="flex flex-1 flex-col items-start gap-[16px] rounded-[20px] bg-off-white p-[24px]">
            <Asset />
          </div>
        </div>

        {/* -- Controls ---------------------------------------------- */}
        <div className="flex items-center justify-between">
          <p className="text-[14px] font-medium leading-[1.4] text-ink-muted">
            Step {pad(active + 1)} of {pad(STEPS.length)}
          </p>
          <div className="flex gap-[10px]">
            <button
              type="button"
              onClick={() => setActive((i) => Math.max(0, i - 1))}
              disabled={active === 0}
              aria-label="Previous step"
              className="flex size-[48px] items-center justify-center rounded-full bg-white text-ink transition-opacity disabled:opacity-40"
            >
              <Icon name="arrow-narrow-left" />
            </button>
            <button
              type="button"
              onClick={() => setActive((i) => Math.min(STEPS.length - 1, i + 1))}
              disabled={active === STEPS.length - 1}
              aria-label="Next step"
              className="flex size-[48px] items-center justify-center rounded-full bg-mint text-ink transition-opacity disabled:opacity-40"
            >
              <Icon name="arrow-narrow-right" />
            </button>
          </div>
        </div>
      </div>
     </StepperStage>
    </section>
  );
}
