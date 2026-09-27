import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { posts } from '../../_content';
import { Action } from '../../_components/action';
import { Eyebrow } from '../../_components/eyebrow';
import { pageMetadata } from '../../_components/metadata';
import { SiteFooter } from '../../_components/site-footer';
import { SiteHeader } from '../../_components/site-header';

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

// Every note shares one set of head tags, as it did on the original site.
export function generateMetadata(): Metadata {
  return pageMetadata({
    title: 'Bursar protocol note',
    description: 'A Bursar research note on agent spending mandates, RWA funding, privacy, and settlement.',
    ogDescription: 'Research from the Bursar team on controlled agent spending.',
    type: 'article',
  });
}

export default async function PostPage({ params }: { readonly params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((candidate) => candidate.slug === slug);
  if (!post) notFound();
  return (
    <>
      <div className="inner-header">
        <SiteHeader />
      </div>
      <main id="top" className="inner-page">
        <a className="back-link" href="/blog">
          ← All notes
        </a>
        <h1>{post.title}</h1>
        <article className="prose">
          <Eyebrow>{post.category} / Bursar research</Eyebrow>
          <h2>{post.intro}</h2>
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <Action>Open your workspace</Action>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
