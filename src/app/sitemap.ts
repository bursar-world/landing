import type { MetadataRoute } from 'next';

import { capabilities, posts } from './_content';
import { SITE_URL } from './_components/metadata';

export const dynamic = 'force-static';

/** When the copy of the fixed pages last changed. Posts carry their own dates. */
const PAGES_UPDATED = '2026-09-27';

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, lastModified = PAGES_UPDATED) => ({
    url: path === '/' ? SITE_URL : SITE_URL + path,
    lastModified,
  });
  return [
    page('/'),
    page('/about'),
    page('/portfolio'),
    ...capabilities.map((capability) => page(`/portfolio/${capability.slug}`)),
    page('/blog', posts.map((post) => post.modified).sort().at(-1)),
    ...posts.map((post) => page(`/blog/${post.slug}`, post.modified)),
    page('/contact'),
    page('/privacy'),
    page('/terms'),
  ];
}
