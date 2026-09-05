"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { services } from "@/lib/site";

/**
 * Figma: the "Form card" in "HF · C01 Contact — Hero + form" (139:906).
 *
 * NOTE: the design specifies no submission endpoint, so `onSubmit` is
 * deliberately not wired to a backend — it blocks the default post and shows
 * the fallback contact routes instead of silently dropping the enquiry.
 * Point this at a Server Action or form service before launch.
 */

const HELP_TOPICS = services.map((service) => service.tabLabel);

const FIELD =
  "w-full rounded-[13px] border border-field-line bg-surface-2 px-[18px] py-[16px] text-[16px] leading-[1.4] text-ink placeholder:text-ink-muted focus:border-sage focus:outline-none";

function Label({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="flex items-start gap-[5px] text-[14px] font-medium leading-[1.4] text-ink">
      {children}
      {required && (
        <>
          <Icon name="asterisk" className="text-error" />
          <span className="sr-only">(required)</span>
        </>
      )}
    </label>
  );
}

export function ContactForm() {
  const id = useId();
  const [topics, setTopics] = useState<string[]>(HELP_TOPICS.slice(0, 2));
  const [consent, setConsent] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const toggleTopic = (topic: string) =>
    setTopics((current) =>
      current.includes(topic) ? current.filter((t) => t !== topic) : [...current, topic],
    );

  return (
    <form
      id="book"
      noValidate={false}
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
      data-anim="form"
      data-reveal=""
      className="flex w-full flex-col gap-[30px] rounded-[28px] bg-white px-[24px] py-[36px] shadow-lg sm:px-[44px] sm:py-[48px] lg:w-[600px] lg:shrink-0"
    >
      <h2 className="text-[26px] font-semibold leading-[1.25] tracking-[-0.01em] text-ink">
        Send an enquiry
      </h2>

      <div data-anim="field" className="flex flex-col gap-[16px] sm:flex-row">
        <div className="flex flex-1 flex-col gap-[9px]">
          <Label htmlFor={`${id}-name`} required>
            Your name
          </Label>
          <input id={`${id}-name`} name="name" type="text" required autoComplete="name" className={FIELD} />
        </div>
        <div className="flex flex-1 flex-col gap-[9px]">
          <Label htmlFor={`${id}-email`} required>
            Email address
          </Label>
          <input id={`${id}-email`} name="email" type="email" required autoComplete="email" className={FIELD} />
        </div>
      </div>

      <div data-anim="field" className="flex flex-col gap-[16px] sm:flex-row">
        <div className="flex flex-1 flex-col gap-[9px]">
          <Label htmlFor={`${id}-phone`} required>
            Phone number
          </Label>
          <input id={`${id}-phone`} name="phone" type="tel" required autoComplete="tel" className={FIELD} />
        </div>
        <div className="flex flex-1 flex-col gap-[9px]">
          <Label htmlFor={`${id}-speciality`}>Speciality</Label>
          <div className="relative">
            <select
              id={`${id}-speciality`}
              name="speciality"
              defaultValue=""
              className={cn(FIELD, "appearance-none pr-[44px]")}
            >
              <option value="" disabled>
                Select your speciality
              </option>
              {/* The design leaves the speciality list to be supplied. */}
              <option value="to-be-supplied">[ Speciality list to be supplied ]</option>
            </select>
            <span className="pointer-events-none absolute right-[18px] top-1/2 -translate-y-1/2 text-ink-muted">
              <Icon name="chevron-down" />
            </span>
          </div>
        </div>
      </div>

      <div data-anim="field" className="flex flex-col gap-[9px]">
        <Label htmlFor={`${id}-practice`}>Practice name (optional)</Label>
        <input id={`${id}-practice`} name="practice" type="text" className={FIELD} />
      </div>

      <fieldset data-anim="field" className="flex flex-col gap-[12px]">
        <legend className="text-[14px] font-medium leading-[1.4] text-ink">
          What can we help with?
        </legend>
        <div className="flex flex-wrap gap-[8px]">
          {HELP_TOPICS.map((topic) => {
            const selected = topics.includes(topic);
            return (
              <button
                key={topic}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleTopic(topic)}
                className={cn(
                  "flex items-center gap-[7px] rounded-full px-[14px] py-[10px] text-[14px] font-medium leading-[1.4] transition-colors duration-200",
                  selected ? "bg-sage text-white" : "bg-surface-2 text-ink-muted hover:bg-line/60",
                )}
              >
                {selected && <Icon name="check-circle" className="text-mint-light" />}
                {topic}
              </button>
            );
          })}
        </div>
        {topics.map((topic) => (
          <input key={topic} type="hidden" name="topics" value={topic} />
        ))}
      </fieldset>

      <div data-anim="field" className="flex flex-col gap-[9px]">
        <Label htmlFor={`${id}-message`}>Message</Label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={4}
          placeholder="Tell us a little about your practice and what you need."
          className={cn(FIELD, "h-[116px] resize-y leading-[1.55]")}
        />
      </div>

      <div data-anim="field" className="flex items-start gap-[12px]">
        {/* 20px sage box with the exported 13px tick, per Figma 139:964. */}
        <span className="relative mt-[2px] size-[20px] shrink-0">
          <input
            id={`${id}-consent`}
            name="consent"
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            required
            className="peer size-full appearance-none rounded-[6px] border border-field-line bg-white checked:border-sage checked:bg-sage"
          />
          {consent && (
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-white">
              <Icon name="tick" />
            </span>
          )}
        </span>
        <label
          htmlFor={`${id}-consent`}
          className="flex-1 text-[14px] leading-[1.58] text-ink-muted"
        >
          I agree that PMG may use these details to respond to my enquiry. See our Privacy Policy.
        </label>
      </div>

      <button
        data-anim="field"
        type="submit"
        className="flex w-full items-center justify-center rounded-full bg-mint py-[18px] text-[16px] font-semibold leading-[1.4] text-ink shadow-cta transition-[filter] hover:brightness-[1.04]"
      >
        Send enquiry
      </button>

      {submitted && (
        <p role="status" className="rounded-[13px] bg-warning-bg px-[18px] py-[14px] text-[14px] leading-[1.58] text-warning">
          This form isn’t connected to a mailbox yet. In the meantime, please call or email us using
          the details alongside — we’ll pick it up straight away.
        </p>
      )}
    </form>
  );
}
