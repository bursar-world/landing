import type { Metadata } from 'next';

import { capabilities } from '../_content';
import { Eyebrow } from '../_components/eyebrow';
import { pageMetadata } from '../_components/metadata';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';

export const metadata: Metadata = pageMetadata({
  title: 'Bursar capabilities | Control by design',
  description:
    'Mandate controls, RWA funding, and confidential settlement: the capabilities behind Bursar agent budgets.',
  ogDescription: 'Explore the control, capital, and privacy layers of the Bursar protocol.',
});

export default function PortfolioPage() {
  return (
    <>
      <div className="inner-header">
        <SiteHeader />
      </div>
      <main id="top" className="inner-page">
        <Eyebrow>Protocol / capabilities</Eyebrow>
        <h1>
          Control.
          <br />
          By design.
        </h1>
        <div className="article-grid">
          {capabilities.map((capability) => (
            <a key={capability.slug} className="article-card" href={'/portfolio/' + capability.slug}>
              {/* eslint-disable-next-line @next/next/no-img-element -- matches the Lovable markup and CSS */}
              <img className="article-art" src={capability.image} alt={capability.name} />
              <Eyebrow>{capability.category}</Eyebrow>
              <h3>{capability.title}</h3>
              <p>{capability.summary}</p>
              <span className="text-link">Explore →</span>
            </a>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
