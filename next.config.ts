// next.config.ts
import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer2";

const config: NextConfig = {
  eslint: { ignoreDuringBuilds: true }, // evita el error "ESLint must be installed..."
  experimental: { forceSwcTransforms: true },
  // Si usabas experimental.turbo, migra a:
  // turbopack: { enabled: true },
};

export default withContentlayer(config);
