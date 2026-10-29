import type { Metadata } from "next";
import { ContactHero } from "@/components/sections/ContactHero";
import { ContactWhatHappens } from "@/components/sections/ContactWhatHappens";
import { ContactExtendedFaqs } from "@/components/sections/ContactExtendedFaqs";
import { getContactFaqs, getSiteContent } from "../../../../sanity/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a no-obligation conversation about your practice — we’ll explain exactly which services fit and what they cost.",
};

/** Figma page frame: "Contact — High fidelity" (139:842). */
export default async function ContactPage() {
  const [categories, { site }] = await Promise.all([getContactFaqs(), getSiteContent()]);

  return (
    <>
      <ContactHero site={site} />
      <ContactWhatHappens />
      <ContactExtendedFaqs categories={categories} />
    </>
  );
}
