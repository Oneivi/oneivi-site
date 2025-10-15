// next.config.mjs
import { withContentlayer } from 'next-contentlayer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { turbo: { /* si usas turbopack */ } },
}

export default withContentlayer(nextConfig)
