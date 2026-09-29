import type { NextConfig } from 'next';

/** Every page is prerendered, so the build is a folder of HTML served from a CDN with no server. */
const config: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  poweredByHeader: false,
  // The stylesheet ships inside each page, so first paint does not wait on a second request.
  experimental: { inlineCss: true },
};

export default config;
