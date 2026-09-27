import type { Metadata } from 'next';

import { Eyebrow } from '../_components/eyebrow';
import { pageMetadata } from '../_components/metadata';
import { SiteHeader } from '../_components/site-header';

export const metadata: Metadata = pageMetadata({
  title: 'Bursar terms of use',
  description:
    'Terms covering the Bursar workspace, protocol transactions, asset eligibility, and your responsibilities.',
  ogDescription: 'What saving a mandate does, and does not, do.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <>
      <div className="inner-header">
        <SiteHeader />
      </div>
      <main className="inner-page legal-page">
        <Eyebrow>Last updated / September 2026</Eyebrow>
        <h1>Terms of use.</h1>
        <article className="prose">
          <h2>The workspace</h2>
          <p>
            Bursar’s workspace lets you prepare and manage agent spending mandates. Saving a mandate does not transfer
            funds, deploy a contract, create credit, or activate an on-chain spending authorization.
          </p>
          <h2>Protocol transactions</h2>
          <p>
            On-chain activity requires an active protocol deployment, eligible assets, and authorization through your
            wallet. A saved draft or a dashboard rule check is not evidence of an executed transaction or a
            cryptographic proof.
          </p>
          <h2>Assets and eligibility</h2>
          <p>
            Tokenized stocks and treasury tokens may be subject to jurisdiction and eligibility restrictions. Asset
            values can change. NAV-based accounting is not a promised return. Collateralized credit has distinct debt
            and liquidation risks.
          </p>
          <h2>Your responsibilities</h2>
          <p>
            Review mandate limits, counterparties, expiry, and funding before authorizing any on-chain action. Protect
            your passphrase and wallet credentials, and use the service only for activity you are authorized to
            conduct.
          </p>
          <h2>Records and availability</h2>
          <p>
            Keep your own encrypted backup of important workspace records. Network services and integrations may be
            unavailable. Do not treat a pending operation as a completed settlement.
          </p>
          <a href="/" className="text-link">
            Return home →
          </a>
        </article>
      </main>
    </>
  );
}
