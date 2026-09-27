import type { ReactNode } from 'react';

import { CONSOLE_HREF } from '../_content';
import { ChevronRight } from './icons';

/**
 * The primary call to action. The label is printed twice because the hover state rolls the first
 * copy out and the second in; the duplicate is hidden from assistive technology.
 *
 * A plain anchor on purpose: the console has its own root layout, so reaching it is a full load.
 */
export function Action({
  children = 'Open dashboard',
  href = CONSOLE_HREF,
}: {
  readonly children?: ReactNode;
  readonly href?: string;
}) {
  return (
    <a className="action" href={href}>
      <span className="action-label-wrap">
        <b className="action-label">{children}</b>
        <b className="action-label-copy" aria-hidden="true">
          {children}
        </b>
      </span>
      <span className="action-square">
        <ChevronRight size={19} />
      </span>
    </a>
  );
}
