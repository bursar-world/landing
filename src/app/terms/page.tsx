import type { Metadata } from 'next';

import { Eyebrow } from '../_components/eyebrow';
import { pageMetadata } from '../_components/metadata';
import { SiteHeader } from '../_components/site-header';

export const metadata: Metadata = pageMetadata({
  title: 'Bursar terms of use',
  description:
    'Terms covering Bursar endowments, patron gifts, the workspace, protocol transactions, asset eligibility and your responsibilities.',
  ogDescription: 'What an endowment, a gift and a mandate do, and do not, do.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <>
      <div className="inner-header">
        <SiteHeader />
      </div>
      <main className="inner-page legal-page">
        <Eyebrow>Last updated / October 2026</Eyebrow>
        <h1>Terms of use.</h1>
        <article className="prose">
          <h2>Endowments</h2>
          <p>
            An endowment is a contract on Robinhood Chain that holds a principal in listed stock tokens and USDG and pays
            an agent a draw. Its terms are fixed when it is created, except the successor its creator may name. The draw is
            set by the contract’s rule each quarter, can fall, and stops while the principal is worth less than 80% of what
            was put in. 1% of each draw goes to the Bursar treasury. A guardian key can pause an endowment’s draw; it
            cannot move the principal.
          </p>
          <h2>Gifts and patron marks</h2>
          <p>
            A gift to an endowment is final once the agent’s owner accepts the endowment. If the owner has not accepted
            within 180 days of its creation, each patron may take back their share of what it holds, in kind, at its value
            at that time. A patron mark records a gift. It cannot be transferred and gives no claim on the principal, the
            draw or any return. Nothing on Bursar is investment advice or a promise of return.
          </p>
          <h2>Agents and owners</h2>
          <p>
            An endowment pays whoever owns the agent’s ERC-8004 identity, through the mandate that owner names. Bursar does
            not verify who runs an agent or what it does with its draw. Give only to agents you are prepared to fund.
          </p>
          <h2>The workspace</h2>
          <p>
            Bursar’s workspace lets you prepare and manage agent spending mandates. Saving a draft does not transfer funds,
            deploy a contract, create credit or activate an on-chain spending authorization.
          </p>
          <h2>Protocol transactions</h2>
          <p>
            On-chain activity requires an active protocol deployment, eligible assets, and authorization through your
            wallet. A saved draft or a dashboard rule check is not evidence of an executed transaction or a
            cryptographic proof.
          </p>
          <h2>Assets and eligibility</h2>
          <p>
            Stock tokens on Robinhood Chain are issued by a third party, are not available in every country or to US
            persons, and can be paused by their issuer. Their value changes, and so does the value of an endowment that
            holds them. Collateralized credit has its own debt and liquidation risks.
          </p>
          <h2>Your responsibilities</h2>
          <p>
            Review an endowment’s terms, or a mandate’s limits, counterparties, expiry and funding, before you sign. Protect
            your passphrase and wallet credentials, and use the service only for activity you are authorized to conduct.
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
