import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { dataset, projectId } from "./env";

const builder = projectId ? createImageUrlBuilder({ projectId, dataset }) : null;

/**
 * Turns a Sanity image reference into a URL, honouring the hotspot an editor
 * set in the Studio so crops keep the subject in frame.
 */
export function urlForImage(source: Image | undefined, width: number, height?: number) {
  if (!builder || !source) return null;
  let img = builder.image(source).width(width).auto("format").fit("crop");
  if (height) img = img.height(height);
  return img.url();
}

/** Sanity image shape once a query has pulled in the bits we render. */
export type SanityImage = Image & {
  alt?: string;
  asset?: { _ref?: string; url?: string };
};
