import Image from "next/image";
import { Decor } from "@/components/ui/Decor";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ServiceGridStage } from "@/components/motion/stages/ServiceGridStage";
import { MaskHeading } from "@/components/motion/MaskHeading";

/**
 * Figma: "HF · 02 Home — What we handle · ITERATION 3" (88:1797).
 *
 * The running order is the one used everywhere else on the site — see the
 * `services` list in `src/lib/site.ts`, which drives the nav menu, the footer
 * and the Services page tabs. Change it there and change it here; the cards
 * are hand-built per service, so this section can't derive it.
 *
 * Card treatments: 01/02 are photo-topped, 03 is the full-width dark card
 * carrying the invoice view, 04/05 are white cards with built data panels, and
 * 06–08 are icon cards across one row.
 * All figures are illustrative sample data, as labelled in the design.
 *
 * 06–08 are later additions with no frame in the file. They run as a 3-up row
 * of icon cards rather than inventing a sixth and seventh asset panel — the
 * row reads as a second tier, which is what they are, and it keeps the
 * section from growing another two screens of built illustrations.
 */

const STATUS_TONE = {
  Paid: "bg-good-bg text-sage-dark",
  Chasing: "bg-warning-bg text-warning",
  Overdue: "bg-error-bg text-error",
} as const;

const INVOICES = [
  { ref: "PT-4471", insurer: "Bupa", amount: "£2,340", status: "Paid" },
  { ref: "PT-4468", insurer: "AXA Health", amount: "£1,120", status: "Paid" },
  { ref: "PT-4462", insurer: "Self-pay", amount: "£860", status: "Chasing" },
  { ref: "PT-4455", insurer: "Vitality", amount: "£3,410", status: "Overdue" },
] satisfies ReadonlyArray<{
  ref: string;
  insurer: string;
  amount: string;
  status: keyof typeof STATUS_TONE;
}>;

/** Figma 88:1827 — "Asset — invoice view (built, not a placeholder)". */
function InvoiceView() {
  return (
    <div className="flex flex-col gap-[18px] rounded-[20px] bg-white p-[24px] shadow-lg">
      <div className="flex items-center justify-between">
        <p className="text-[17px] font-semibold leading-[1.2] tracking-[-0.01em] text-ink">
          Invoices
        </p>
        <span className="rounded-full bg-surface-2 px-[12px] py-[6px] text-[12px] font-medium leading-[1.2] text-ink-muted">
          This month
        </span>
      </div>

      {/* `min-w-0` on both: a flex item won't shrink below its content, and
          "£128,400" at 24px is wider than half a phone-width card, so the
          tiles pushed out through the panel's right edge. */}
      <div className="flex gap-[12px]">
        <div className="flex min-w-0 flex-1 flex-col gap-[4px] rounded-[14px] bg-good-bg px-[14px] py-[14px] sm:px-[16px]">
          <p className="text-[11px] font-semibold uppercase leading-[1.2] tracking-[0.08em] text-ink-muted">
            Collected
          </p>
          <p className="text-[20px] font-bold leading-[1.1] tracking-[-0.02em] text-sage-dark sm:text-[24px]">
            £128,400
          </p>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-[4px] rounded-[14px] bg-surface-2 px-[14px] py-[14px] sm:px-[16px]">
          <p className="text-[11px] font-semibold uppercase leading-[1.2] tracking-[0.08em] text-ink-muted">
            Outstanding
          </p>
          <p className="text-[20px] font-bold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[24px]">£42,180</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-left">
          <thead>
            <tr className="text-[10px] font-semibold uppercase leading-[1.2] tracking-[0.08em] text-ink-muted">
              <th scope="col" className="pb-[10px] font-semibold">Patient ref</th>
              <th scope="col" className="pb-[10px] font-semibold">Insurer</th>
              <th scope="col" className="pb-[10px] font-semibold">Amount</th>
              <th scope="col" className="pb-[10px] font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {INVOICES.map((row) => (
              <tr key={row.ref} data-anim="row" className="border-t border-line">
                <td className="py-[11px] text-[13px] font-medium leading-[1.3] text-ink">
                  {row.ref}
                </td>
                <td className="py-[11px] text-[13px] leading-[1.3] text-ink-muted">
                  {row.insurer}
                </td>
                <td className="py-[11px] text-[13px] font-semibold leading-[1.3] text-ink">
                  {row.amount}
                </td>
                <td className="py-[11px]">
                  <span
                    className={`inline-block rounded-full px-[10px] py-[5px] text-[11px] font-semibold leading-[1.2] ${STATUS_TONE[row.status]}`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-[11px] leading-[1.3] text-ink-muted">Illustrative — sample data</p>
    </div>
  );
}

/** Figma 88:1924 — "Asset — coding record (built)". */
function CodingRecord() {
  const codes = [
    { label: "PROCEDURE", standard: "OPCS-4", value: "H01.2" },
    { label: "DIAGNOSIS", standard: "ICD-10", value: "K35.8" },
    { label: "SCHEDULE", standard: "CCSD", value: "Verified" },
  ];

  return (
    <>
      <div className="flex w-full flex-col gap-[14px] rounded-[16px] bg-white p-[18px] shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-[14px] font-semibold leading-[1.2] text-ink">Episode PT-4462</p>
          <span className="rounded-full bg-good-bg px-[10px] py-[5px] text-[11px] font-semibold leading-[1.2] text-sage-dark">
            Submitted
          </span>
        </div>
        {codes.map((code) => (
          <div key={code.label} className="flex items-center gap-[10px] border-t border-line pt-[11px]">
            <p className="w-[84px] shrink-0 text-[11px] font-semibold leading-[1.2] tracking-[0.08em] text-ink-muted">
              {code.label}
            </p>
            <span className="rounded-[7px] bg-surface-2 px-[9px] py-[5px] text-[11px] font-semibold leading-[1.2] text-ink-muted">
              {code.standard}
            </span>
            <p className="text-[14px] font-semibold leading-[1.2] tracking-[0.02em] text-ink">
              {code.value}
            </p>
          </div>
        ))}
      </div>
      <p className="text-[11px] leading-[1.4] text-ink-muted">
        Checked against the insurer schedule before submission.
      </p>
    </>
  );
}

/** Cards with a photograph above the copy. */
function PhotoServiceCard({
  number,
  title,
  body,
  linkLabel,
  href,
  image,
  alt,
  gradient,
}: {
  number: string;
  title: string;
  body: string;
  linkLabel: string;
  href: string;
  image: string;
  alt: string;
  gradient: string;
}) {
  return (
    <div data-anim="card" data-reveal="" className="flex flex-col overflow-hidden rounded-[28px] bg-white shadow-md lg:min-h-[500px]">
      <div className="relative h-[250px] shrink-0 overflow-hidden" style={{ background: gradient }}>
        <Image src={image} alt={alt} fill sizes="(max-width: 1024px) 100vw, 628px" className="object-cover" />
        <Decor src="/decor/photo-slot-glow.svg" className="left-[45%] top-[-40%] h-[96%] w-[67%]" />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-8 p-[32px]">
        <div className="flex flex-col gap-[10px]">
          <p className="text-[13px] font-semibold leading-[1.2] tracking-[0.1em] text-sage">
            {number}
          </p>
          <h3 className="text-[26px] font-semibold leading-[1.22] tracking-[-0.01em] text-ink">
            {title}
          </h3>
          <p className="text-[16px] leading-[1.65] text-ink-muted">{body}</p>
        </div>
        <ArrowLink href={href}>{linkLabel}</ArrowLink>
      </div>
    </div>
  );
}

/**
 * The embassy card's asset panel.
 *
 * A wire globe and the three things that have to be in place before an
 * international patient is seen. Line work only, in the same neutral greys as
 * the other asset panels — the colour in this section belongs to the status
 * chips and the dark cards, not to an illustration.
 */
function EmbassyRecord() {
  return (
    <>
      <div className="flex w-full items-center gap-[20px] rounded-[16px] bg-white p-[18px] shadow-sm">
        <svg
          viewBox="0 0 88 88"
          fill="none"
          aria-hidden
          className="hidden size-[88px] shrink-0 text-line sm:block"
        >
          <g stroke="currentColor" strokeWidth="1.25">
            <circle cx="44" cy="44" r="35" />
            <ellipse cx="44" cy="44" rx="14" ry="35" />
            <ellipse cx="44" cy="44" rx="26" ry="35" />
            <path d="M12.6 33h62.8M9 44h70M12.6 55h62.8" />
          </g>
        </svg>

        <div className="flex flex-1 flex-col gap-[10px]">
          {[
            { label: "REGISTRATION", value: "Embassy registered" },
            { label: "GUARANTEE", value: "Letter approved" },
            { label: "BILLING", value: "Direct to embassy" },
          ].map((row, i) => (
            <div
              key={row.label}
              className={`flex items-center justify-between gap-[10px] ${
                i === 0 ? "" : "border-t border-line pt-[10px]"
              }`}
            >
              <p className="text-[11px] font-semibold leading-[1.2] tracking-[0.08em] text-ink-muted">
                {row.label}
              </p>
              <p className="text-[14px] font-semibold leading-[1.2] text-ink">{row.value}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="text-[11px] leading-[1.4] text-ink-muted">
        Settled with the embassy before the first appointment.
      </p>
    </>
  );
}

/** Cards with copy above a built asset panel. */
function AssetServiceCard({
  number,
  title,
  body,
  linkLabel,
  href,
  children,
}: {
  number: string;
  title: string;
  body: string;
  linkLabel: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <div data-anim="card" data-reveal="" className="flex flex-col gap-[24px] rounded-[28px] bg-white p-[32px] shadow-md lg:min-h-[520px]">
      <div className="flex flex-col gap-[10px]">
        <p className="text-[13px] font-semibold leading-[1.2] tracking-[0.1em] text-sage">{number}</p>
        <h3 className="text-[26px] font-semibold leading-[1.22] tracking-[-0.01em] text-ink">
          {title}
        </h3>
        <p className="text-[16px] leading-[1.65] text-ink-muted">{body}</p>
      </div>
      <div className="flex flex-1 flex-col items-start gap-[14px] rounded-[20px] bg-off-white p-[20px]">
        {children}
      </div>
      <ArrowLink href={href}>{linkLabel}</ArrowLink>
    </div>
  );
}

/** Cards 06–08 — icon, copy, link. No frame in the design; see the note above. */
function IconServiceCard({
  number,
  icon,
  title,
  body,
  linkLabel,
  href,
}: {
  number: string;
  icon: IconName;
  title: string;
  body: string;
  linkLabel: string;
  href: string;
}) {
  return (
    <div
      data-anim="card"
      data-reveal=""
      className="flex flex-col justify-between gap-[24px] rounded-[28px] bg-white p-[32px] shadow-md"
    >
      <div className="flex flex-col gap-[16px]">
        <div className="flex items-center justify-between">
          <span className="flex size-[52px] items-center justify-center rounded-[16px] bg-off-white text-sage">
            <Icon name={icon} size={24} />
          </span>
          <p className="text-[13px] font-semibold leading-[1.2] tracking-[0.1em] text-sage">
            {number}
          </p>
        </div>
        <h3 className="text-[22px] font-semibold leading-[1.25] tracking-[-0.01em] text-ink">
          {title}
        </h3>
        <p className="text-[16px] leading-[1.65] text-ink-muted">{body}</p>
      </div>
      <ArrowLink href={href}>{linkLabel}</ArrowLink>
    </div>
  );
}

export function WhatWeHandle() {
  return (
    <section className="bg-off-white px-6 py-[96px] md:px-10 lg:px-20 lg:py-[128px]">
     <ServiceGridStage>
      <div className="mx-auto flex max-w-content flex-col gap-[72px]">
        {/* -- Section header ------------------------------------------ */}
        <div className="flex flex-col gap-[32px] lg:flex-row lg:items-end lg:gap-[80px]">
          <MaskHeading className="max-w-[660px] text-[clamp(2rem,4vw,46px)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">
            The work doesn’t stop when your clinic does.
          </MaskHeading>
          <div data-anim="head" data-reveal="" className="flex flex-1 flex-col gap-[20px] text-[17px] leading-[1.7]">
            <p className="text-ink-muted">
              Between patient calls, clinic schedules, insurer requirements, invoices and
              outstanding payments, the work can continue long after your last appointment.
            </p>
            <p className="font-semibold text-ink">
              Let us take care of what happens behind the scenes.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-[24px]">
          {/* -- Services 01 & 02 — photo cards ---------------------- */}
          <div className="grid gap-[24px] lg:grid-cols-2">
            <PhotoServiceCard
              number="01"
              title="Practice Management Operations"
              body="Patient communication, diary management, records, IT & software support handled end-to-end."
              linkLabel="Explore Practice Operations"
              href="/services#practice-management"
              image="/images/practice-manager-front-desk.webp"
              alt="A practice manager working at the front desk"
              gradient="linear-gradient(161deg, rgb(94, 144, 137) 15.603%, rgb(30, 56, 53) 86.525%)"
            />
            <PhotoServiceCard
              number="02"
              title="Medical Referral"
              body="Connecting your patients with the right specialist or consultant through our professional network."
              linkLabel="Explore Medical Referral"
              href="/services#medical-referrals"
              image="/images/hero-consultant-with-patient.webp"
              alt="A consultant going through a referral with a patient"
              gradient="linear-gradient(161deg, rgb(86, 138, 131) 15.603%, rgb(26, 50, 47) 86.525%)"
            />
          </div>

          {/* -- Service 03 — feature card --------------------------- */}
          <div
data-anim="feature"
            data-reveal=""
            className="relative overflow-hidden rounded-[28px] shadow-md"
            style={{
              backgroundImage:
                "linear-gradient(161deg, rgb(49, 84, 79) 14.286%, rgb(19, 37, 35) 85.714%)",
            }}
          >
            <Decor src="/decor/service-01-glow.svg" className="left-[30%] top-[-41%] h-[91%] w-[41%]" />

            <div className="relative flex flex-col gap-12 p-[32px] lg:min-h-[440px] lg:flex-row lg:items-start lg:gap-[56px] lg:p-[48px]">
              <div className="flex max-w-[500px] flex-col justify-between gap-8 lg:min-h-[344px]">
                <div className="flex flex-col gap-[16px]">
                  <p className="text-[13px] font-semibold leading-[1.2] tracking-[0.1em] text-mint-light">
                    03
                  </p>
                  <h3 className="text-[clamp(1.75rem,3vw,38px)] font-semibold leading-[1.12] tracking-[-0.02em] text-white">
                    Medical Billing &amp; Collections
                  </h3>
                  <p className="text-[17px] leading-[1.7] text-on-sage">
                    Full revenue cycle management with a 98% aged debt recovery rate and live
                    financial reporting.
                  </p>
                  <ul className="flex flex-wrap gap-[8px] pt-[6px]">
                    {["Invoice raising", "Payment follow-up", "Insurer liaison", "Live reporting"].map(
                      (chip) => (
                        <li
                          key={chip}
                          data-anim="chip"
                          data-reveal=""
                          className="rounded-full bg-white/12 px-[14px] py-[9px] text-[14px] font-medium leading-[1.15] text-on-sage"
                        >
                          {chip}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
                <div className="flex flex-wrap items-center gap-[20px]">
                  <ArrowLink href="/services#billing-collection" tone="light" size="md">
                    Explore Billing &amp; Collection
                  </ArrowLink>
                  <span className="rounded-full bg-mint px-[18px] py-[11px] text-[14px] font-semibold leading-[1.1] text-ink">
                    98% collected
                  </span>
                </div>
              </div>

              <div data-anim="tile" data-reveal="" className="w-full lg:mt-[40px] lg:max-w-[556px]">
                <InvoiceView />
              </div>
            </div>
          </div>

          {/* -- Services 04 & 05 ------------------------------------ */}
          <div className="grid gap-[24px] lg:grid-cols-2">
            <AssetServiceCard
              number="04"
              title="Embassy Registration & Onboarding"
              body="Registration and administration for embassy and sponsor-funded patients across 10+ countries."
              linkLabel="Explore Embassy Services"
              href="/services#international-patients"
            >
              <EmbassyRecord />
            </AssetServiceCard>
            <AssetServiceCard
              number="05"
              title="Medical Coding & Reporting"
              body="CCSD and OPCS-4 coding support for accurate claims and fewer delays."
              linkLabel="Explore Medical Coding"
              href="/services#medical-coding"
            >
              <CodingRecord />
            </AssetServiceCard>
          </div>

          {/* -- Services 06, 07 & 08 — icon cards, one row ---------- */}
          <div className="grid gap-[24px] md:grid-cols-2 lg:grid-cols-3">
            <IconServiceCard
              number="06"
              icon="microphone"
              title="Medical Transcription"
              body="Accurate, professionally formatted clinical letters and documents, prepared promptly and confidentially."
              linkLabel="Explore Transcription"
              href="/services#medical-transcription"
            />
            <IconServiceCard
              number="07"
              icon="trend-up"
              title="Marketing & Digital Growth"
              body="Websites, social presence and campaigns that help the right patients find you."
              linkLabel="Explore Marketing & Growth"
              href="/services#marketing-growth"
            />
            <IconServiceCard
              number="08"
              icon="calculator"
              title="Tax & Accounting"
              body="Our accountants prepare and file everything HMRC needs, so your tax affairs stay accurate, on time and off your mind."
              linkLabel="Explore Tax & Accounting"
              href="/services#tax-accounting"
            />
          </div>
        </div>
      </div>
     </ServiceGridStage>
    </section>
  );
}
