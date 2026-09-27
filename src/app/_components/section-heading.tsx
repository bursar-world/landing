import type { ReactNode } from 'react';

import { Eyebrow } from './eyebrow';
import { ArrowUpRight } from './icons';
import { SplitWords } from './split-words';

/** Numbered section opener: label, revealed title, revealed copy and an optional link out. */
export function SectionHeading({
  n,
  label,
  title,
  copy,
  href,
  link,
}: {
  readonly n: string;
  readonly label: string;
  readonly title: ReactNode;
  readonly copy: ReactNode;
  readonly href?: string;
  readonly link?: string;
}) {
  return (
    <div className="section-heading">
      <Eyebrow n={n}>{label}</Eyebrow>
      <SplitWords>{title}</SplitWords>
      <div>
        <SplitWords as="p">{copy}</SplitWords>
        {href && (
          <a className="text-link" href={href}>
            {link}
            <span>
              <ArrowUpRight size={18} />
            </span>
          </a>
        )}
      </div>
    </div>
  );
}
