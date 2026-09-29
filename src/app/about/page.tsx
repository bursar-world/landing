import type { Metadata } from 'next';

import { Action } from '../_components/action';
import { Eyebrow } from '../_components/eyebrow';
import { pageMetadata } from '../_components/metadata';
import { Picture } from '../_components/picture';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { StructuredData, breadcrumbs } from '../_components/structured-data';

export const metadata: Metadata = pageMetadata({
  title: 'About Bursar | Your agents. Your limits.',
  description:
    'Bursar is the control layer for agent spending: budgets, RWA funding, and private mandates in one architecture.',
  ogDescription: 'Explicit authority for every delegated task, with a private ledger by design.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <div className="inner-header">
        <SiteHeader />
      </div>
      <main id="top" className="inner-page">
        <Eyebrow>About Bursar</Eyebrow>
        <h1>
          Your agents.
          <br />
          Your limits.
        </h1>
        <Picture
          image="brand/banner"
          className="detail-hero"
          alt="Bursar private budgets for AI agents"
          sizes="(max-width: 800px) calc(100vw - 48px), calc(100vw - 96px)"
          priority
        />
        <article className="prose">
          <h2>The control layer for agent spending.</h2>
          <p>
            Bursar brings budgets, RWA funding, and private mandates into one agent spending architecture. The principal
            defines what an agent may do. The agent acts within those boundaries.
          </p>
          <h2>Built around explicit authority.</h2>
          <p>
            Each mandate has a budget, period cap, expiry, permitted spend classes, and counterparty rules. Prefunded and
            collateralized lanes stay separate. The privacy architecture uses commitments and scoped proofs to protect the
            ledger while preserving accountability.
          </p>
          <h2>The Bursar workspace.</h2>
          <p>
            Prepare encrypted mandates, organize agents, inspect spending rules, and export your workspace. On-chain
            funding, settlement, and proof verification depend on an active protocol deployment.
          </p>
          <Action>Open dashboard</Action>
        </article>
        <StructuredData graph={[breadcrumbs([['About', '/about']])]} />
      </main>
      <SiteFooter />
    </>
  );
}
