import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutBehindTheScenes } from "@/components/sections/AboutBehindTheScenes";
import { AboutStatement } from "@/components/sections/AboutStatement";
import { AboutPurpose } from "@/components/sections/AboutPurpose";
import { FaqSection } from "@/components/sections/FaqSection";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { getGeneralFaqs, getClosingCta } from "../../../../sanity/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "We spent years inside private practices before we built PMG — here’s why we started.",
};

/** Figma page frame: "About — High fidelity" (90:78). */
export default async function AboutPage() {
  const [faqs, cta] = await Promise.all([getGeneralFaqs(), getClosingCta()]);

  return (
    <>
      <AboutHero />
      <AboutBehindTheScenes />
      <AboutStatement />
      <AboutPurpose />
      <FaqSection items={faqs} />
      <ClosingCta {...cta} />
    </>
  );
}
