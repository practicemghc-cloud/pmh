import type { Metadata } from "next";
import { ServicesHero } from "@/components/sections/ServicesHero";
import { ServicesPanels } from "@/components/sections/ServicesPanels";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { getServicePanels, getSiteContent, getClosingCta } from "../../../../sanity/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Practice management, billing and collection, medical coding, embassy and international patients, and marketing — handled side by side with you.",
};

/** Figma page frame: "Services — High fidelity" (129:740). */
export default async function ServicesPage() {
  const [panels, siteContent, cta] = await Promise.all([
    getServicePanels(),
    getSiteContent(),
    getClosingCta(),
  ]);

  return (
    <>
      <ServicesHero services={siteContent.services} />
      <ServicesPanels panels={panels} services={siteContent.services} />
      <ClosingCta {...cta} />
    </>
  );
}
