import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/codefactory',
  images: {
    unoptimized: true,
  },
  // GitHub Pages에서 _next 폴더 처리를 위한 설정
  assetPrefix: '/codefactory',
  trailingSlash: true,
};

export default nextConfig;
