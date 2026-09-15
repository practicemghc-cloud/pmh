export type Faq = {
  question: string;
  /** `null` renders the row collapsed with no answer — copy still to be supplied. */
  answer: string | null;
};

/**
 * The approved FAQ copy, supplied as the standalone PMG page.
 *
 * The same twelve questions serve both surfaces: the home and About pages run
 * them as one accordion, and the contact page splits them across its topic
 * rail (see `contactFaqCategories`, which references these entries rather than
 * restating them — one answer, one place to edit it).
 */
const FAQS = {
  scope: {
    question: "What does PMG actually take off my plate?",
    answer:
      "Day-to-day operations, billing and collections, medical coding, embassy registration, international patient services, and practice growth support: the full operational load behind an independent practice.",
  },
  clients: {
    question: "Who do you typically work with?",
    answer:
      "Independent consultants, clinics, physiotherapy practices and private healthcare providers across the UK, from single-consultant practices to growing multi-site groups.",
  },
  start: {
    question: "How quickly can we get started?",
    answer:
      "Most practices are fully onboarded within a few weeks. Book a call and we’ll walk you through a plan tailored to your practice.",
  },
  software: {
    question: "Will I need to change my current practice management system?",
    answer:
      "Not unless you want to. You’re welcome to keep the system you already know, or, if you’d prefer something better suited to your practice, we’ll help you make the switch. The choice is entirely yours. And through our group account with Semble, we can offer preferential rates that individual practices rarely secure alone, so if you are moving, you’ll get better value too.",
  },
  fees: {
    question: "How does your fee work?",
    answer:
      "We start with a call to get to know your practice, your priorities and the challenges you’re facing. Together, we agree which services will benefit you most, and only then do we send over your fee: one simple, transparent percentage on what we collect for you. No hidden costs, no setup fees, and no long-term lock-in.",
  },
  payments: {
    question: "Do payments come to PMG or directly to me?",
    answer:
      "Payments go straight to your account. We never sit between you and your money. You get direct payments and live visibility on every invoice.",
  },
  diagnostics: {
    question: "What about diagnostic and physiotherapy billing?",
    answer:
      "That’s covered too. Diagnostic imaging, pathology, laboratory and physiotherapy billing all fall within our medical billing and collections service, so nothing gets left out.",
  },
  visibility: {
    question: "How will I keep track of my account?",
    answer:
      "Through a secure, live dashboard giving you real-time visibility of every invoice, payment and outstanding balance, so you’re always in the know.",
  },
  coding: {
    question: "Do you offer medical coding support?",
    answer:
      "We do. Our team provides CCSD coding support for insurer claims and OPCS-4 coding support for PHIN submissions, helping you submit more accurate claims, avoid coding-related delays and rejections, and capture every fee you’re entitled to.",
  },
  embassies: {
    question: "How experienced are you with embassy registration and onboarding?",
    answer:
      "Very. We currently work with over 10 embassies, including Qatar, Kuwait, the UAE, Oman, Saudi Arabia and Bahrain, so registering and onboarding sponsored patients is very much part of our day-to-day.",
  },
  embassyBilling: {
    question: "Can you manage embassy billing on our behalf?",
    answer:
      "Yes, from start to finish. We take care of embassy billing and payment collection, and we’ll pursue any outstanding balances persistently and professionally on your behalf.",
  },
  data: {
    question: "How do you keep my patients’ data safe?",
    answer:
      "Every member of our team is GDPR-trained and certified in data protection compliance, so your patients’ information is handled with the diligence it deserves, at every step.",
  },
} as const satisfies Record<string, Faq>;

/** Figma: "HF · 06 Home — FAQs" (88:2209), also used on About (120:180). */
export const homeFaqs: Faq[] = [
  FAQS.scope,
  FAQS.clients,
  FAQS.start,
  FAQS.software,
  FAQS.fees,
  FAQS.payments,
  FAQS.diagnostics,
  FAQS.visibility,
  FAQS.coding,
  FAQS.embassies,
  FAQS.embassyBilling,
  FAQS.data,
];

export type FaqCategory = {
  name: string;
  /** Shown on the topic rail in Figma (146:891) — the number of questions in it. */
  plannedCount: number;
  questions: Faq[];
};

/**
 * Figma: "HF · C03 Contact — Extended FAQs" (146:880).
 *
 * The frame's five placeholder topics are replaced by the ones the approved
 * questions actually fall into. `plannedCount` is now simply the length of
 * each list — there are no unwritten questions left to promise.
 */
export const contactFaqCategories: FaqCategory[] = [
  {
    name: "Working with PMG",
    plannedCount: 4,
    questions: [FAQS.scope, FAQS.clients, FAQS.start, FAQS.software],
  },
  {
    name: "Fees & payment",
    plannedCount: 3,
    questions: [FAQS.fees, FAQS.payments, FAQS.visibility],
  },
  {
    name: "Billing & coding",
    plannedCount: 2,
    questions: [FAQS.diagnostics, FAQS.coding],
  },
  {
    name: "Embassy & international",
    plannedCount: 2,
    questions: [FAQS.embassies, FAQS.embassyBilling],
  },
  {
    name: "Your data",
    plannedCount: 1,
    questions: [FAQS.data],
  },
];
