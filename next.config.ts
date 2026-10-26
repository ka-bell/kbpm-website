import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Allow phone / LAN access to the Next.js dev overlay & HMR assets
  allowedDevOrigins: ["192.168.0.119", "127.0.0.1", "localhost"],
  eslint: {
    // Legacy TanStack route files + copy apostrophes; lint separately in CI if needed.
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default withNextIntl(nextConfig);
