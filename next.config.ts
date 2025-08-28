import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/codefactory',
  images: {
    unoptimized: true,
  },
  assetPrefix: '/codefactory',
  trailingSlash: true,
};

export default nextConfig;
