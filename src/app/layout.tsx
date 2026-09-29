import type { Metadata, Viewport } from 'next';
import { preload } from 'react-dom';

import { SITE_URL } from './_components/metadata';
import { SiteMotion } from './_components/site-motion';
import { StructuredData, organization, website } from './_components/structured-data';
import './site.css';
import './site-extra.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Bursar | Private budgets for AI agents',
  description: 'Private mandates, RWA-funded budgets, and on-chain spending controls for AI agents.',
  applicationName: 'Bursar',
  authors: [{ name: 'Bursar', url: SITE_URL }],
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32' },
      { url: '/icons/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/icons/favicon-48.png', type: 'image/png', sizes: '48x48' },
    ],
    apple: { url: '/icons/apple-touch-icon.png', sizes: '180x180' },
  },
  openGraph: {
    title: 'Bursar | Private budgets for AI agents',
    description: 'Give your agents a budget, not your bank. And keep the ledger private.',
    type: 'website',
    siteName: 'Bursar',
    locale: 'en_US',
    images: [{ url: '/og/home.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@UseBursar',
    title: 'Bursar | Private budgets for AI agents',
    description: 'Give your agents a budget, not your bank. And keep the ledger private.',
    images: ['/og/home.jpg'],
  },
};

export const viewport: Viewport = { themeColor: '#faf8f7' };

export default function SiteLayout({ children }: { readonly children: React.ReactNode }) {
  // Both faces are on screen in the first viewport of every page, so fetch them with the HTML.
  preload('/fonts/zalando.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });
  preload('/fonts/geist-mono.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });
  return (
    <html lang="en">
      <body>
        {children}
        <StructuredData graph={[organization, website]} />
        <SiteMotion />
      </body>
    </html>
  );
}
