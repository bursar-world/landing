import type { Metadata } from 'next';

/**
 * Per-page head tags. Next replaces the layout's `openGraph` and `twitter` objects wholesale
 * rather than merging them, so every page restates the share image alongside its own copy.
 */
export function pageMetadata({
  title,
  description,
  ogDescription,
  type = 'website',
}: {
  readonly title: string;
  readonly description: string;
  readonly ogDescription: string;
  readonly type?: 'website' | 'article';
}): Metadata {
  return {
    title,
    description,
    openGraph: { title, description: ogDescription, type, images: ['/brand/banner.png'] },
    twitter: { card: 'summary_large_image', title, description: ogDescription, images: ['/brand/banner.png'] },
  };
}
