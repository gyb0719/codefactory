import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: isProd ? 'export' : undefined,
  basePath: isProd ? '/codefactory' : '',
  images: {
    unoptimized: true,
  },
  assetPrefix: isProd ? '/codefactory' : '',
  trailingSlash: true,
};

export default nextConfig;
