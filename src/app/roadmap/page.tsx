import type { Metadata } from 'next';

import { ENDOW_HREF, roadmap, shipped } from '../_content';
import { Action } from '../_components/action';
import { Eyebrow } from '../_components/eyebrow';
import { pageMetadata } from '../_components/metadata';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { StructuredData, breadcrumbs } from '../_components/structured-data';

export const metadata: Metadata = pageMetadata({
  title: 'Bursar roadmap | What is live and what comes next',
  description:
    'What you can use on Bursar today and what we are building next: the first endowments, $BURSAR at the center of the protocol, x402 on Base and limits that grow with a clean record.',
  ogDescription: 'What is live on Bursar, and what comes next.',
  path: '/roadmap',
});

export default function RoadmapPage() {
  return (
    <>
      <div className="inner-header">
        <SiteHeader />
      </div>
      <main id="top" className="inner-page">
        <Eyebrow>Roadmap / November 2026</Eyebrow>
        <h1>What comes next.</h1>
        <p className="roadmap-lead">
          What we are building on Bursar, and everything already live. Plans ahead can change; the console shows what you
          can use today.
        </p>
        <div className="roadmap">
          {roadmap.map((stage) => (
            <section key={stage.label} className="roadmap-stage">
              <header>
                <Eyebrow>{stage.label}</Eyebrow>
                <p>{stage.note}</p>
              </header>
              <ol>
                {stage.items.map((item) => (
                  <li key={item.title}>
                    <h2>{item.title}</h2>
                    <p>{item.copy}</p>
                  </li>
                ))}
              </ol>
            </section>
          ))}
          <section className="roadmap-stage roadmap-shipped">
            <header>
              <Eyebrow>Live</Eyebrow>
              <p>Newest first</p>
            </header>
            <ol>
              {shipped.map(([month, title]) => (
                <li key={title}>
                  <span className="roadmap-date">{month}</span>
                  <h2>{title}</h2>
                </li>
              ))}
            </ol>
          </section>
        </div>
        <div className="roadmap-action">
          <Action href={ENDOW_HREF}>Endow an agent</Action>
        </div>
        <StructuredData graph={[breadcrumbs([['Roadmap', '/roadmap']])]} />
      </main>
      <SiteFooter />
    </>
  );
}
