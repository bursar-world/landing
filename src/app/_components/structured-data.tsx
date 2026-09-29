import { GITHUB_URL, X_URL } from '../_content';
import { SITE_URL, ogImage } from './metadata';

type Thing = Record<string, unknown>;

const url = (path: string) => (path === '/' ? SITE_URL : SITE_URL + path);

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export const organization: Thing = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: 'Bursar',
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/icons/icon-512.png`, width: 512, height: 512 },
  email: 'hello@bursar.world',
  sameAs: [X_URL, GITHUB_URL],
};

export const website: Thing = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Bursar',
  url: SITE_URL,
  inLanguage: 'en',
  publisher: { '@id': ORGANIZATION_ID },
};

/** Home, then each named level down to the current page. */
export function breadcrumbs(trail: readonly (readonly [name: string, path: string])[]): Thing {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [['Home', '/'] as const, ...trail].map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: url(path),
    })),
  };
}

export function blogPosting(post: {
  readonly path: string;
  readonly headline: string;
  readonly description: string;
  readonly section: string;
  readonly published: string;
  readonly modified: string;
}): Thing {
  return {
    '@type': 'BlogPosting',
    '@id': `${url(post.path)}#article`,
    headline: post.headline,
    description: post.description,
    articleSection: post.section,
    datePublished: post.published,
    dateModified: post.modified,
    url: url(post.path),
    mainEntityOfPage: url(post.path),
    image: { '@type': 'ImageObject', url: url(ogImage(post.path)), width: 1200, height: 630 },
    inLanguage: 'en',
    author: { '@type': 'Organization', '@id': ORGANIZATION_ID, name: 'Bursar', url: SITE_URL },
    publisher: { '@id': ORGANIZATION_ID },
  };
}

export function faqPage(entries: readonly (readonly [question: string, answer: string])[]): Thing {
  return {
    '@type': 'FAQPage',
    mainEntity: entries.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

/** A JSON-LD block. `<` is escaped so page text can never close the script element. */
export function StructuredData({ graph }: { readonly graph: readonly Thing[] }) {
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
