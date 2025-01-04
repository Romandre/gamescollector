import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.igdb.com",
      },
    ],
    domains: ["localhost", "images.igdb.com"],
  },
};

export default nextConfig;
