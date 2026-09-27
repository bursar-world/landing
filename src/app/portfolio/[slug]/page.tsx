import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { capabilities } from '../../_content';
import { Action } from '../../_components/action';
import { Eyebrow } from '../../_components/eyebrow';
import { pageMetadata } from '../../_components/metadata';
import { SiteFooter } from '../../_components/site-footer';
import { SiteHeader } from '../../_components/site-header';

export function generateStaticParams() {
  return capabilities.map((capability) => ({ slug: capability.slug }));
}

// Every capability shares one set of head tags, as it did on the original site.
export function generateMetadata(): Metadata {
  return pageMetadata({
    title: 'Bursar capability | Protocol detail',
    description:
      'How this Bursar capability works: budgets, funding lanes, and privacy guarantees for agent spending.',
    ogDescription: 'A closer look at one layer of the Bursar agent spending architecture.',
    type: 'article',
  });
}

export default async function CapabilityPage({ params }: { readonly params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const capability = capabilities.find((candidate) => candidate.slug === slug);
  if (!capability) notFound();
  return (
    <>
      <div className="inner-header">
        <SiteHeader />
      </div>
      <main id="top" className="inner-page">
        <a className="back-link" href="/portfolio">
          ← All capabilities
        </a>
        <h1>{capability.title}</h1>
        {/* eslint-disable-next-line @next/next/no-img-element -- matches the Lovable markup and CSS */}
        <img className="detail-hero" src={capability.image} alt={capability.name} />
        <article className="prose">
          <Eyebrow>{capability.category}</Eyebrow>
          <h2>{capability.name}</h2>
          <p>{capability.body}</p>
          <ul>
            {capability.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <Action>Configure a mandate</Action>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
