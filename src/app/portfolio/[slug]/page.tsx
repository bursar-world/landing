import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CREATE_HREF, capabilities } from '../../_content';
import { Action } from '../../_components/action';
import { Eyebrow } from '../../_components/eyebrow';
import { pageMetadata } from '../../_components/metadata';
import { Picture } from '../../_components/picture';
import { SiteFooter } from '../../_components/site-footer';
import { SiteHeader } from '../../_components/site-header';
import { StructuredData, breadcrumbs } from '../../_components/structured-data';

export function generateStaticParams() {
  return capabilities.map((capability) => ({ slug: capability.slug }));
}

export async function generateMetadata({ params }: { readonly params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const capability = capabilities.find((candidate) => candidate.slug === slug);
  if (!capability) return {};
  return pageMetadata({
    title: `${capability.name} for AI agents | Bursar`,
    description: capability.description,
    ogDescription: capability.summary,
    path: `/portfolio/${capability.slug}`,
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
        <Picture
          image={capability.image}
          className="detail-hero"
          alt={capability.name}
          sizes="(max-width: 800px) calc(100vw - 48px), calc(100vw - 96px)"
          priority
        />
        <article className="prose">
          <Eyebrow>{capability.category}</Eyebrow>
          <h2>{capability.name}</h2>
          <p>{capability.body}</p>
          <ul>
            {capability.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <Action href={CREATE_HREF}>Configure a mandate</Action>
        </article>
        <StructuredData
          graph={[
            breadcrumbs([
              ['Capabilities', '/portfolio'],
              [capability.name, `/portfolio/${capability.slug}`],
            ]),
          ]}
        />
      </main>
      <SiteFooter />
    </>
  );
}
