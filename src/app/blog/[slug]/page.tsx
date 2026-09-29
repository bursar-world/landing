import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { WORKSPACE_HREF, posts } from '../../_content';
import { Action } from '../../_components/action';
import { Eyebrow } from '../../_components/eyebrow';
import { pageMetadata } from '../../_components/metadata';
import { SiteFooter } from '../../_components/site-footer';
import { SiteHeader } from '../../_components/site-header';
import { StructuredData, blogPosting, breadcrumbs } from '../../_components/structured-data';

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { readonly params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((candidate) => candidate.slug === slug);
  if (!post) return {};
  return pageMetadata({
    title: `${post.title.replace(/\.$/, '')} | Bursar`,
    description: post.description,
    ogDescription: post.intro,
    path: `/blog/${post.slug}`,
    article: { published: post.published, modified: post.modified, section: post.category },
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
          <Action href={WORKSPACE_HREF}>Open your workspace</Action>
        </article>
        <StructuredData
          graph={[
            blogPosting({
              path: `/blog/${post.slug}`,
              headline: post.title,
              description: post.description,
              section: post.category,
              published: post.published,
              modified: post.modified,
            }),
            breadcrumbs([
              ['Resources', '/blog'],
              [post.title, `/blog/${post.slug}`],
            ]),
          ]}
        />
      </main>
      <SiteFooter />
    </>
  );
}
