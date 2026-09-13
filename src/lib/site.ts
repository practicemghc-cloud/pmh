import type { IconName } from "@/components/ui/Icon";

/**
 * Site content lifted from the Figma "High Fi" page.
 *
 * Copy is verbatim from the design, including the designer's bracketed
 * placeholders (e.g. "[ hello@pmg-healthcare.co.uk ]") — those are meant to be
 * replaced with real details before launch.
 */

export const site = {
  name: "PMG",
  wordmarkSub: "HEALTHCARE",
  legalName: "Practice Management Group Ltd",
  description:
    "Complete practice management for independent consultants and private healthcare providers across the UK.",
  email: "[ hello@pmg-healthcare.co.uk ]",
  phone: "[ +44 (0)20 0000 0000 ]",
  /** Floating WhatsApp button. Display form; `waHref` strips it for the link. */
  whatsapp: "+44 204 5842 522",
  companyNumber: "[ 00000000 ]",
  copyright:
    "© 2026 Practice Management Group Ltd  ·  Registered in England & Wales, company no. [ 00000000 ]",
} as const;

/**
 * Strips the design's display formatting to a dialable/mailable value.
 *
 * The copy is written for reading — "[ +44 (0)20 0000 0000 ]" — so the
 * brackets go, and so does the parenthesised trunk `0`, which is not dialled
 * in international format. Without that, a real number would produce a
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
    name: "Practice management & operations",
    footerLabel: "Practice Management Operations",
    blurb:
      "Day-to-day administrative, secretarial and patient coordination support.",
    icon: "calendar-check",
  },
  {
    slug: "medical-referrals",
    tabLabel: "Medical referrals",
    name: "Medical referral management",
    footerLabel: "Medical Referral Management",
    blurb:
      "Referrals received, acknowledged and followed through to a booked appointment.",
    icon: "user-plus",
  },
  {
    slug: "billing-collection",
    tabLabel: "Billing & collection",
    name: "Billing & collection",
    footerLabel: "Billing & Collection",
    blurb:
      "Accurate billing, proactive payment follow-up and live financial reporting.",
    icon: "receipt-check",
  },
  {
    slug: "international-patients",
    tabLabel: "International patients",
    name: "Embassy & international patients",
    footerLabel: "International Patient Services",
    blurb:
      "Embassy registration, letters of guarantee and international arrangements.",
    icon: "globe",
  },
  {
    slug: "medical-coding",
    tabLabel: "Medical coding",
    name: "Medical coding & reporting",
    footerLabel: "Medical Coding & Reporting",
    blurb:
      "Specialist coding and submission support for accurate, compliant records.",
    icon: "file-check",
  },
  {
    slug: "medical-transcription",
    tabLabel: "Medical transcription",
    name: "Medical transcription",
    footerLabel: "Medical Transcription",
    blurb: "Clinic letters, operation notes and reports typed up and returned for sign-off.",
    icon: "microphone",
  },
  {
    slug: "marketing-growth",
    tabLabel: "Marketing & growth",
    name: "Marketing & digital growth",
    footerLabel: "Marketing & Digital Growth",
    blurb: "Helping the right patients find and understand your services.",
    icon: "trend-up",
  },
  {
    slug: "tax-accounting",
    tabLabel: "Tax & accounting",
    name: "Tax & accounting",
    footerLabel: "Tax & Accounting",
    blurb: "Bookkeeping, annual accounts and tax, reconciled against your billing.",
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
    // `href: null` renders as plain text rather than a link. These four have
    // no page frames in the Figma file and no routes yet, and an `href="#"`
    // link is worse than no link — it silently throws you to the top of the
    // page. Give them real routes and these become links again.
    links: [
      { label: "Privacy Policy", href: null },
      { label: "Terms of Service", href: null },
      { label: "Cookie Policy", href: null },
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
