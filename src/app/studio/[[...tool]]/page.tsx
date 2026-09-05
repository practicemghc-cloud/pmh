import type { Metadata, Viewport } from "next";
import Studio from "./Studio";

/**
 * The Sanity Studio, embedded at /studio.
 *
 * Editors just visit the URL — there's no second app to install or run. The
 * route sits outside the (site) group so it gets none of the marketing chrome.
 */
export const dynamic = "force-static";

// Set explicitly rather than re-exported from next-sanity, so the root layout's
// title template doesn't leave the Studio tab reading like a marketing page.
export const metadata: Metadata = {
  title: "PMG content editor",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export default function StudioPage() {
  return <Studio />;
}
