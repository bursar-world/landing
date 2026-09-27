import type { NextConfig } from 'next';

/** Every page is prerendered, so the build is a folder of HTML served from a CDN with no server. */
const config: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  poweredByHeader: false,
};

export default config;
