import type { Metadata } from 'next';

import { pageMetadata } from '../_components/metadata';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';

export const metadata: Metadata = pageMetadata({
  title: 'Contact Bursar | Join the community',
  description: 'Follow Bursar on X and Telegram for updates, conversations, and a direct line to our community.',
  ogDescription: 'Give autonomy a boundary. Reach the Bursar community channels.',
});

/** The footer carries the contact block, so this page is the header and the footer alone. */
export default function ContactPage() {
  return (
    <>
      <div id="top" className="inner-header">
        <SiteHeader />
      </div>
      <SiteFooter />
    </>
  );
}
