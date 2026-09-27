import type { Metadata } from 'next';

import { SiteMotion } from './_components/site-motion';
import './site.css';
import './site-extra.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bursar.world'),
  title: 'Bursar | Private budgets for AI agents',
  description: 'Private mandates, RWA-funded budgets, and on-chain spending controls for AI agents.',
  authors: [{ name: 'Bursar' }],
  icons: { icon: { url: '/brand/mark.png', type: 'image/png' } },
  openGraph: {
    title: 'Bursar | Private budgets for AI agents',
    description: 'Give your agents a budget, not your bank. And keep the ledger private.',
    type: 'website',
    images: ['/brand/banner.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bursar | Private budgets for AI agents',
    description: 'Give your agents a budget, not your bank. And keep the ledger private.',
    images: ['/brand/banner.png'],
  },
};

export default function SiteLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SiteMotion />
      </body>
    </html>
  );
}
