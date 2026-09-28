import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { AdviserStage } from "@/components/motion/stages/AdviserStage";
import type { Adviser } from "@/lib/adviser";

/**
 * About — PMG's UK Medical Adviser.
 *
 * No Figma frame: this is the adviser card the site needed, built in the house
 * language — the portrait frame from the About hero, the credential rows from
 * the Purpose cards, and a seal that names the role on the photo rather than
 * in a caption underneath it. No glow over the portrait: the decorative bloom
 * the other photo frames carry fell across his face.
 *
 * Content comes from the About page's "UK Medical Adviser" tab in Sanity (see
 * `getAboutAdviser`). The frame falls back to a monogram if there's no
 * portrait, rather than rendering a broken image under a real person's name.
 */

/** "Professor Erlick Pereira" → "EP": first and last name, titles dropped. */
function initials(name: string) {
  const words = name.split(/\s+/).filter(Boolean);
  const [first, last] = words.length > 2 ? words.slice(-2) : words;
  return `${first?.[0] ?? ""}${last?.[0] ?? ""}`.toUpperCase();
}

function Portrait({ adviser }: { adviser: Adviser }) {
  if (adviser.photo) {
    return (
      <Image
        src={adviser.photo}
        alt={adviser.photoAlt}
        fill
        sizes="(max-width: 1024px) 100vw, 460px"
        priority={false}
        className="object-cover object-top"
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`${adviser.name} — portrait to follow`}
      className="flex size-full flex-col items-center justify-center gap-[14px]"
    >
      <span className="flex size-[104px] items-center justify-center rounded-full border border-white/25 bg-white/10 text-[34px] font-semibold leading-none tracking-[-0.02em] text-white backdrop-blur-[6px]">
        {initials(adviser.name)}
      </span>
      <span className="text-[13px] font-medium leading-[1.4] text-on-sage">Portrait to follow</span>
    </div>
  );
}

export function AboutAdviser(adviser: Adviser) {
  return (
    <section className="bg-off-white px-6 pb-[96px] md:px-10 lg:px-[120px] lg:pb-[120px]">
      <AdviserStage>
        <div className="mx-auto max-w-content">
          <div className="flex flex-col gap-[32px] overflow-hidden rounded-[32px] bg-white p-[24px] shadow-lg lg:flex-row lg:items-stretch lg:gap-[56px] lg:p-[32px]">
            {/* -- Portrait ------------------------------------------- */}
            <div
              data-anim="portrait"
              className="relative aspect-[4/5] w-full shrink-0 overflow-hidden rounded-[24px] sm:aspect-[4/3] lg:aspect-auto lg:h-auto lg:w-[420px] xl:w-[460px]"
              style={{
                backgroundImage:
                  "linear-gradient(143deg, rgb(94, 144, 137) 14.286%, rgb(51, 96, 91) 53.571%, rgb(16, 31, 29) 85.714%)",
              }}
            >
              <Portrait adviser={adviser} />

              {/* The role, on the photo — a caption underneath would be read
                  as part of the body copy. */}
              <span
                data-anim="seal"
                data-reveal=""
                className="absolute bottom-[18px] left-[18px] flex items-center gap-[10px] rounded-full border border-white/20 bg-[rgba(11,25,23,0.55)] py-[10px] pl-[12px] pr-[18px] backdrop-blur-[8px]"
              >
                <span className="flex size-[28px] items-center justify-center rounded-full bg-mint text-sage-dark">
                  <Icon name="shield-tick" size={16} />
                </span>
                <span className="text-[13px] font-semibold leading-[1.2] text-white">
                  {adviser.eyebrow}
                </span>
              </span>
            </div>

            {/* -- Copy ----------------------------------------------- */}
            <div className="flex flex-1 flex-col justify-center gap-[20px] py-[8px] lg:py-[40px] lg:pr-[24px]">
              <Eyebrow data-anim="copy" data-reveal="" className="tracking-[0.1em]">
                {adviser.eyebrow}
              </Eyebrow>

              <h2
                data-anim="copy"
                data-reveal=""
                className="text-[clamp(1.75rem,3.4vw,40px)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink"
              >
                {adviser.name}
              </h2>

              <p
                data-anim="copy"
                data-reveal=""
                className="text-[17px] font-semibold leading-[1.45] text-sage"
              >
                {adviser.role}
              </p>

              <p
                data-anim="copy"
                data-reveal=""
                className="max-w-[620px] text-[17px] leading-[1.72] text-ink-muted"
              >
                {adviser.body}
              </p>

              <ul className="flex flex-col gap-[12px] pt-[8px]">
                {adviser.credentials.map((credential) => (
                  <li
                    key={credential}
                    data-anim="credential"
                    data-reveal=""
                    className="flex items-start gap-[12px] text-[15px] leading-[1.5] text-ink"
                  >
                    <span className="mt-[1px] flex size-[22px] shrink-0 items-center justify-center rounded-full bg-good-bg text-sage">
                      <Icon name="tick" size={13} />
                    </span>
                    {credential}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </AdviserStage>
    </section>
  );
}
