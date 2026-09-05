import { sanityFetch } from "./client";
import {
  siteSettingsQuery,
  servicesQuery,
  closingCtaQuery,
  generalFaqsQuery,
  contactFaqsQuery,
  clientStoriesQuery,
} from "./queries";

import { site, navLinks, footerColumns, services as defaultServices, ctaReassurance } from "@/lib/site";
import { homeFaqs, contactFaqCategories, type Faq } from "@/lib/faqs";
import { clientStories as defaultStories, type ClientStory } from "@/lib/stories";
import { servicePanels as defaultPanels } from "@/lib/services-detail";
import type { IconName } from "@/components/ui/Icon";

/**
 * Resolves published content, falling back to the copy that ships with the
 * code (`src/lib/*`, taken from the Figma file).
 *
 * The fallback is per-field, not per-page: an editor who fills in three fields
 * still gets a complete page, and an empty or unreachable Sanity project leaves
 * the site exactly as it is today. That also means the CMS can be adopted
 * gradually rather than in one risky switchover.
 */

/** The platforms the footer knows how to render an icon for. */
export type SocialPlatform = "facebook" | "instagram" | "linkedin" | "x" | "youtube";

export type SocialLink = { platform: SocialPlatform; url: string };

/** Returns the CMS value only when it's actually present. */
const pick = <T,>(value: T | null | undefined, fallback: T): T =>
  value === null || value === undefined || value === "" ? fallback : value;

/** Same, for lists — an empty array from a query means "not filled in yet". */
const pickList = <T,>(value: readonly T[] | null | undefined, fallback: readonly T[]): readonly T[] =>
  value && value.length > 0 ? value : fallback;

/* -- Shared chrome --------------------------------------------------------- */

export type SiteContent = Awaited<ReturnType<typeof getSiteContent>>;

export async function getSiteContent() {
  const [settings, cmsServices] = await Promise.all([
    sanityFetch<{
      description?: string;
      email?: string;
      phone?: string;
      officeHours?: string;
      copyright?: string;
      metaTitle?: string;
      metaDescription?: string;
      keywords?: string[];
      shareImage?: { url?: string; alt?: string };
      socialLinks?: { platform: SocialPlatform; url: string }[];
      navLinks?: { label: string; href: string }[];
      navPrimaryCta?: { label: string; href: string };
      navSecondaryCta?: { label: string; href: string };
      footerCompanyLinks?: { label: string; href: string | null }[];
      footerLegalLinks?: { label: string; href: string | null }[];
    }>(siteSettingsQuery, {}, ["siteSettings"]),
    sanityFetch<
      {
        slug: string;
        name: string;
        tabLabel: string;
        footerLabel: string;
        blurb: string;
        icon: IconName;
      }[]
    >(servicesQuery, {}, ["service"]),
  ]);

  const services = pickList(cmsServices, defaultServices).map((s) => ({
    slug: s.slug,
    name: s.name,
    tabLabel: s.tabLabel,
    footerLabel: s.footerLabel,
    blurb: s.blurb,
    icon: s.icon as IconName,
  }));

  const defaultCompany = footerColumns[1].links;
  const defaultLegal = footerColumns[2].links;

  return {
    site: {
      name: site.name,
      wordmarkSub: site.wordmarkSub,
      description: pick(settings?.description, site.description),
      email: pick(settings?.email, site.email),
      phone: pick(settings?.phone, site.phone),
      officeHours: pick(settings?.officeHours, "[ Mon–Fri, 00:00–00:00 ]"),
      copyright: pick(settings?.copyright, site.copyright),
    },
    seo: {
      // Falls back through the chain an editor would expect: the dedicated SEO
      // field, then the company description, then the built-in copy.
      metaTitle: pick(settings?.metaTitle, "PMG Healthcare — Complete Practice Management"),
      metaDescription: pick(
        settings?.metaDescription,
        pick(settings?.description, site.description),
      ),
      keywords: [...(settings?.keywords ?? [])],
      shareImage: settings?.shareImage?.url ?? null,
      shareImageAlt: settings?.shareImage?.alt ?? null,
    },
    socialLinks: (settings?.socialLinks ?? []).filter(
      (l): l is SocialLink => Boolean(l?.platform && l?.url),
    ),
    navLinks: pickList(settings?.navLinks, navLinks).map((l) => ({
      label: l.label,
      href: l.href,
      // The Services entry always gets the mega menu, however it's ordered.
      hasMegaMenu: l.href === "/services",
    })),
    navPrimaryCta: pick(settings?.navPrimaryCta, { label: "Book a Call", href: "/contact#book" }),
    navSecondaryCta: pick(settings?.navSecondaryCta, {
      label: "Send an enquiry",
      href: "/contact",
    }),
    services,
    footerColumns: [
      {
        heading: "SERVICES",
        width: "w-[250px]",
        links: services.map((s) => ({ label: s.footerLabel, href: `/services#${s.slug}` })),
      },
      {
        heading: "COMPANY",
        width: "w-[170px]",
        links: pickList(settings?.footerCompanyLinks, defaultCompany),
      },
      {
        heading: "LEGAL",
        width: "w-[170px]",
        links: pickList(settings?.footerLegalLinks, defaultLegal),
      },
    ] as const,
  };
}

/* -- Closing CTA ----------------------------------------------------------- */

export async function getClosingCta() {
  const cms = await sanityFetch<{
    headline?: string;
    headlineAccent?: string;
    body?: string;
    reassurance?: { icon: IconName; label: string }[];
  }>(closingCtaQuery, {}, ["closingCta"]);

  return {
    headline: pick(cms?.headline, "Focus on your patients."),
    headlineAccent: pick(cms?.headlineAccent, "We’ll handle the rest."),
    body: pick(
      cms?.body,
      "Book a no-obligation conversation. We’ll listen to how your practice works today and explain exactly which services fit — and what they cost.",
    ),
    reassurance: pickList(cms?.reassurance, ctaReassurance),
  };
}

/* -- FAQs and stories ------------------------------------------------------ */

export async function getGeneralFaqs(): Promise<Faq[]> {
  const cms = await sanityFetch<{ question: string; answer: string | null }[]>(
    generalFaqsQuery,
    {},
    ["faq"],
  );
  return [...pickList(cms, homeFaqs)];
}

export async function getContactFaqs() {
  const cms = await sanityFetch<
    { question: string; answer: string | null; topic: string | null }[]
  >(contactFaqsQuery, {}, ["faq"]);

  if (!cms || cms.length === 0) return contactFaqCategories;

  // Group flat CMS rows back into the page's topic rail, keeping topic order.
  const order = contactFaqCategories.map((c) => c.name);
  const byTopic = new Map<string, { question: string; answer: string | null }[]>();
  for (const row of cms) {
    const key = row.topic ?? order[0];
    byTopic.set(key, [...(byTopic.get(key) ?? []), { question: row.question, answer: row.answer }]);
  }
  const names = [...order, ...[...byTopic.keys()].filter((k) => !order.includes(k))];

  return names.map((name) => {
    const questions = byTopic.get(name) ?? [];
    return {
      name,
      plannedCount:
        questions.length || contactFaqCategories.find((c) => c.name === name)?.plannedCount || 0,
      questions,
    };
  });
}

export async function getClientStories(): Promise<ClientStory[]> {
  const cms = await sanityFetch<ClientStory[]>(clientStoriesQuery, {}, ["clientStory"]);
  return [...pickList(cms, defaultStories)];
}

/* -- Service panels (the Services page) ------------------------------------ */

export async function getServicePanels() {
  const cms = await sanityFetch<
    {
      slug: string;
      panelTitle: string;
      panelIntro: string;
      included: string[];
      steps: { title: string; body: string }[];
    }[]
  >(servicesQuery, {}, ["service"]);

  if (!cms || cms.length === 0) return defaultPanels;

  // Panel illustrations are part of the design, so they stay keyed to the slug.
  return cms.map((row, index) => {
    const fallback = defaultPanels.find((p) => p.slug === row.slug) ?? defaultPanels[index];
    return {
      slug: row.slug,
      eyebrow: `${String(index + 1).padStart(2, "0")} / ${String(cms.length).padStart(2, "0")}  ·  ${
        fallback?.eyebrow.split("·")[1]?.trim() ?? row.panelTitle
      }`,
      title: pick(row.panelTitle, fallback?.title ?? ""),
      intro: pick(row.panelIntro, fallback?.intro ?? ""),
      included: [...pickList(row.included, fallback?.included ?? [])],
      asset: fallback?.asset,
      steps: [...pickList(row.steps, fallback?.steps ?? [])],
    };
  });
}
