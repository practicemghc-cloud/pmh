import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { getSiteContent } from "../../sanity/content";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

/**
 * The High Fi frames are set in Instrument Sans; Urbanist is used here as the
 * project typeface instead. Weights and tracking are carried over unchanged.
 */
const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

/**
 * Built from the SEO tab in Site settings, so an editor controls the browser
 * tab title, the search-result description, keywords and the image that shows
 * when the site is shared — without touching code.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSiteContent();

  return {
    title: { default: seo.metaTitle, template: `%s — ${site.name} ${site.wordmarkSub}` },
    description: seo.metaDescription,
    keywords: seo.keywords.length > 0 ? seo.keywords : undefined,
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      type: "website",
      images: seo.shareImage
        ? [{ url: seo.shareImage, alt: seo.shareImageAlt ?? seo.metaTitle }]
        : undefined,
    },
    twitter: {
      card: seo.shareImage ? "summary_large_image" : "summary",
      title: seo.metaTitle,
      description: seo.metaDescription,
      images: seo.shareImage ? [seo.shareImage] : undefined,
    },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${urbanist.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full font-sans">
        {/*
          Runs synchronously while the HTML is parsed, before the first paint,
          so reveal animations get their hidden start state without a flash —
          and without stranding content invisible if JS never arrives.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              `var e=document.documentElement;e.classList.add("js-motion");` +
              `setTimeout(function(){if(!e.hasAttribute("data-motion-ready"))` +
              `e.classList.remove("js-motion")},2500)`,
          }}
        />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
