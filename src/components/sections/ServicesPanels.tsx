"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import type { Service } from "@/lib/site";
import type { ServicePanel } from "@/lib/services-detail";
import { ServicePanelAsset } from "./ServicePanelAsset";
import { PanelStage } from "@/components/motion/stages/PanelStage";
import { LOCATION_CHANGE } from "@/components/motion/SmoothScroll";

/**
 * Figma: "HF · S02 Services — Tab strip (sticky)" (129:802) plus the five
 * S03 panels. The page frame carries only one panel at a time and the four
 * sibling state frames show the strip with each other tab active — so this is
 * a tabbed interface, not a scrolling list.
 *
 * `/services#billing-collection` (used by the nav mega menu and the footer)
 * selects the matching tab. Every slug has a permanent anchor at the top of
 * the block, so those links land strip-first with the panel below, rather than
 * on the panel heading which the sticky strip would cover.
 */
export function ServicesPanels({
  panels,
  services,
}: {
  panels: readonly ServicePanel[];
  services: readonly Service[];
}) {
  const [active, setActive] = useState(0);
  const block = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selectFromHash = () => {
      const slug = window.location.hash.replace("#", "");
      const index = panels.findIndex((panel) => panel.slug === slug);
      if (index >= 0) setActive(index);
    };
    selectFromHash();
    // One signal for every way the URL can change. Listening to `hashchange`
    // alone missed the case that matters most here: a header or footer link to
    // a service while already on /services is a Next <Link>, which navigates
    // with history.pushState and fires no native event at all — so the strip
    // stayed on whichever tab was open and the click looked dead.
    window.addEventListener(LOCATION_CHANGE, selectFromHash);
    return () => window.removeEventListener(LOCATION_CHANGE, selectFromHash);
  }, [panels]);

  const panel = panels[active];

  return (
    <div ref={block} className="relative">
      {/*
        One anchor per service, always present — so `/services#<slug>` resolves
        in the server HTML too, not just once JS has selected that tab. They
        all sit at the top of the block, which is where these links should
        land: strip first, panel below.
      */}
      {panels.map((item) => (
        <span key={item.slug} id={item.slug} aria-hidden className="absolute top-0" />
      ))}

      {/* -- Sticky tab strip ------------------------------------- */}
      <div className="sticky top-[110px] z-30 bg-off-white px-6 py-[20px] shadow-nav md:px-10 lg:px-[120px]">
        <div
          role="tablist"
          aria-label="Services"
          className="mx-auto flex max-w-content gap-[8px] overflow-x-auto"
        >
          {panels.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-controls={`panel-${item.slug}`}
              onClick={() => {
                setActive(index);
                // The patched replaceState emits LOCATION_CHANGE, which scrolls
                // back to the top of the block — otherwise switching tabs from
                // halfway down strands you mid-panel in content that just
                // changed length.
                history.replaceState(null, "", `#${item.slug}`);
              }}
              className={cn(
                "flex flex-1 items-center justify-center whitespace-nowrap rounded-full px-[18px] py-[16px] text-[15px] font-semibold leading-[1.4] transition-colors duration-200",
                index === active
                  ? "bg-sage text-white"
                  : "bg-surface-2 text-ink-muted hover:bg-line/60",
              )}
            >
              {services[index]?.tabLabel ?? item.slug}
            </button>
          ))}
        </div>
      </div>

      {/* -- Active panel ----------------------------------------- */}
      <section
        id={`panel-${panel.slug}`}
        role="tabpanel"
        className="bg-off-white px-6 pb-[104px] pt-[96px] md:px-10 lg:px-[120px]"
      >
       <PanelStage slug={panel.slug}>
        <div className="mx-auto flex max-w-content flex-col gap-[64px]">
          {/* Panel head */}
          <div data-anim="head" data-reveal="" className="flex flex-col gap-[22px]">
            <p className="text-[12px] font-semibold uppercase leading-[1.4] tracking-[0.08em] text-sage">
              {panel.eyebrow}
            </p>
            <h2 className="max-w-[820px] text-[clamp(2rem,4vw,42px)] font-semibold leading-[1.12] tracking-[-0.02em] text-ink">
              {panel.title}
            </h2>
            <p className="max-w-[680px] text-[18px] leading-[1.68] text-ink-muted">{panel.intro}</p>
          </div>

          {/* Panel body */}
          <div className="flex flex-col gap-[24px] lg:flex-row lg:items-stretch">
            <div className="flex flex-1 flex-col gap-[26px] rounded-[28px] bg-white px-[24px] py-[36px] shadow-md sm:px-[44px] sm:py-[48px]">
              <p className="text-[12px] font-semibold uppercase leading-[1.4] tracking-[0.1em] text-sage">
                What’s included
              </p>
              <ul className="flex flex-col">
                {panel.included.map((item, index) => (
                  <li
                    key={item}
                    data-anim="included"
                    className={cn(
                      "flex items-center gap-[14px] py-[17px]",
                      index > 0 && "border-t border-line",
                    )}
                  >
                    <Icon name="check-circle" className="text-sage" />
                    <span className="flex-1 text-[17px] font-medium leading-[1.35] tracking-[-0.003em] text-ink">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <ServicePanelAsset asset={panel.asset} />
          </div>

          {/* How we work */}
          <div className="flex flex-col gap-[32px]">
            <p className="text-[12px] font-semibold uppercase leading-[1.4] tracking-[0.1em] text-sage">
              How we work
            </p>
            <div className="h-px w-full bg-line" />
            <ol className="grid gap-[24px] lg:grid-cols-3">
              {panel.steps.map((step, index) => (
                <li key={step.title} data-anim="step" className="flex flex-col gap-[14px]">
                  <p className="text-[13px] font-semibold leading-[1.4] tracking-[0.06em] text-sage">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="max-w-[340px] text-[22px] font-semibold leading-[1.26] tracking-[-0.008em] text-ink">
                    {step.title}
                  </h3>
                  <p className="max-w-[340px] text-[16px] leading-[1.65] text-ink-muted">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
       </PanelStage>
      </section>
    </div>
  );
}
