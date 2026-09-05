import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import type { PanelAsset } from "@/lib/services-detail";

/**
 * The sage asset card inside each service panel. One card per service, each
 * with a different illustration — all showing illustrative sample data.
 */

const STATUS_TONE = {
  good: "bg-good-bg text-sage",
  warning: "bg-warning-bg text-warning",
  neutral: "bg-white/18 text-white",
} as const;

/** Shared dark row shell used by the list-style assets. */
function Row({ dimmed, children }: { dimmed?: boolean; children: React.ReactNode }) {
  return (
    <li
      data-anim="asset-row"
      className={cn(
        "flex items-center gap-[12px] rounded-[12px] px-[16px] py-[14px]",
        dimmed ? "bg-white/7" : "bg-white/13",
      )}
    >
      {children}
    </li>
  );
}

export function ServicePanelAsset({ asset }: { asset: PanelAsset }) {
  return (
    <div className="flex flex-col justify-center gap-[20px] rounded-[28px] bg-sage px-[24px] py-[36px] sm:px-[44px] sm:py-[52px] lg:w-[560px] lg:shrink-0 lg:self-stretch">
      <p className="text-[12px] font-semibold uppercase leading-[1.4] tracking-[0.08em] text-mint-light">
        {asset.heading}
      </p>

      {asset.kind === "checklist" && (
        <ul className="flex flex-col gap-[10px]">
          {asset.rows.map((row) => (
            <Row key={row.lead} dimmed={!row.done}>
              <span
                className={cn(
                  "w-[36px] shrink-0 text-[13px] font-semibold leading-[1.4]",
                  row.done ? "text-mint-light" : "text-on-sage",
                )}
              >
                {row.lead}
              </span>
              <span
                className={cn(
                  "flex-1 text-[15px] font-medium leading-[1.4]",
                  row.done ? "text-white" : "text-on-sage",
                )}
              >
                {row.label}
              </span>
              {row.done && <Icon name="check-circle" className="text-mint-light" />}
            </Row>
          ))}
        </ul>
      )}

      {asset.kind === "hbars" && (
        <div className="flex flex-col gap-[18px]">
          {asset.rows.map((row) => (
            <div key={row.label} data-anim="asset-row" className="flex items-center gap-[14px]">
              <p className="w-[78px] shrink-0 text-[13px] font-medium leading-[1.4] text-on-sage">
                {row.label}
              </p>
              <div className="h-[12px] flex-1">
                <div
                  className="h-full rounded-[4px] bg-mint-light"
                  style={{ width: `${row.width}%` }}
                />
              </div>
              <p className="w-[72px] shrink-0 text-right text-[14px] font-semibold leading-[1.4] text-white">
                {row.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {asset.kind === "coded" && (
        <ul className="flex flex-col gap-[10px]">
          {asset.rows.map((row) => (
            <Row key={row.code} dimmed={!row.done}>
              <span
                className={cn(
                  "flex-1 text-[15px] font-medium leading-[1.4]",
                  row.done ? "text-white" : "text-on-sage",
                )}
              >
                {row.label}
              </span>
              <span className="rounded-[7px] bg-white/16 px-[10px] py-[5px] text-[12px] font-semibold leading-[1.4] tracking-[0.03em] text-mint-light">
                {row.code}
              </span>
              <Icon name="check-circle" className="text-mint-light" />
            </Row>
          ))}
        </ul>
      )}

      {asset.kind === "statuses" && (
        <ul className="flex flex-col gap-[10px]">
          {asset.rows.map((row) => (
            <li
              key={row.ref}
              data-anim="asset-row"
              className="flex items-center gap-[12px] rounded-[12px] bg-white/11 px-[16px] py-[14px]"
            >
              <span className="w-[66px] shrink-0 text-[13px] font-semibold leading-[1.4] tracking-[0.02em] text-mint-light">
                {row.ref}
              </span>
              <span className="flex-1 text-[15px] font-medium leading-[1.4] text-white">
                {row.label}
              </span>
              <span
                className={cn(
                  "rounded-full px-[10px] py-[5px] text-[12px] font-semibold leading-[1.4] tracking-[0.02em]",
                  STATUS_TONE[row.tone],
                )}
              >
                {row.status}
              </span>
            </li>
          ))}
        </ul>
      )}

      {asset.kind === "vbars" && (
        <div className="flex items-end gap-[10px]">
          {asset.bars.map((bar) => (
            <div key={bar.month} data-anim="asset-row" className="flex flex-1 flex-col items-center justify-end gap-[10px]">
              {bar.value && (
                <p className="text-[15px] font-semibold leading-[1.4] text-white">{bar.value}</p>
              )}
              <div
                className="w-full max-w-[40px] rounded-t-[4px] bg-mint-light"
                style={{ height: `${bar.height}px` }}
              />
              <p className="text-center text-[12px] font-medium leading-[1.4] text-on-sage">
                {bar.month}
              </p>
            </div>
          ))}
        </div>
      )}

      <p className="max-w-[400px] text-[12px] leading-[1.4] text-on-sage">{asset.note}</p>
    </div>
  );
}
