/**
 * Seeds a fresh Sanity project with the content the site already ships with.
 *
 *   npm run seed
 *
 * Idempotent: every document uses a fixed `_id` and `createOrReplace`, so
 * running it twice is harmless — but it WILL overwrite edits made in the
 * Studio, so it's meant for first-time setup (or a deliberate reset).
 *
 * Without this an editor opens the Studio to a set of empty forms and has to
 * retype the whole site. With it, they open the real content and can edit.
 */
import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import { resolve, basename } from "node:path";

import { site, navLinks, footerColumns, services, ctaReassurance } from "../src/lib/site";
import { homeFaqs, contactFaqCategories } from "../src/lib/faqs";
import { clientStories } from "../src/lib/stories";
import { servicePanels } from "../src/lib/services-detail";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "\nMissing configuration.\n\n" +
      "  NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_WRITE_TOKEN must be set in .env.local\n" +
      "  Create a token at https://sanity.io/manage → API → Tokens (Editor access).\n",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-10-01",
  useCdn: false,
});

/** Uploads a local image once and returns a reference for an image field. */
const uploaded = new Map<string, string>();
async function image(file: string, alt: string) {
  if (!uploaded.has(file)) {
    const buffer = await readFile(resolve(process.cwd(), "public/images", file));
    const asset = await client.assets.upload("image", buffer, { filename: basename(file) });
    uploaded.set(file, asset._id);
    console.log(`  uploaded ${file}`);
  }
  return {
    _type: "imageWithAlt",
    asset: { _type: "reference", _ref: uploaded.get(file) },
    alt,
  };
}

/**
 * Adds a `_key` to every object sitting inside an array.
 *
 * Sanity needs a stable unique key on each array member to track edits and
 * reordering; documents written through the API without one show a "Missing
 * keys" error in the Studio and the list can't be edited. Walking the document
 * here means no individual seed entry has to remember it.
 *
 * Arrays of plain strings are left alone — those don't take keys.
 */
function withKeys<T>(value: T, path = "k"): T {
  if (Array.isArray(value)) {
    return value.map((item, i) =>
      item && typeof item === "object"
        ? withKeys({ _key: `${path}${i}`, ...(item as object) }, `${path}${i}_`)
        : item,
    ) as T;
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [
        k,
        withKeys(v, `${path}${k}_`),
      ]),
    ) as T;
  }
  return value;
}

const link = (label: string, href: string | null) => ({ _type: "richLink", label, href });
const intro = (eyebrow: string | null, heading: string, body?: string) => ({
  _type: "sectionIntro",
  eyebrow,
  heading,
  body,
});

async function run() {
  console.log(`\nSeeding ${projectId}/${dataset}\n`);

  console.log("Images");
  const heroMain = await image("hero-consultant-with-patient.webp", "A consultant reviewing notes with a patient");
  const heroTall = await image("hero-surgery.webp", "A surgical team at work in theatre");
  const heroWide = await image("hero-paperwork.webp", "Invoices and statements beside a laptop");
  const opsPhoto = await image("practice-manager-front-desk.webp", "A practice manager working at the front desk");
  const intlPhoto = await image("international-patient-clinic.webp", "A consultant meeting an international patient and their family");
  const aboutHero = await image("about-consultation-lounge.webp", "Two colleagues in conversation in a bright consultation lounge");
  const aboutWork = await image("about-pmg-at-work.webp", "The PMG team at work in their office");
  const aboutRoom = await image("about-purpose-reading-room.webp", "Clinicians reviewing radiographs together on a light box");

  const docs: Record<string, unknown>[] = [];

  /* -- Settings and shared ------------------------------------------- */
  docs.push({
    _id: "siteSettings",
    _type: "siteSettings",
    description: site.description,
    email: site.email,
    phone: site.phone,
    officeHours: "[ Mon–Fri, 00:00–00:00 ]",
    copyright: site.copyright,

    metaTitle: "PMG Healthcare — Complete Practice Management",
    metaDescription: site.description,
    keywords: [
      "practice management",
      "medical billing",
      "private healthcare",
      "medical coding",
      "consultant billing",
      "embassy patient services",
    ],
    // Social profiles are seeded as examples so the footer row is visible and
    // the shape is obvious; replace the URLs with the real accounts, or delete
    // any row to hide that icon.
    socialLinks: [
      { platform: "linkedin", url: "https://www.linkedin.com/company/example" },
      { platform: "instagram", url: "https://www.instagram.com/example" },
      { platform: "facebook", url: "https://www.facebook.com/example" },
    ],

    navLinks: navLinks.map((l) => link(l.label, l.href)),
    navPrimaryCta: link("Book a Call", "/contact#book"),
    navSecondaryCta: link("Send an enquiry", "/contact"),
    footerCompanyLinks: footerColumns[1].links.map((l) => link(l.label, l.href)),
    footerLegalLinks: footerColumns[2].links.map((l) => link(l.label, l.href)),
  });

  docs.push({
    _id: "closingCta",
    _type: "closingCta",
    headline: "Focus on your patients.",
    headlineAccent: "We’ll handle the rest.",
    body: "Book a no-obligation conversation. We’ll listen to how your practice works today and explain exactly which services fit — and what they cost.",
    reassurance: ctaReassurance.map((r) => ({ _type: "object", icon: r.icon, label: r.label })),
  });

  /* -- Services ------------------------------------------------------- */
  services.forEach((s, i) => {
    const panel = servicePanels.find((p) => p.slug === s.slug);
    docs.push({
      _id: `service-${s.slug}`,
      _type: "service",
      order: i + 1,
      name: s.name,
      tabLabel: s.tabLabel,
      footerLabel: s.footerLabel,
      slug: { _type: "slug", current: s.slug },
      icon: s.icon,
      blurb: s.blurb,
      panelTitle: panel?.title,
      panelIntro: panel?.intro,
      included: panel?.included,
      steps: panel?.steps.map((step) => ({ _type: "labelledStep", ...step })),
    });
  });

  /* -- FAQs ------------------------------------------------------------ */
  homeFaqs.forEach((f, i) => {
    docs.push({
      _id: `faq-general-${i + 1}`,
      _type: "faq",
      order: i + 1,
      placement: "general",
      question: f.question,
      answer: f.answer ?? undefined,
      openByDefault: i < 2,
    });
  });

  let contactOrder = 0;
  contactFaqCategories.forEach((category) => {
    category.questions.forEach((f) => {
      contactOrder += 1;
      docs.push({
        _id: `faq-contact-${contactOrder}`,
        _type: "faq",
        order: contactOrder,
        placement: "contact",
        topic: category.name,
        question: f.question,
        answer: f.answer ?? undefined,
        openByDefault: contactOrder === 1,
      });
    });
  });

  /* -- Client stories --------------------------------------------------- */
  clientStories.forEach((s, i) => {
    docs.push({
      _id: `story-${i + 1}`,
      _type: "clientStory",
      order: i + 1,
      initials: s.initials,
      name: s.name,
      meta: s.meta,
      rating: s.rating,
      quote: s.quote,
      chips: s.chips,
    });
  });

  /* -- Pages ------------------------------------------------------------ */
  docs.push({
    _id: "homePage",
    _type: "homePage",
    heroHeading: "Complete Practice Management",
    heroHeadingAccent: "Built Around You.",
    heroLead: "More time for your patients. More control over your practice.",
    heroBody:
      "Operations, billing and collection, medical coding, embassy registration and practice growth — handled side by side with you.",
    heroPrimaryCta: link("Explore All Services", "/services"),
    heroSecondaryCta: link("Book a Conversation", "/contact#book"),
    heroStats: [
      { _type: "statItem", value: 98, unit: "%", label: "Debt collection rate" },
      { _type: "statItem", value: 10, unit: "+", label: "Consultants supported" },
      { _type: "statItem", value: 10, unit: "yrs", label: "In the UK private market" },
    ],
    heroPhotoMain: heroMain,
    heroPhotoTall: heroTall,
    heroPhotoWide: heroWide,
    heroPhotoCaption: "Nothing hidden.",
    heroPhotoCaptionAccent: "Every balance, live.",
    heroFeatureCard: "Every payment goes straight to you",

    handleIntro: intro(
      null,
      "The work doesn’t stop when your clinic does.",
      "Between patient calls, clinic schedules, insurer requirements, invoices and outstanding payments, the work can continue long after your last appointment.",
    ),
    handleIntroBold: "Let us take care of what happens behind the scenes.",
    handleFeatureChips: ["Invoice raising", "Payment follow-up", "Insurer liaison", "Live reporting"],
    handleFeatureStat: "98% collected",
    handlePhotoOperations: opsPhoto,
    handlePhotoInternational: intlPhoto,

    trustIntro: intro(
      null,
      "Trust isn’t something we ask for. It’s built into how we work.",
      "Each of these is a structural fact about how PMG operates — where the money goes, how our fee is calculated, what you can see and when.",
    ),
    trustIntroBold: "Not promises. Mechanics.",
    trustFeature: {
      title: "Your money stays yours",
      body: "Every patient and insurer payment goes straight to your bank account. We never sit between a consultant and their income.",
      footnote: "Trust isn’t something we ask for — it’s built into how the money moves.",
    },
    trustCards: [
      {
        title: "Nothing hidden",
        body: "You see every invoice, every payment and every outstanding balance in real time. If something’s stuck, you’ll know before you have to ask us.",
      },
      {
        title: "We only win when you do",
        body: "Our fees are earned on what we actually collect, never on what’s simply billed. If your revenue doesn’t move, neither does our pay.",
      },
      {
        title: "Your practice, your choice",
        body: "Keep the software you already trust, or let us set you up properly. Either way, the practice stays built around you, not around us.",
      },
    ],

    storiesIntro: intro(
      "CLIENT STORIES",
      "What consultants say",
      "Independent consultants and private healthcare providers on what changed when PMG took over the work behind the practice.",
    ),
    storiesFootnote:
      "Placeholder content — names, roles, ratings and quotes all await approved client stories.",

    stepsIntro: intro(
      null,
      "See exactly what happens next.",
      "Four steps, each one shown in full before you agree to it. Step through them at your own pace.",
    ),
    steps: [
      {
        tab: "The first call",
        timing: "[ Day 1 ]",
        title: "The first call",
        body: "We listen to how your practice works, where support is needed and what you would like to improve. No preparation, no documents, no commitment.",
        you: "Talk us through how the practice runs today.",
        pmg: "Listen, ask, and come back with what fits.",
      },
      {
        tab: "Choosing your services",
        timing: "[ Week 1 ]",
        title: "Choosing your services",
        body: "Together, we select the services that best fit your priorities and practice needs.",
        you: "Tell us what is costing you the most time.",
        pmg: "Recommend what fits, and quote it clearly.",
      },
      {
        tab: "Agreeing how we work",
        timing: "[ Weeks 1–2 ]",
        title: "Agreeing how we work",
        body: "You approve the responsibilities, access requirements and reporting arrangements before we begin.",
        you: "Approve the scope, or send it back with changes.",
        pmg: "Set up access and reporting exactly as agreed.",
      },
      {
        tab: "Running and reporting",
        timing: "Ongoing",
        title: "Running and reporting",
        body: "We manage the agreed services while giving you clear, ongoing visibility. Every invoice, every payment and every outstanding balance, in real time.",
        you: "See the numbers whenever you want. Nothing is hidden.",
        pmg: "Run the agreed services and keep the reporting live.",
      },
    ],

    faqIntro: intro(
      null,
      "Questions consultants ask",
      "If yours isn’t here, the fastest way to an answer is a short call. There’s no obligation and no script.",
    ),
    faqCard: {
      title: "Still have a question?",
      body: "You’ll speak to someone who has worked inside private practices — not a call centre.",
      cta: link("Book a call", "/contact#book"),
      hours: "Mon–Fri, 9:00–17:30",
    },
  });

  docs.push({
    _id: "aboutPage",
    _type: "aboutPage",
    heroEyebrow: "WHY WE STARTED",
    heroHeading:
      "Watching brilliant doctors lose hours to admin that had nothing to do with patient care.",
    heroLead: "We spent years inside private practices before we built PMG.",
    heroBody:
      "We work alongside healthcare professionals to make running their practices simpler, more efficient and easier to manage.",
    heroPhoto: aboutHero,
    heroStats: [
      { _type: "statItem", value: 10, unit: "yrs", label: "In the UK private market" },
      { _type: "statItem", value: 10, unit: "+", label: "Consultants supported" },
      { _type: "statItem", value: 98, unit: "%", label: "Debt collection rate" },
    ],

    cascadeEyebrow: "THE WORK BEHIND THE PRACTICE",
    cascadeHeading: "Behind every great practice, there’s a lot happening behind the scenes.",
    cascadeWords: ["Billing", "Administration", "Operations", "Marketing", "Growth"],
    cascadePayoff: "All competing for the time you’d rather give to your patients.",

    statementEyebrow: "THE ANSWER",
    statementHeading: "That’s where PMG comes in.",
    statementBody:
      "We work alongside healthcare professionals to make running their practices simpler, more efficient and easier to manage. From day-to-day practice management and billing to marketing and long-term growth, we take care of what happens behind the scenes.",
    statementLink: link("See all services", "/services"),
    statementPhoto: aboutWork,
    mission: {
      eyebrow: "OUR MISSION",
      body: "Bring transparent, dependable practice management and peace of mind to every healthcare professional.",
    },

    purposeEyebrow: "OUR PURPOSE",
    purposeHeading: "Focus on your patients. We’ll handle the rest.",
    purposeBody:
      "Every healthcare professional deserves a trusted partner that delivers transparency, reliability, and the peace of mind to focus on their patients.",
    purposeCta: link("Book a conversation", "/contact#book"),
    purposePhoto: aboutRoom,
    qualitiesEyebrow: "WHAT THAT MEANS",
    qualities: ["Transparency", "Reliability", "Peace of mind"],
    vision: {
      eyebrow: "OUR VISION",
      body: "To become the UK’s most trusted partner for private practice management.",
    },
  });

  docs.push({
    _id: "servicesPage",
    _type: "servicesPage",
    eyebrow: "SERVICES",
    heading: "Private practice management services.",
    body: "Between patient calls, clinic schedules, insurer requirements, invoices and outstanding payments, the work can continue long after your clinic ends. Let us take care of what happens behind the scenes.",
    cta: link("Book a conversation", "/contact#book"),
  });

  docs.push({
    _id: "contactPage",
    _type: "contactPage",
    eyebrow: "CONTACT",
    heading: "Let’s talk about your practice.",
    body: "We take the time to understand your practice, the support you need and your priorities — then explain the services that actually fit.",
    reassurance: ["No obligation to proceed", "Your details stay with PMG"],
    formTitle: "Send an enquiry",
    formConsent:
      "I agree that PMG may use these details to respond to my enquiry. See our Privacy Policy.",
    formButton: "Send enquiry",
    specialities: ["[ Speciality list to be supplied ]"],
    callEyebrow: "WHAT HAPPENS NEXT",
    callHeading: "What happens on the call.",
    callSteps: [
      {
        _type: "labelledStep",
        title: "We understand your practice",
        body: "We take the time to understand your practice, the support you need and your priorities.",
      },
      {
        _type: "labelledStep",
        title: "We explain what fits",
        body: "We explain the most suitable services and answer your questions.",
      },
      {
        _type: "labelledStep",
        title: "You get clear next steps",
        body: "Clear information about the next steps and fees. There is no obligation to proceed.",
      },
    ],
    faqEyebrow: "EVERYTHING ELSE",
    faqHeading: "Answers before you ask.",
    faqAskCard: {
      title: "Not answered here?",
      body: "Send it with your enquiry above and we’ll answer it on the call.",
      cta: link("Ask your question", "#book"),
    },
  });

  console.log(`\nWriting ${docs.length} documents`);
  let tx = client.transaction();
  for (const doc of docs) tx = tx.createOrReplace(withKeys(doc) as never);

  /*
   * Clear the leftovers of the seeded lists.
   *
   * `createOrReplace` only adds and overwrites, so shortening a list in code
   * — nine client stories down to four, say — left the extra documents in the
   * dataset, and the site prefers CMS content over the code defaults, so they
   * kept rendering. Anything of a list type that this run did not write is
   * stale by definition. Scoped to the three list types the seed owns
   * (published only, so Studio drafts are left alone); singleton page
   * documents are never touched.
   */
  const seeded = new Set(docs.map((doc) => doc._id as string));
  const listTypes = ["service", "clientStory", "faq"];
  const published = await client.fetch<string[]>(`*[_type in $types && !(_id in path("drafts.**"))]._id`, {
    types: listTypes,
  });
  const stale = published.filter((id) => !seeded.has(id));
  if (stale.length > 0) {
    console.log(`Clearing ${stale.length} document(s) no longer present in the content files`);
    for (const id of stale) tx = tx.delete(id);
  }

  await tx.commit();

  console.log("\nDone. Open /studio to edit.\n");
}

run().catch((error) => {
  console.error("\nSeeding failed:", error.message ?? error, "\n");
  process.exit(1);
});
