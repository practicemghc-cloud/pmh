/**
 * Sanity connection details.
 *
 * Everything here is optional on purpose: the site must build and run before
 * anyone has connected a Sanity project. When `projectId` is missing the app
 * falls back to the content baked into `src/lib/content/defaults.ts`, so
 * nothing breaks — you just can't edit it yet.
 */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

/** Pinned so query behaviour can't change under us. */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-10-01";

/** True once a project is connected. */
export const isSanityConfigured = Boolean(projectId);
