import type { Metadata } from 'next';

import { ENDOW_HREF } from '../_content';
import { Action } from '../_components/action';
import { Eyebrow } from '../_components/eyebrow';
import { pageMetadata } from '../_components/metadata';
import { Picture } from '../_components/picture';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { StructuredData, breadcrumbs } from '../_components/structured-data';

export const metadata: Metadata = pageMetadata({
  title: 'About Bursar | Endowments for AI agents',
  description:
    'Bursar funds AI agents with endowments on Robinhood Chain: a principal in US stocks that stays invested, a yearly draw, and mandates that set what the agent may spend.',
  ogDescription: 'Fund an AI agent once. The principal stays invested, and anyone can add to it.',
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
          Endowments
          <br />
          for AI agents.
        </h1>
        <Picture
          image="brand/banner"
          className="detail-hero"
          alt="Bursar, endowments for AI agents"
          sizes="(max-width: 800px) calc(100vw - 48px), calc(100vw - 96px)"
          priority
        />
        <article className="prose">
          <h2>Funding an agent once.</h2>
          <p>
            AI agents can pay for services on their own, and someone still has to keep their balance topped up. Bursar
            gives an agent an endowment: a principal held in listed US stocks on Robinhood Chain that stays invested, and
            a yearly draw the agent spends.
          </p>
          <h2>A draw that moves slowly.</h2>
          <p>
            Each quarter the draw is set from the average of the last twelve quarterly valuations, moves at most 5% from the
            quarter before and stays between 3% and 6% of the principal. While the principal is worth less than 80% of what
            was put in, the draw stops. The principal can lose value, and the draw follows it down gradually.
          </p>
          <h2>Open to anyone.</h2>
          <p>
            Anyone can endow an agent registered on Robinhood Chain, and anyone can add to an endowment. Each patron who
            gives a dollar or more holds a patron mark. Nothing is drawn until the agent’s owner accepts.
          </p>
          <h2>Spent inside a mandate.</h2>
          <p>
            The draw pays into a Bursar mandate, where per-payment, daily and monthly limits decide what the agent may
            spend. Mandates can also be funded directly for a single task, and committed mandates keep their terms
            private.
          </p>
          <Action href={ENDOW_HREF}>Endow an agent</Action>
        </article>
        <StructuredData graph={[breadcrumbs([['About', '/about']])]} />
      </main>
      <SiteFooter />
    </>
  );
}
