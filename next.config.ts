// next.config.ts
import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer";

const config: NextConfig = {
  experimental: { forceSwcTransforms: true },
};

export default withContentlayer(config);
