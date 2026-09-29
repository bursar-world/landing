import type { Metadata } from 'next';

import {
  CONSOLE_HREF,
  CREATE_HREF,
  WORKSPACE_HREF,
  laneHref,
  capabilities,
  faq,
  lanes,
  marqueeItems,
  metrics,
  posts,
  processSteps,
  roles,
  services,
  stats,
} from './_content';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './_components/accordion';
import { Action } from './_components/action';
import { CountUp } from './_components/count-up';
import { Eyebrow } from './_components/eyebrow';
import { ArrowUpRight, ShieldCheck } from './_components/icons';
import { pageMetadata } from './_components/metadata';
import { Picture } from './_components/picture';
import { SectionHeading } from './_components/section-heading';
import { SiteFooter } from './_components/site-footer';
import { SiteHeader } from './_components/site-header';
import { Socials } from './_components/socials';
import { SplitWords } from './_components/split-words';
import { StructuredData, faqPage } from './_components/structured-data';

export const metadata: Metadata = pageMetadata({
  title: 'Bursar | Private budgets for AI agents',
  description:
    'Bursar sets private spending mandates for AI agents: a budget, period caps, allowed counterparties, and expiry, funded with USDG or treasury tokens.',
  ogDescription: 'Give your agents a budget, not your bank. And keep the ledger private.',
  path: '/',
});

export default function LandingPage() {
  return (
    <main id="top">
      <section className="hero">
        <Picture
          image="stock/glass"
          className="hero-stock"
          alt="Flowing translucent glass in peach and pale blue"
          sizes="108vw"
          priority
        />
        <div className="hero-tint" />
        <SiteHeader />
        <div className="hero-copy">
          <p>
            Give your agents a budget,
            <br />
            not your bank.
            <br />
            <span>And keep the ledger private.</span>
          </p>
          <div>
            <p>
              <small>/01</small> Private mandates
            </p>
            <p>
              <small>/02</small> RWA-funded budgets
            </p>
            <p>
              <small>/03</small> On-chain control
            </p>
          </div>
        </div>
        <div className="hero-bottom">
          <div className="hero-status">
            <Picture image="brand/logo" alt="Bursar symbol" sizes="44px" eager />
            <div>
              PRIVATE BY DESIGN
              <div className="tiny">YOUR AGENTS. YOUR LIMITS.</div>
            </div>
          </div>
          <h1>
            BURSAR<sup>®</sup>
          </h1>
        </div>
      </section>
      <div className="marquee">
        <div>
          {Array.from({ length: 3 }, (_, set) => (
            <div key={set} className="marquee-set">
              {marqueeItems.map((item) => (
                <span key={item}>
                  <b>✧</b>
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <section id="mission" className="mission section-grid">
        <aside>
          <div className="identity-card">
            <Picture
              image="brand/logo"
              alt="Bursar deep plum logo on peach and pale blue"
              sizes="(max-width: 800px) 92vw, 24vw"
            />
            <Action>
              Take control <small>/Bursar</small>
            </Action>
            <div className="identity-title">
              <Eyebrow>Bursar</Eyebrow>
              <Socials />
            </div>
            <dl>
              <div>
                <dt>Purpose</dt>
                <dd>Private agent budgets</dd>
              </div>
              <div>
                <dt>Network</dt>
                <dd>Robinhood Chain</dd>
              </div>
            </dl>
          </div>
        </aside>
        <div className="mission-main">
          <div className="label-row">
            <Eyebrow n="01">Our mission</Eyebrow>
            <span className="eyebrow">©2026 BURSAR</span>
          </div>
          <SplitWords scroll className="mission-statement">
            Agents already spend your money. Bursar decides how much, on what, with whom, and keeps it between you and
            the code.
          </SplitWords>
          <div className="metric-grid">
            {metrics.map(([value, title, copy]) => (
              <div key={title} className="metric">
                <Eyebrow>{title}</Eyebrow>
                <CountUp value={Number(value)} />
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <LandingSections />
      <StructuredData graph={[faqPage(faq)]} />
    </main>
  );
}

function LandingSections() {
  return (
    <>
      <section id="capabilities" className="capabilities">
        <SectionHeading
          n="02"
          label="Capabilities"
          title={'Control.\nBy design.'}
          copy="A complete control layer for what your agents spend, where they spend it, and who gets to see."
          href="/portfolio"
          link="All capabilities"
        />
        <div className="capability-list">
          {capabilities.map((capability, i) => (
            <a key={capability.slug} href={'/portfolio/' + capability.slug} className="capability-card">
              <div className="capability-info">
                <span className="eyebrow">0{i + 1}</span>
                <div>
                  <span className="eyebrow">Layer</span>
                  <h3>{capability.name}</h3>
                </div>
                <div>
                  <span className="eyebrow">Protocol</span>
                  <p>Bursar</p>
                </div>
                <div className="view-project">
                  Explore <ArrowUpRight />
                </div>
              </div>
              <div className={'capability-visual visual-' + i}>
                <Picture image={capability.image} alt={capability.landingAlt} sizes="102vw" />
                <div className="capability-shade" />
                <div className="capability-inset">
                  <Picture image={capability.image} alt="" sizes="(max-width: 800px) 48vw, 24vw" />
                </div>
                <h3 className="capability-wordmark">{capability.name}</h3>
              </div>
              <div className="capability-caption">
                <p>{capability.summary}</p>
                <span>
                  {capability.category} <ArrowUpRight size={16} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
      <section id="services" className="services tint-section">
        <div className="section-rail">
          <Eyebrow n="03">The stack</Eyebrow>
        </div>
        <div className="services-main">
          <div className="services-title">
            <SplitWords>
              What you
              <br />
              control.
            </SplitWords>
            <div className="service-cta">
              <Eyebrow>Your workspace</Eyebrow>
              <h3>
                Put every agent
                <br />
                inside a mandate.
              </h3>
              <div>
                <Picture image="brand/logo" alt="Bursar" sizes="100px" />
                <a href={CONSOLE_HREF} className="text-link">
                  Open app{' '}
                  <span>
                    <ArrowUpRight size={18} />
                  </span>
                </a>
              </div>
            </div>
          </div>
          <Accordion className="service-accordion">
            {services.map(([title, copy], i) => (
              <AccordionItem key={title} value={title}>
                <AccordionTrigger>
                  <span>
                    <small>0{i + 1}</small>
                    {title}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p>{copy}</p>
                  <a className="text-link" href={CREATE_HREF}>
                    Configure a mandate <ArrowUpRight size={16} />
                  </a>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      <section id="process" className="process">
        <SectionHeading
          n="04"
          label="The process"
          title={'5 steps.\nYour rules.'}
          copy="From the first mandate to the final receipt, every step has a defined boundary."
        />
        <div className="process-grid">
          {processSteps.map(([label, title, copy], i) => (
            <article key={label} className="step-card">
              <div>
                <span className="step-number">0{i + 1}</span>
                <Eyebrow>{label}</Eyebrow>
              </div>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </article>
          ))}
          <article className="step-card start-card">
            <h3>
              Ready
              <br />
              to start?
            </h3>
            <p>Build your first mandate and define the limits before your agent takes the next step.</p>
            <div className="start-features">
              <span>01 / Private workspace</span>
              <span>02 / Explicit controls</span>
              <span>03 / Clear oversight</span>
            </div>
            <Action href={CREATE_HREF}>Create a mandate</Action>
          </article>
        </div>
      </section>
      <section className="roles">
        <SectionHeading
          n="05"
          label="The ecosystem"
          title={'Every role.\nOne protocol.'}
          copy="A shared set of rules for the people and systems behind each transaction."
        />
        <div className="roles-layout">
          <div className="role-intro">
            <Picture image="brand/logo" alt="Bursar" sizes="140px" />
            <p>
              Autonomy for agents.
              <br />
              Authority for you.
            </p>
            <Eyebrow>$BRSR stakers</Eyebrow>
            <p className="staker-copy">
              Participate in the trust layer. The protocol design routes facilitator, collateral-lane, and dispute fees
              toward buybacks and stakers.
            </p>
            <Action href={WORKSPACE_HREF}>Enter the workspace</Action>
          </div>
          <div className="role-cards">
            {roles.map(([label, title, copy]) => (
              <article key={label} className="role-card">
                <Eyebrow>{label}</Eyebrow>
                <ShieldCheck size={24} />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="stat-band">
        {stats.map(([value, title, copy]) => (
          <div key={title} className="reveal">
            <CountUp value={Number(value)} />
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
        ))}
      </section>
      <section className="featured tint-section">
        <div>
          <Eyebrow n="06">The principle</Eyebrow>
          <SplitWords scroll>“Give your agents a budget, not your bank, and nobody sees the ledger.”</SplitWords>
          <div className="featured-facts">
            <div>
              <strong>Scoped</strong>
              <span>Spending authority</span>
              <p>The agent receives a bounded mandate for a defined task.</p>
            </div>
            <div>
              <strong>Private</strong>
              <span>By architecture</span>
              <p>Readable terms belong in the principal’s viewing-key space.</p>
            </div>
          </div>
          <a className="text-link" href="/portfolio/private-mandates">
            Explore mandates{' '}
            <span>
              <ArrowUpRight size={18} />
            </span>
          </a>
        </div>
        <div className="featured-media">
          <Picture
            image="stock/hero"
            alt="Translucent glass forms in pink and pale blue"
            sizes="(max-width: 800px) 100vw, 50vw"
          />
        </div>
      </section>
      <section id="lanes" className="lanes">
        <div className="center-heading">
          <Eyebrow n="07">Funding paths</Eyebrow>
          <SplitWords>
            Your budget.
            <br />
            Your lane.
          </SplitWords>
          <SplitWords as="p">Choose the funding structure that fits the mandate.</SplitWords>
        </div>
        <div className="lane-grid">
          {lanes.map((lane, i) => (
            <article key={lane.name} className={'lane-card lane-' + i}>
              <Eyebrow>{lane.name}</Eyebrow>
              <h3>
                {lane.asset}
                <small>/Funding</small>
              </h3>
              <p>{lane.copy}</p>
              <span className="eyebrow">Core controls</span>
              <ul>
                {lane.controls.map((control) => (
                  <li key={control}>＋ {control}</li>
                ))}
              </ul>
              <Action href={laneHref(lane.name)}>Choose {lane.name}</Action>
              <div className="lane-foot">
                Terms follow your mandate <ArrowUpRight size={15} />
              </div>
            </article>
          ))}
        </div>
      </section>
      <section id="faq" className="faq section-grid">
        <aside>
          <Picture image="brand/logo" alt="Bursar" sizes="95px" />
          <Eyebrow>Need some clarity?</Eyebrow>
          <h3>
            Start with
            <br />
            the essentials.
          </h3>
          <a className="text-link" href="/contact">
            Get in touch{' '}
            <span>
              <ArrowUpRight size={18} />
            </span>
          </a>
        </aside>
        <div>
          <Eyebrow n="08">FAQ</Eyebrow>
          <SplitWords>
            Quick
            <br />
            answers.
          </SplitWords>
          <SplitWords as="p" className="section-description">
            The fundamentals behind private budgets and controlled agent spending.
          </SplitWords>
          <Accordion defaultValue="0">
            {faq.map(([question, answer], i) => (
              <AccordionItem key={question} value={String(i)}>
                <AccordionTrigger>
                  <span>
                    <small>0{i + 1}</small>
                    {question}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p>{answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      <section id="resources" className="resources">
        <SectionHeading
          n="09"
          label="Resources"
          title={'Protocol\nnotes.'}
          copy="A closer look at the rules, funding paths, and privacy behind Bursar."
          href="/blog"
          link="All articles"
        />
        <div className="article-grid">
          {posts.map((post, i) => (
            <a key={post.slug} href={'/blog/' + post.slug} className="article-card">
              <div className={'article-art article-art-' + i}>
                <Picture image={post.art.image} alt={post.art.alt} sizes="(max-width: 800px) 96vw, 25vw" />
                <span>0{i + 1} / BURSAR</span>
              </div>
              <Eyebrow>{post.category}</Eyebrow>
              <h3>{post.title}</h3>
              <p>{post.intro}</p>
              <span className="text-link">
                Read article{' '}
                <span>
                  <ArrowUpRight size={18} />
                </span>
              </span>
            </a>
          ))}
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
