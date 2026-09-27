import type { Metadata } from 'next';

import { pageMetadata } from '../_components/metadata';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';

export const metadata: Metadata = pageMetadata({
  title: 'Contact Bursar | Join the community',
  description: 'Email Bursar at hello@bursar.world, follow Bursar on X for updates, and find the code on GitHub.',
  ogDescription: 'Give autonomy a boundary. Email Bursar or reach the community channels.',
  path: '/contact',
});

/** The footer carries the contact block, so this page is the header and the footer alone. */
export default function ContactPage() {
  return (
    <>
      <div id="top" className="inner-header">
        <SiteHeader />
      </div>
      <SiteFooter contact />
    </>
  );
}
