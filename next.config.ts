import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const isCustomDomain = process.env.CUSTOM_DOMAIN === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  // 커스텀 도메인 사용시 basePath 제거
  basePath: isCustomDomain ? '' : '/codefactory',
  images: {
    unoptimized: true,
  },
  // 커스텀 도메인 사용시 assetPrefix 제거
  assetPrefix: isCustomDomain ? '' : '/codefactory',
  trailingSlash: true,
};

export default nextConfig;
