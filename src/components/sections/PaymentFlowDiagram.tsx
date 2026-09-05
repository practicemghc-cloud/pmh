import { Icon } from "@/components/ui/Icon";

/**
 * Figma: "Asset — payment flow diagram (built)" (88:1992) — 700×300, drawn
 * with layout nodes rather than exported as an image.
 *
 * The dashed connector is 13 stacked 5px rects in Figma (there is no dashed
 * stroke on that layer); reproduced here as a single dashed border.
 */

function FlowNode({
  title,
  detail,
  tone,
  className,
  anim,
}: {
  title: string;
  detail: string;
  tone: "dark" | "mint";
  className?: string;
  /** `data-anim` hook so FlowStage can sequence the diagram. */
  anim?: string;
}) {
  return (
    <div
      data-anim={anim}
      data-reveal={anim ? "" : undefined}
      className={`flex flex-col justify-center gap-[6px] rounded-[18px] px-[20px] py-[18px] ${
        tone === "dark"
          ? "border border-white/20 bg-[rgba(20,37,35,0.35)]"
          : "bg-mint"
      } ${className ?? ""}`}
    >
      <p
        className={`text-[16px] font-semibold leading-[1.25] ${
          tone === "dark" ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </p>
      <p
        className={`text-[13px] leading-[1.45] ${
          tone === "dark" ? "text-on-sage" : "text-ink opacity-72"
        }`}
      >
        {detail}
      </p>
    </div>
  );
}

const NOTE = "PMG never sits in the payment path.";

export function PaymentFlowDiagram() {
  return (
    <>
      {/* -- Desktop: exact frame geometry --------------------------- */}
      <div className="relative hidden h-[300px] w-[700px] xl:block">
        <FlowNode
          tone="dark"
          anim="node-payer"
          title="Patient or insurer"
          detail="pays the invoice"
          className="absolute left-0 top-[36px] h-[96px] w-[214px]"
        />

        {/* Straight mint run: invoice paid -> consultant's account */}
        <span
          aria-hidden
          data-anim="flow-line"
          className="absolute left-[230px] top-[83px] h-[2px] w-[180px] bg-mint"
        />
        <span aria-hidden data-anim="flow-arrow" data-reveal="" className="absolute left-[402px] top-[74px] text-mint">
          <Icon name="arrow-narrow-right" />
        </span>

        <FlowNode
          tone="mint"
          anim="node-bank"
          title="Your bank account"
          detail="£2,340 received · same day"
          className="absolute left-[446px] top-[24px] h-[120px] w-[254px]"
        />

        {/* Dashed branch down to PMG — off the payment path */}
        <span
          aria-hidden
          data-anim="flow-branch"
          className="absolute left-[274px] top-[88px] h-[109px] border-l-[1.5px] border-dashed border-[rgba(220,228,219,0.45)]"
        />

        <FlowNode
          tone="dark"
          anim="node-pmg"
          title="PMG"
          detail="raises, codes and chases it"
          className="absolute left-[150px] top-[214px] h-[86px] w-[250px]"
        />

        <p data-anim="flow-note" data-reveal="" className="absolute left-[446px] top-[164px] w-[280px] text-[14px] font-semibold leading-[1.5] text-mint-light">
          {NOTE}
        </p>
      </div>

      {/* -- Compact: same story, stacked ---------------------------- */}
      <div className="flex flex-col gap-3 xl:hidden">
        <FlowNode tone="dark" title="Patient or insurer" detail="pays the invoice" />
        <span aria-hidden className="mx-auto text-mint [transform:rotate(90deg)]">
          <Icon name="arrow-narrow-right" />
        </span>
        <FlowNode tone="mint" title="Your bank account" detail="£2,340 received · same day" />
        <FlowNode tone="dark" title="PMG" detail="raises, codes and chases it" />
        <p className="text-[14px] font-semibold leading-[1.5] text-mint-light">{NOTE}</p>
      </div>
    </>
  );
}
