import type { IconName } from "@/components/ui/Icon";

/**
 * Site content lifted from the Figma "High Fi" page.
 *
 * Copy is verbatim from the design, including the designer's bracketed
 * placeholders (e.g. "[ 00000000 ]") — those are meant to be replaced with
 * real details before launch. The phone number and email address are real.
 */

/**
 * One number for the whole site: the footer's "Call us", the contact page's
 * direct-contact list and the floating WhatsApp button all read it from here,
 * so they can't drift apart. Display form — `telHref` and `waHref` strip the
 * spacing for the links.
 */
const PHONE = "+44 204 5842 522";

export const site = {
  name: "PMG",
  wordmarkSub: "HEALTHCARE",
  legalName: "Practice Management Group Ltd",
  description:
    "Complete practice management for independent consultants and private healthcare providers across the UK.",
  email: "info@pmghealthcare.co.uk",
  phone: PHONE,
  whatsapp: PHONE,
  companyNumber: "[ 00000000 ]",
  // The registration line comes back once there is a real company number to
  // put in it — "company no. [ 00000000 ]" in a live footer reads as a bug.
  copyright: "© 2026 Practice Management Group Ltd",
} as const;

/**
 * Strips the design's display formatting to a dialable/mailable value.
 *
 * The copy is written for reading — "+44 204 5842 522" — so the spacing goes,
 * along with any brackets and the parenthesised trunk `0`, which is not
 * dialled in international format. Without that, the number would produce a
 * `tel:` link nobody can call.
 */
export const telHref = (display: string) =>
  `tel:${display.replace(/\(0\)/g, "").replace(/[^+\d]/g, "")}`;

/**
 * wa.me wants the number bare — international digits only, no `+`, spaces or
 * punctuation — and an optional pre-filled first message.
 */
export const waHref = (display: string, message?: string) => {
  const digits = display.replace(/\(0\)/g, "").replace(/\D/g, "");
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
};

export const mailHref = (display: string) => `mailto:${display.replace(/[[\]\s]/g, "")}`;

/**
 * The real profiles, in the order the footer shows them.
 *
 * The platform names match the icon set and the Studio's dropdown. Site
 * settings in Sanity overrides this list when it has one; these are what the
 * footer falls back to, and what `npm run seed` writes.
 *
 * Instagram's URL is the plain profile address — a share link copied from the
 * app carries a `?stkn=` token that belongs to whoever copied it.
 */
export const socialLinks = [
  { platform: "linkedin", url: "https://www.linkedin.com/company/https-pmghealthcare.co.uk" },
  { platform: "instagram", url: "https://www.instagram.com/pmghealthcareuk" },
  { platform: "facebook", url: "https://www.facebook.com/PMG.healthcare.uk" },
] as const;

export type NavLink = {
  label: string;
  href: string;
  /** Opens the Services mega menu on hover/focus. */
  hasMegaMenu?: boolean;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  // About Us sits ahead of Services here by request — the Figma nav has these
  // the other way round.
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services", hasMegaMenu: true },
  { label: "Contact", href: "/contact" },
];

export type Service = {
  /** Anchor id on /services — drives the sticky tab strip. */
  slug: string;
  /** Short label for the Services tab strip. */
  tabLabel: string;
  /** Title as used in the nav mega menu. */
  name: string;
  /** Title as used in the footer's SERVICES column. */
  footerLabel: string;
  blurb: string;
  icon: IconName;
};

export const services: Service[] = [
  {
    slug: "practice-management",
    tabLabel: "Practice management",
    name: "Practice Management Operations",
    footerLabel: "Practice Management Operations",
    blurb:
      "Patient communication, diary management, records, IT & software support handled end-to-end.",
    icon: "calendar-check",
  },
  {
    slug: "medical-referrals",
    tabLabel: "Medical referral",
    name: "Medical Referral",
    footerLabel: "Medical Referral",
    blurb:
      "Connecting your patients with the right specialist or consultant through our professional network.",
    icon: "user-plus",
  },
  {
    slug: "billing-collection",
    tabLabel: "Billing & collections",
    name: "Medical Billing & Collections",
    footerLabel: "Medical Billing & Collections",
    blurb:
      "Full revenue cycle management with a 98% aged debt recovery rate and live financial reporting.",
    icon: "receipt-check",
  },
  {
    slug: "international-patients",
    tabLabel: "Embassy registration",
    name: "Embassy Registration & Onboarding",
    footerLabel: "Embassy Registration & Onboarding",
    blurb:
      "Registration and administration for embassy and sponsor-funded patients across 10+ countries.",
    icon: "globe",
  },
  {
    slug: "medical-coding",
    tabLabel: "Medical coding",
    name: "Medical Coding & Reporting",
    footerLabel: "Medical Coding & Reporting",
    blurb: "CCSD and OPCS-4 coding support for accurate claims and fewer delays.",
    icon: "file-check",
  },
  {
    slug: "medical-transcription",
    tabLabel: "Transcription",
    name: "Medical Transcription",
    footerLabel: "Medical Transcription",
    blurb:
      "Accurate, professionally formatted clinical letters and documents, prepared promptly and confidentially.",
    icon: "microphone",
  },
  {
    slug: "marketing-growth",
    tabLabel: "Marketing & growth",
    name: "Marketing & Digital Growth",
    footerLabel: "Marketing & Digital Growth",
    blurb: "Websites, social presence and campaigns that help the right patients find you.",
    icon: "trend-up",
  },
  {
    slug: "tax-accounting",
    tabLabel: "Tax & accounting",
    name: "Tax & Accounting",
    footerLabel: "Tax & Accounting",
    blurb:
      "Our accountants prepare and file everything HMRC needs, so your tax affairs stay accurate, on time and off your mind.",
    icon: "calculator",
  },
];

/**
 * Footer link columns. Entries with `href: null` are rendered as plain text —
 * see the LEGAL column below.
 */
export const footerColumns = [
  {
    heading: "SERVICES",
    width: "w-[250px]",
    links: services.map((s) => ({
      label: s.footerLabel,
      href: `/services#${s.slug}`,
    })),
  },
  {
    heading: "COMPANY",
    width: "w-[170px]",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Book a Call", href: "/contact#book" },
    ],
  },
  {
    heading: "LEGAL",
    width: "w-[170px]",
    // `href: null` renders as plain text rather than a link. The three without
    // a route have no page frame in the Figma file and nowhere to go, and an
    // `href="#"` link is worse than no link — it silently throws you to the
    // top of the page. Give them real routes and these become links too.
    links: [
      { label: "Privacy Policy", href: null },
      { label: "Terms of Service", href: null },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "Complaints", href: null },
    ],
  },
] as const;

/** Reassurance strip under the closing CTA. */
export const ctaReassurance = [
  { icon: "clock", label: "Around 30 minutes" },
  { icon: "check-circle", label: "No obligation to proceed" },
  { icon: "shield-tick", label: "Clear fees before you commit" },
] satisfies ReadonlyArray<{ icon: IconName; label: string }>;
