import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com"],
    unoptimized: false,
  },
  experimental: {
    optimizePackageImports: ['firebase'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  generateEtags: false,
};

export default nextConfig;
