import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { getSiteContent } from "../../../sanity/content";

/**
 * Shared chrome for the four designed pages. Every High Fi page frame carries
 * the floating nav and the same footer, so both live here rather than in each
 * page. `/coming-soon` sits outside this group and gets neither.
 *
 * Nav and footer content is fetched once here and passed down, so the two
 * components stay presentational and there's a single request per render.
 */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const content = await getSiteContent();

  return (
    <>
      <span id="top" />
      <SiteNav
        links={content.navLinks}
        primaryCta={content.navPrimaryCta}
        secondaryCta={content.navSecondaryCta}
        services={content.services}
      />
      <main>{children}</main>
      <SiteFooter
        site={content.site}
        columns={content.footerColumns}
        services={content.services}
        socialLinks={content.socialLinks}
      />
      <WhatsAppButton />
    </>
  );
}
