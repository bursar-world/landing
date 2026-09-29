import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bursar',
    short_name: 'Bursar',
    description: 'Private mandates, RWA-funded budgets, and on-chain spending controls for AI agents.',
    start_url: '/',
    display: 'browser',
    background_color: '#faf8f7',
    theme_color: '#faf8f7',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
