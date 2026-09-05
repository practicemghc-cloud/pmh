import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Coming Soon",
  robots: { index: false },
};

/**
 * The pre-launch holding page. Kept on its own route now that the designed
 * site occupies `/` — point the root here again if the site needs to go back
 * behind a holding page.
 */
export default function ComingSoonPage() {
  return <ComingSoon />;
}
