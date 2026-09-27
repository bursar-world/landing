import type { Metadata } from 'next';

import { Eyebrow } from '../_components/eyebrow';
import { pageMetadata } from '../_components/metadata';
import { SiteHeader } from '../_components/site-header';

export const metadata: Metadata = pageMetadata({
  title: 'Bursar privacy policy',
  description: 'How Bursar handles your encrypted workspace, your passphrase, wallet connections, and exports.',
  ogDescription: 'Workspace data is encrypted in your browser before it is stored.',
});

export default function PrivacyPage() {
  return (
    <>
      <div className="inner-header">
        <SiteHeader />
      </div>
      <main className="inner-page legal-page">
        <Eyebrow>Last updated / September 2026</Eyebrow>
        <h1>Privacy policy.</h1>
        <article className="prose">
          <h2>Your workspace data</h2>
          <p>
            Saved mandate terms and agent information are encrypted in your browser using your workspace passphrase
            before being stored. In browser storage mode, the encrypted workspace stays on this device. With cloud
            storage configured, the service retains the encrypted workspace, its update time, and your account
            identifier so it can return the workspace only to you.
          </p>
          <h2>Your passphrase</h2>
          <p>
            The workspace passphrase is not sent to the server. Keep it safe: the service cannot recover an encrypted
            workspace if you lose it. An unlocked browser can read the workspace until you lock it or close the page.
          </p>
          <h2>Community channels</h2>
          <p>
            Our contact page points to the Bursar community channels. Do not share wallet secrets, workspace
            passphrases, or private mandate terms in public conversations.
          </p>
          <h2>External services</h2>
          <p>
            The website serves its stock imagery and fonts locally. Connecting a wallet exposes the address you approve
            to this page; no transaction is submitted without a separate wallet action.
          </p>
          <h2>Control and export</h2>
          <p>
            You can export an encrypted workspace backup, lock your workspace, and edit or remove drafts. Exported
            readable records contain the information you select, so keep them private. Visit our contact page for
            community channels.
          </p>
          <a href="/contact" className="text-link">
            Contact Bursar →
          </a>
        </article>
      </main>
    </>
  );
}
