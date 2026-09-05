import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId, isSanityConfigured } from "./env";

/**
 * Read-only client. `null` until a project is configured, which lets callers
 * fall back to the built-in defaults instead of throwing at build time.
 */
const isDev = process.env.NODE_ENV === "development";

export const client: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // The CDN is worth it in production; in development an editor wants to
      // see what they just typed, not a copy up to a minute old.
      useCdn: !isDev,
      perspective: "published",
    })
  : null;

/**
 * Fetch helper that degrades instead of failing.
 *
 * Returns `null` when Sanity isn't configured or the query fails, so a page can
 * do `data ?? defaults` and always render something. A CMS outage should never
 * take the marketing site down.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = [],
): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params, {
      next: isDev
        ? { revalidate: 0 }
        : // Cached until the publish webhook clears the matching tag; the
          // hourly figure is only a backstop if the webhook is not set up.
          { revalidate: 3600, tags },
    });
  } catch (error) {
    console.error("[sanity] query failed, falling back to defaults:", error);
    return null;
  }
}
