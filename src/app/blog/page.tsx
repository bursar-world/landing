import type { Metadata } from 'next';

import { articleArt, posts } from '../_content';
import { Eyebrow } from '../_components/eyebrow';
import { pageMetadata } from '../_components/metadata';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';

export const metadata: Metadata = pageMetadata({
  title: 'Bursar resources | Protocol notes',
  description:
    'Notes on mandates, treasury-funded budgets, privacy with accountability, and controlled settlement.',
  ogDescription: 'A closer look at the rules, funding paths, and privacy behind Bursar.',
});

export default function BlogPage() {
  return (
    <>
      <div className="inner-header">
        <SiteHeader />
      </div>
      <main id="top" className="inner-page">
        <Eyebrow>Resources</Eyebrow>
        <h1>Protocol notes.</h1>
        <div className="article-grid">
          {posts.map((post, i) => (
            <a key={post.slug} className="article-card" href={'/blog/' + post.slug}>
              <div className={'article-art article-art-' + i}>
                {/* eslint-disable-next-line @next/next/no-img-element -- matches the Lovable markup and CSS */}
                <img src={articleArt[i]?.src} alt={post.category} />
                <span>0{i + 1} / BURSAR</span>
              </div>
              <Eyebrow>{post.category}</Eyebrow>
              <h3>{post.title}</h3>
              <p>{post.intro}</p>
              <span className="text-link">Read article →</span>
            </a>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
