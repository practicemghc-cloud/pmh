import { Eyebrow } from "@/components/ui/Eyebrow";
import { mailHref } from "@/lib/site";

/**
 * The shape every legal page takes: a title block, a "last updated" line, then
 * numbered sections of prose.
 *
 * Kept deliberately plain — no photography, no asset panels. These pages are
 * read for their content, and the rest of the site's furniture would only get
 * in the way of that.
 */

export type LegalSection = {
  heading: string;
  /** Paragraphs of prose. */
  body?: string[];
  /** Optional bullet list, rendered after the paragraphs. */
  list?: string[];
  /** Optional definition rows, for describing categories of something. */
  rows?: { term: string; detail: string }[];
  /** Renders as a mailto link under the prose — for the "contact us" section. */
  email?: string;
};

export function LegalDocument({
  eyebrow,
  title,
  intro,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  /** Human-readable date, e.g. "13 September 2026". */
  updated: string;
  sections: readonly LegalSection[];
}) {
  return (
    <section className="bg-off-white px-6 pb-[104px] pt-[140px] md:px-10 lg:px-[120px]">
      <div className="mx-auto flex max-w-[820px] flex-col gap-[48px]">
        <header className="flex flex-col gap-[20px]">
          <Eyebrow className="tracking-[0.12em]">{eyebrow}</Eyebrow>
          <h1 className="text-[clamp(2rem,4vw,46px)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">
            {title}
          </h1>
          <p className="text-[18px] leading-[1.72] text-ink-muted">{intro}</p>
          <p className="text-[14px] font-medium leading-[1.4] text-ink-muted">
            Last updated: {updated}
          </p>
        </header>

        <div className="flex flex-col gap-[40px]">
          {sections.map((section, index) => (
            <section key={section.heading} className="flex flex-col gap-[14px]">
              <h2 className="flex items-baseline gap-[12px] text-[22px] font-semibold leading-[1.3] tracking-[-0.01em] text-ink">
                <span className="text-[13px] font-semibold leading-[1.2] tracking-[0.08em] text-sage">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {section.heading}
              </h2>

              {section.body?.map((paragraph) => (
                <p key={paragraph} className="text-[16px] leading-[1.75] text-ink-muted">
                  {paragraph}
                </p>
              ))}

              {section.list && (
                <ul className="flex flex-col gap-[10px] pt-[2px]">
                  {section.list.map((item) => (
                    <li
                      key={item}
                      className="flex gap-[12px] text-[16px] leading-[1.7] text-ink-muted"
                    >
                      <span aria-hidden className="mt-[11px] size-[5px] shrink-0 rounded-full bg-sage" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {section.email && (
                <a
                  href={mailHref(section.email)}
                  className="text-[16px] font-semibold leading-[1.7] text-sage underline underline-offset-2"
                >
                  {section.email}
                </a>
              )}

              {section.rows && (
                <dl className="mt-[6px] flex flex-col gap-[2px] overflow-hidden rounded-[20px] border border-line bg-white">
                  {section.rows.map((row) => (
                    <div
                      key={row.term}
                      className="flex flex-col gap-[6px] border-b border-line px-[24px] py-[18px] last:border-b-0 sm:flex-row sm:gap-[24px]"
                    >
                      <dt className="text-[15px] font-semibold leading-[1.45] text-ink sm:w-[200px] sm:shrink-0">
                        {row.term}
                      </dt>
                      <dd className="flex-1 text-[15px] leading-[1.65] text-ink-muted">
                        {row.detail}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
