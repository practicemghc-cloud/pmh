import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Images uploaded in the Studio are served from Sanity's CDN.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
