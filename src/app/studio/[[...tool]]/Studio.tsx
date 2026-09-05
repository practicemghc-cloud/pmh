"use client";

import { NextStudio } from "next-sanity/studio/client-component";
import config from "../../../../sanity.config";

/**
 * The Studio has to be mounted from a client component.
 *
 * Importing `sanity.config.ts` from the server component pulled the whole
 * Studio bundle into the RSC graph, where dependencies resolve to their
 * `react-server` builds — `swr` has no default export there, and the build
 * fails. Keeping the config behind this boundary avoids that entirely.
 */
export default function Studio() {
  return <NextStudio config={config} />;
}
