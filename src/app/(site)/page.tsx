import { HomeHero } from "@/components/sections/HomeHero";
import { WhatWeHandle } from "@/components/sections/WhatWeHandle";
import { WhyChoosePmg } from "@/components/sections/WhyChoosePmg";
import { ClientStories } from "@/components/sections/ClientStories";
import { GettingStarted } from "@/components/sections/GettingStarted";
import { FaqSection } from "@/components/sections/FaqSection";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { getClientStories, getGeneralFaqs, getClosingCta } from "../../../sanity/content";

/** Figma page frame: "Home" (88:1734) — sections in artboard order. */
export default async function HomePage() {
  const [stories, faqs, cta] = await Promise.all([
    getClientStories(),
    getGeneralFaqs(),
    getClosingCta(),
  ]);

  return (
    <>
      <HomeHero />
      <WhatWeHandle />
      <WhyChoosePmg />
      <ClientStories stories={stories} />
      <GettingStarted />
      <FaqSection items={faqs} />
      <ClosingCta {...cta} />
    </>
  );
}
