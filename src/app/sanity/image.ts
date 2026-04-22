import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "./client";
import type { SanityImage } from "./types";

const builder = createImageUrlBuilder(client);

/**
 * Generate optimized image URLs from Sanity image references.
 *
 * Usage:
 *   urlFor(image).width(800).url()
 *   urlFor(image).width(400).height(300).format("webp").url()
 */
export function urlFor(source: SanityImage) {
  return builder.image(source);
}
