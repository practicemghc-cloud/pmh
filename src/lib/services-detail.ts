/**
 * Figma: the five "HF · S03 Services — Panel NN" frames
 * (130:765, 136:826, 136:916, 137:842, 137:932).
 *
 * Each panel has the same shape: a head, a "What's included" list, a sage
 * asset card, and three "How we work" steps. The asset card differs per
 * service, so it is modelled as a discriminated union.
 *
 * All figures in the asset cards are illustrative sample data, exactly as the
 * design labels them.
 */

export type PanelAsset =
  | {
      kind: "checklist";
      heading: string;
      /** `done: false` renders the dimmed, unticked row. */
      rows: { lead: string; label: string; done: boolean }[];
      note: string;
    }
  | {
      kind: "hbars";
      heading: string;
      rows: { label: string; value: string; width: number }[];
      note: string;
    }
  | {
      kind: "coded";
      heading: string;
      rows: { label: string; code: string; done: boolean }[];
      note: string;
    }
  | {
      kind: "statuses";
      heading: string;
      rows: { ref: string; label: string; status: string; tone: "good" | "warning" | "neutral" }[];
      note: string;
    }
  | {
      kind: "vbars";
      heading: string;
      bars: { month: string; height: number; value?: string }[];
      note: string;
    };

export type ServicePanel = {
  slug: string;
  /** e.g. "01 / 05  ·  PRACTICE MANAGEMENT & OPERATIONS" */
  eyebrow: string;
  title: string;
  intro: string;
  included: string[];
  asset: PanelAsset;
  steps: { title: string; body: string }[];
};

export const servicePanels: ServicePanel[] = [
  {
    slug: "practice-management",
    eyebrow: "01 / 08  ·  Practice management & operations",
    title: "The day-to-day of running the practice, handled.",
    intro:
      "Day-to-day administrative, secretarial and patient coordination support that keeps your practice running smoothly.",
    included: [
      "Clinic diary and appointment scheduling",
      "Patient correspondence and record keeping",
      "Secretarial support and call handling",
      "Hospital, insurer and supplier liaison",
      "Clinic list preparation and referral tracking",
      "Document management and dictation",
    ],
    asset: {
      kind: "checklist",
      heading: "A week, handled",
      rows: [
        { lead: "Mon", label: "Clinic list confirmed", done: true },
        { lead: "Tue", label: "34 invoices raised", done: true },
        { lead: "Wed", label: "Insurer submissions", done: true },
        { lead: "Thu", label: "2 queries chased", done: true },
        { lead: "Fri", label: "Weekly summary sent", done: false },
      ],
      note: "Illustrative — sample data",
    },
    steps: [
      {
        title: "We map how your practice runs",
        body: "Which tasks land where, who does them today, and what you would rather not be doing.",
      },
      {
        title: "We take the agreed work on",
        body: "You approve the responsibilities and access before anything moves across.",
      },
      {
        title: "You keep visibility",
        body: "Ongoing reporting, so you always know what has been done and what is outstanding.",
      },
    ],
  },
  {
    slug: "medical-referrals",
    eyebrow: "02 / 08  ·  Medical referral management",
    title: "No referral slips through.",
    intro:
      "Every referral logged, acknowledged and followed through to a booked appointment — whoever it came from.",
    included: [
      "One intake for GP, insurer and hospital referrals",
      "Same-day acknowledgement to the referrer",
      "Triage against your clinic criteria",
      "Appointment booking and confirmation",
      "Outcome letters back to the referrer",
      "Referral source reporting",
    ],
    asset: {
      kind: "statuses",
      heading: "Referrals this week",
      rows: [
        { ref: "REF-2041", label: "Consultant referral", status: "Booked", tone: "good" },
        { ref: "REF-2042", label: "Insurer referral", status: "Booked", tone: "good" },
        { ref: "REF-2043", label: "GP referral", status: "Awaiting notes", tone: "warning" },
        { ref: "REF-2044", label: "Self-referral", status: "Acknowledged", tone: "neutral" },
      ],
      note: "Illustrative — sample data",
    },
    steps: [
      {
        title: "Every referral lands in one place",
        body: "GPs, insurers, hospitals and self-referrals, logged the day they arrive.",
      },
      {
        title: "We triage and book",
        body: "Checked against your criteria, then into the right clinic slot.",
      },
      {
        title: "Your referrers hear back",
        body: "Acknowledged on the day, with the outcome letter after clinic.",
      },
    ],
  },
  {
    slug: "billing-collection",
    eyebrow: "03 / 08  ·  Billing & collection",
    title: "Your money stays yours.",
    intro:
      "Accurate billing, proactive payment follow-up and live financial reporting keep you informed and in control.",
    included: [
      "Invoice generation and issue",
      "Insurer and embassy submissions",
      "Proactive payment follow-up",
      "Outstanding balance monitoring",
      "Live financial reporting",
      "Payments direct to your account",
    ],
    asset: {
      kind: "hbars",
      heading: "Outstanding by age",
      rows: [
        { label: "0–30 days", value: "£18,400", width: 100 },
        { label: "31–60 days", value: "£9,250", width: 50.4 },
        { label: "61–90 days", value: "£3,120", width: 16.8 },
        { label: "90+ days", value: "£1,480", width: 8 },
      ],
      note: "Illustrative — sample data",
    },
    steps: [
      {
        title: "We raise every invoice",
        body: "Issued as soon as the episode is coded, to the right payer.",
      },
      {
        title: "We chase what is unpaid",
        body: "Systematic follow-up on anything outstanding, before it ages.",
      },
      {
        title: "You see the whole picture",
        body: "Live reporting on what is billed, collected and still owed.",
      },
    ],
  },
  {
    slug: "international-patients",
    eyebrow: "04 / 08  ·  Embassy & international patients",
    title: "International patients, without the paperwork.",
    intro:
      "End-to-end support for embassy registration, billing, obtaining letters of guarantee and international patient arrangements.",
    included: [
      "Embassy registration and renewals",
      "Letters of guarantee obtained",
      "Embassy billing and submissions",
      "Interpreter and travel coordination",
      "Payment terms agreed in advance",
      "A single point of contact per case",
    ],
    asset: {
      kind: "statuses",
      heading: "Letters of guarantee",
      rows: [
        { ref: "PT-5218", label: "Embassy A", status: "Issued", tone: "good" },
        { ref: "PT-5227", label: "Embassy B", status: "Requested", tone: "warning" },
        { ref: "PT-5233", label: "Embassy A", status: "Issued", tone: "good" },
        { ref: "PT-5240", label: "Embassy C", status: "Invoiced", tone: "neutral" },
      ],
      note: "Illustrative — sample data; embassies anonymised",
    },
    steps: [
      {
        title: "We register the practice",
        body: "With each embassy, and keep the registration current.",
      },
      {
        title: "We secure the guarantee",
        body: "Before the patient is seen, so treatment is never held up.",
      },
      {
        title: "We bill the embassy",
        body: "In their format, on their terms, and we follow it up.",
      },
    ],
  },
  {
    slug: "medical-coding",
    eyebrow: "05 / 08  ·  Medical coding & reporting",
    title: "Coded right the first time.",
    intro:
      "Specialist coding and submission support for accurate billing, compliant records and reliable reporting.",
    included: [
      "Procedure and diagnosis coding",
      "Coding review before submission",
      "Insurer-specific submission rules",
      "Query and rejection handling",
      "Compliant record keeping",
      "Monthly coding reports",
    ],
    asset: {
      kind: "coded",
      heading: "Coded this month",
      rows: [
        { label: "Arthroscopy, knee", code: "W82.1", done: true },
        { label: "Consultation, follow-up", code: "WA02", done: true },
        { label: "MRI, lumbar spine", code: "U21.2", done: true },
        { label: "Injection, joint", code: "W90.4", done: false },
      ],
      note: "Illustrative — sample data; codes are example OPCS-4 formats",
    },
    steps: [
      {
        title: "We code from your notes",
        body: "Every episode coded by a specialist, not matched to a template.",
      },
      {
        title: "We check before it goes",
        body: "A review pass against the payer’s rules, so claims go out clean.",
      },
      {
        title: "We handle the queries",
        body: "Rejections and requests for information come to us, not to you.",
      },
    ],
  },
  {
    slug: "medical-transcription",
    eyebrow: "06 / 08  ·  Medical transcription",
    title: "Dictate it once.",
    intro:
      "Clinic letters, operation notes and reports transcribed accurately in your own templates, back with you for sign-off.",
    included: [
      "Clinic letters and follow-up correspondence",
      "Operation notes and discharge summaries",
      "Medico-legal and insurance reports",
      "Terminology specific to your speciality",
      "Formatted to your own letter templates",
      "Secure upload and return",
    ],
    asset: {
      kind: "checklist",
      heading: "Today's dictations",
      rows: [
        { lead: "09:12", label: "Clinic letter returned", done: true },
        { lead: "10:40", label: "Operation note returned", done: true },
        { lead: "12:05", label: "Discharge summary returned", done: true },
        { lead: "14:20", label: "Insurance report in review", done: false },
      ],
      note: "Illustrative — sample data",
    },
    steps: [
      {
        title: "You dictate after clinic",
        body: "Record on any device and upload it securely — no forms to fill in.",
      },
      {
        title: "We type it to your template",
        body: "Transcribed by people who know the terminology of your speciality.",
      },
      {
        title: "It comes back for sign-off",
        body: "Usually the same working day, ready to send.",
      },
    ],
  },
  {
    slug: "marketing-growth",
    eyebrow: "07 / 08  ·  Marketing & digital growth",
    title: "Grow at a pace that feels right.",
    intro:
      "We help the right patients find and understand your services through our tailored programmes.",
    included: [
      "Practice positioning and messaging",
      "Website and content",
      "Search visibility for your specialities",
      "Referrer relationships",
      "Enquiry tracking and response",
      "Monthly performance reporting",
    ],
    asset: {
      kind: "vbars",
      heading: "New enquiries  ·  last 6 months",
      bars: [
        { month: "Mar", height: 68 },
        { month: "Apr", height: 87 },
        { month: "May", height: 82 },
        { month: "Jun", height: 111 },
        { month: "Jul", height: 126 },
        { month: "Aug", height: 150, value: "31" },
      ],
      note: "Illustrative — sample data",
    },
    steps: [
      {
        title: "We agree what growth means",
        body: "More of a speciality, more referrers, or simply a fuller clinic.",
      },
      {
        title: "We build the programme",
        body: "Only the channels that fit your practice and the time you have.",
      },
      {
        title: "You see what it produced",
        body: "Enquiries tracked to source and reported every month.",
      },
    ],
  },
  {
    slug: "tax-accounting",
    eyebrow: "08 / 08  ·  Tax & accounting",
    title: "The numbers, kept straight.",
    intro:
      "Bookkeeping, annual accounts and tax handled alongside your billing, so the same figures never get reconciled twice.",
    included: [
      "Practice bookkeeping and reconciliation",
      "Annual accounts preparation",
      "Self-assessment and corporation tax",
      "VAT and payroll where they apply",
      "Expense and allowance tracking",
      "Year-end planning conversations",
    ],
    asset: {
      kind: "hbars",
      heading: "Where the year went",
      rows: [
        { label: "Collected", value: "£412,600", width: 100 },
        { label: "Retained", value: "£237,900", width: 57.7 },
        { label: "Practice costs", value: "£96,400", width: 23.4 },
        { label: "Tax set aside", value: "£78,300", width: 19 },
      ],
      note: "Illustrative — sample data",
    },
    steps: [
      {
        title: "We start from your billing",
        body: "The collection data is already ours, so the books reconcile against it.",
      },
      {
        title: "We keep the year current",
        body: "Bookkeeping month by month, rather than a scramble in January.",
      },
      {
        title: "You know the bill early",
        body: "Tax set aside as you earn, with the figure confirmed well before it is due.",
      },
    ],
  },
];
