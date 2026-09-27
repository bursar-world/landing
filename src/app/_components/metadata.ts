import type { Metadata } from 'next';

/**
 * Per-page head tags. Next replaces the layout's `openGraph` and `twitter` objects wholesale
 * rather than merging them, so every page restates the share image alongside its own copy.
 * `path` resolves against the layout's `metadataBase` into the canonical URL and `og:url`.
 */
export function pageMetadata({
  title,
  description,
  ogDescription,
  path,
  type = 'website',
}: {
  readonly title: string;
  readonly description: string;
  readonly ogDescription: string;
  readonly path: string;
  readonly type?: 'website' | 'article';
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description: ogDescription, url: path, type, images: ['/brand/banner.png'] },
    twitter: { card: 'summary_large_image', title, description: ogDescription, images: ['/brand/banner.png'] },
  };
}
